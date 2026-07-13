# Plan 001: Rotate and remove committed Sanity credentials

> **Executor instructions**: Follow every step in order. Never print, copy into logs, or commit any credential value. Coordinate external rotations with the operator. Update this plan's row in `plans/README.md` when complete.
>
> **Drift check (run first)**: `git diff --stat fce47d5..HEAD -- .env .env.example .gitignore README.md`
> If these files changed, compare the current state below with live code. A mismatch is a STOP condition.

## Status

- **Priority**: P0
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: security
- **Planned at**: commit `fce47d5`, 2026-07-13

## Why this matters

The tracked `.env` contains non-empty Sanity read and write credentials plus the webhook revalidation secret, and the file exists in Git history. Removing the current file does not revoke exposed credentials. Rotation must happen before cleanup, with deployment variables updated in a coordinated window so publishing and revalidation do not break.

## Current state

- `.env:9-11` contains the three server-only credential types. Do not inspect or reproduce their values.
- `.gitignore:28-30` already ignores `.env` and `.env*.local`, but `.env` remains tracked because ignore rules do not untrack existing files.
- `.env.example:8-10` lists the server-only variable names and is safe only while values remain placeholders.
- `app/api/revalidate/route.ts:32-35` validates the webhook with `SANITY_REVALIDATE_SECRET`.
- `sanity/env.ts:14-17` and `sanity/lib/sanity.fetch.ts:18` read the server-side variables.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Confirm tracking | `git ls-files --error-unmatch .env` | prints `.env` before removal |
| Untrack | `git rm --cached .env` | stages deletion without deleting the local ignored file |
| Secret-name audit | `git grep -n -E 'SANITY_API_(READ|WRITE)_TOKEN|SANITY_REVALIDATE_SECRET' -- ':!plans/**'` | only expected configuration/code references; no values printed |
| Lint | `npm run lint` | exit 0 |
| Build | `npm run build` | exit 0 |

## Scope

**In scope**: `.env`, `.env.example`, `.gitignore`, `README.md`, deployment environment variables, Sanity API tokens/webhook secret, and coordinated Git-history cleanup.

**Out of scope**: public Sanity project/dataset identifiers, analytics IDs, CMS schema changes, dependency upgrades, and any unrelated dirty files under `dist/`, `.agents/`, `.claude/`, or `skills-lock.json`.

## Git workflow

- Branch: `codex/001-rotate-sanity-credentials`
- Use imperative commit messages, matching `Improve first-visit load by caching and trimming preloads`.
- Do not force-push, purge history, deploy, or rotate credentials without explicit operator authorization.

## Steps

### Step 1: Inventory external consumers without exposing values

Ask the operator to confirm every environment that uses each credential type: local development, Vercel preview/production, Sanity webhook configuration, and any CI. Record locations only, never values.

**Verify**: operator confirms an update target for all three credential types. If any consumer is unknown, STOP.

### Step 2: Rotate credentials and update trusted environments

Using Sanity Manage and the deployment provider, create least-privilege replacements. Update deployment/local secret stores, update the Sanity webhook secret on both ends, redeploy, and revoke the old credentials only after the replacement deployment is healthy.

**Verify**: production pages fetch content, Studio publishing still works, and a signed test webhook returns HTTP 200. An invalid signature must return 401.

### Step 3: Remove the tracked secret file

Run `git rm --cached .env`. Keep `.env` ignored locally. Ensure `.env.example` contains names and clearly fake placeholders only; annotate public versus server-only variables in `README.md`. Do not add real values to documentation.

**Verify**: `git ls-files .env` prints nothing; `git check-ignore -v .env` identifies `.gitignore`; `git diff --cached -- .env .env.example .gitignore README.md` contains no credential values.

### Step 4: Coordinate repository-history cleanup

Because committed credentials are already revoked, history cleanup is defense in depth. Obtain explicit approval and a collaborator freeze. Use an approved history-rewrite tool to remove `.env` from all refs, force-push rewritten refs, invalidate old clones/caches as the provider supports, and instruct collaborators to re-clone. Do not improvise the rewrite in an active shared branch.

**Verify**: after a fresh clone, `git log --all -- .env` returns no commits and `git rev-list --objects --all | grep -E '(^| )\.env$'` returns no matches.

## Test plan

- Production smoke: home, work, one exhibition, contact, and Studio load after rotation.
- Webhook: valid request returns 200; invalid signature returns 401; published content refreshes.
- Repository: fresh clone contains no tracked `.env` and no `.env` history.

## Done criteria

- [ ] All three credential types are rotated and old credentials revoked.
- [ ] Deployment and webhook consumers use replacements.
- [ ] `.env` is untracked and ignored; examples contain placeholders only.
- [ ] `npm run lint` and `npm run build` pass.
- [ ] Approved history cleanup is complete, or explicitly documented as operator-deferred after rotation.
- [ ] No unrelated files are modified.

## STOP conditions

- You lack authorization for Sanity, deployment, rotation, or history rewrite.
- Any credential consumer cannot be identified.
- Replacement credentials fail before old credentials are revoked.
- Cleanup would expose a value in terminal output, a commit, issue, or plan.

## Maintenance notes

Reviewers must confirm rotation, not merely deletion. Future server credentials belong only in provider/local secret stores; `.env.example` may contain names and fake placeholders, never live values.

