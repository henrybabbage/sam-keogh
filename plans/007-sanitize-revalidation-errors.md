# Plan 007: Return generic public errors from the revalidation webhook

> **Executor instructions**: Keep signature validation and tag behavior unchanged. Update `plans/README.md` when complete.
>
> **Drift check (run first)**: `git diff --stat fce47d5..HEAD -- app/api/revalidate/route.ts`

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: `plans/001-rotate-remove-committed-sanity-credentials.md`, `plans/003-add-reproducible-check-and-ci.md`
- **Category**: security
- **Planned at**: commit `fce47d5`, 2026-07-13

## Why this matters

Unexpected webhook failures currently return the caught exception message to any caller. That exposes avoidable runtime/library diagnostics and makes the public error contract unstable. The route should log a safe server-side diagnostic and return a fixed response without changing valid webhook behavior.

## Current state

`app/api/revalidate/route.ts:55-58` currently contains:

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (err: any) {
  console.error(err)
  return new Response(err.message, { status: 500 })
}
```

Lines 36-48 return 401 for invalid signatures, 400 for missing `_type`, and revalidate type/slug tags for valid bodies. Preserve those contracts. The repo uses TypeScript strict mode; caught errors should remain `unknown` until narrowed.

## Commands you will need

| Purpose | Command | Expected |
|---|---|---|
| Check | `npm run check` | exit 0 |
| Build | `npm run build` | exit 0 |
| Static audit | `rg -n 'err\.message|catch \(err: any\)' app/api/revalidate/route.ts` | no matches |

## Scope

**In scope**: `app/api/revalidate/route.ts` only.

**Out of scope**: changing webhook payload/projection, revalidation tags, secret rotation, adding monitoring vendors, changing successful JSON, or exposing stack traces.

## Git workflow

- Branch: `codex/007-sanitize-webhook-errors`
- Commit message: `Sanitize revalidation webhook errors`.

## Steps

### Step 1: Replace the public error body

Catch `unknown`; log a stable server-side message with a narrowed `Error` object or safe fallback. Return a constant generic body such as `Internal Server Error` with status 500. Never serialize the error object, message, stack, request body, signature, or environment variables into the response.

**Verify**: static audit has no `any` catch or `err.message` response; check passes.

### Step 2: Exercise every branch

Verify invalid signature 401, missing `_type` 400, valid type-only revalidation 200, valid type+slug revalidation 200, and injected parser/internal failure 500 with exactly the generic body.

**Verify**: route checks show the injected internal error text is absent from the 500 response and present only in controlled server logs if logging is enabled.

## Test plan

- Use a focused route-handler test if a runner exists by execution time; otherwise use an isolated request harness that mocks `parseBody` and `revalidateTag` without a real secret.
- Assert status/body for all five branches above.
- Assert successful calls retain both tag forms and 500 responses never contain the injected message.

## Done criteria

- [ ] Public 500 body is constant and generic.
- [ ] Caught errors use `unknown`, not `any`.
- [ ] 401/400/200 behavior and tag invalidation are unchanged.
- [ ] No secrets, request bodies, stacks, or internal messages are returned.
- [ ] Check and build pass; only the route file changed.

## STOP conditions

- The route contract is consumed by a client that requires the old internal message.
- Testing requires a real webhook secret or external production request.
- Changes to `parseBody` or tag semantics appear necessary.

## Maintenance notes

If structured logging is added later, redact headers/body and preserve the fixed public response. Observability belongs server-side.

