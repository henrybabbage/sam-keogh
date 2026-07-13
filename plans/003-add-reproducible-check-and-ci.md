# Plan 003: Add a reproducible local and CI verification gate

> **Executor instructions**: Follow the steps and update `plans/README.md`. Keep CI free of server secrets.
>
> **Drift check (run first)**: `git diff --stat fce47d5..HEAD -- package.json package-lock.json tsconfig.json .github README.md`

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: `plans/002-align-next-lint-toolchain.md`
- **Category**: dx
- **Planned at**: commit `fce47d5`, 2026-07-13

## Why this matters

Lint and build work locally but are separate, undocumented gates and no workflow enforces them. Strict TypeScript is configured but has no script. A single local command plus CI makes executor and contributor results reproducible without expanding into the unselected full testing initiative.

## Current state

- `package.json:5-10` defines `prepare`, `dev`, `build`, `start`, and `lint`; there is no `typecheck` or aggregate command.
- `tsconfig.json` has `strict: true` and `noEmit: true`; `npx tsc --noEmit --incremental false` passes after Next generated types exist.
- No `.github/workflows/` exists.
- `npm run build` needs public Sanity project/dataset configuration and live content access; it must never receive write/read tokens in pull-request CI.

## Commands you will need

| Purpose | Command | Expected |
|---|---|---|
| Install | `npm ci` | exit 0; prepare generates ignored Panda output |
| Lint | `npm run lint` | exit 0 |
| Typecheck | `npm run typecheck` | exit 0 |
| Aggregate | `npm run check` | all configured gates pass |
| Build | `npm run build` | exit 0 when safe public CMS variables/network are available |

## Scope

**In scope**: `package.json`, `.github/workflows/ci.yml` (create), `README.md`, and only minimal `tsconfig.json` adjustment if standalone typecheck proves nondeterministic.

**Out of scope**: adding a test runner or broad tests, secret scanning, dependency upgrades, deployment, source refactors, and existing dirty files.

## Git workflow

- Branch: `codex/003-add-ci-check`
- Commit message: `Add reproducible verification gate`.

## Steps

### Step 1: Add local scripts

Add `typecheck: "tsc --noEmit --incremental false"` and `check: "npm run lint && npm run typecheck"`. Do not hide failures or add `|| true`. Build stays separate because it depends on external CMS availability.

**Verify**: `npm run check` exits 0 on a clean install after generated prerequisites exist.

### Step 2: Add CI

Create `.github/workflows/ci.yml` for pull requests and pushes. Use a current LTS Node version supported by Next 14, `npm ci`, dependency caching, then `npm run check`. Add build only if the repository owner supplies safe public Sanity values as repository variables and accepts live-CMS dependence; never add Sanity read/write tokens or webhook secrets to PR CI.

**Verify**: parse the workflow with an available YAML checker; inspect it with `git grep -n 'SANITY_API_\|SANITY_REVALIDATE_SECRET' .github` and expect no matches.

### Step 3: Document the gate

Update README setup/verification with exact install, development, check, and optional build commands. State why build may require public CMS configuration.

**Verify**: every documented command exists in `package.json` and `npm run check` passes.

## Test plan

- Push the branch and confirm the workflow passes on a pull request from a branch without secrets.
- Confirm a deliberately invalid TypeScript change fails `typecheck` locally, then revert that temporary change.
- Confirm a deliberate lint violation fails `check`, then revert it.

## Done criteria

- [ ] `npm run typecheck` and `npm run check` exist and pass.
- [ ] CI runs on pushes/PRs using `npm ci` and `npm run check`.
- [ ] CI contains no server-side Sanity credential reference.
- [ ] README documents exact gates.
- [ ] No test framework or unrelated code was introduced.

## STOP conditions

- CI requires a server secret to pass.
- Typecheck only succeeds by weakening strictness or excluding source files.
- Plan 002 has not aligned the lint dependency tree.

## Maintenance notes

When a test suite is eventually selected, append `npm test` to `check` and CI. Keep external-CMS build failures distinguishable from deterministic lint/type failures.

