# Plan 002: Align the lint toolchain with Next.js 14

> **Executor instructions**: Execute incrementally and update `plans/README.md`. Do not combine this with a Next, React, Panda, or Sanity major upgrade.
>
> **Drift check (run first)**: `git diff --stat fce47d5..HEAD -- package.json package-lock.json .eslintrc.json`

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: migration
- **Planned at**: commit `fce47d5`, 2026-07-13

## Why this matters

The app runs Next.js 14.2.x while `eslint-config-next` remains on 13.5.x and `eslint-plugin-react-hooks` uses a 2023 canary. Current lint passes, but mismatched framework rules make future upgrades harder and can miss or misreport framework-specific problems.

## Current state

- `package.json:25-29` combines `eslint-config-next ^13.5.6`, a canary React Hooks plugin, and `next ^14.2.0`.
- `package.json:49-56` uses TypeScript-ESLint 6, ESLint 8, and TypeScript 5.2 ranges.
- `.eslintrc.json:1-25` extends `next`, `next/core-web-vitals`, TypeScript recommended rules, and Prettier.
- `npm run lint` currently runs `next lint` and passes. Preserve this working gate for Next 14.

## Commands you will need

| Purpose | Command | Expected |
|---|---|---|
| Install | `npm install` | lockfile updated, exit 0 |
| Inspect tree | `npm ls next eslint eslint-config-next eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin` | one coherent tree, exit 0 |
| Lint | `npm run lint` | no warnings/errors |
| Typecheck | `npx tsc --noEmit --incremental false` | exit 0 |
| Build | `npm run build` | exit 0 |

## Scope

**In scope**: `package.json`, `package-lock.json`, and `.eslintrc.json` only.

**Out of scope**: source-code changes, Next 15+, React 19, Panda upgrades, flat-config migration, formatting churn, rule suppressions added solely to silence valid findings, and unrelated dirty files.

## Git workflow

- Branch: `codex/002-align-next-lint`
- Use an imperative commit such as `Align lint tooling with Next.js 14`.
- Do not push or open a PR unless instructed.

## Steps

### Step 1: Choose compatible versions

Resolve `eslint-config-next` to the same 14.2 release line as installed Next. Replace the explicit canary React Hooks plugin with the stable version required by that config, or remove the direct dependency if the Next config owns it. Do not upgrade unrelated packages.

**Verify**: `npm ls next eslint-config-next eslint-plugin-react-hooks` exits 0 with no invalid/duplicate peer tree.

### Step 2: Regenerate the npm lockfile

Run `npm install` with the repo's npm lockfile v3. Review the manifest and lockfile diff to ensure only lint-toolchain transitive changes occurred.

**Verify**: `git diff -- package.json package-lock.json` contains no unrelated dependency updates.

### Step 3: Verify the aligned rules

Run lint. Preserve `.eslintrc.json` rule intent: Hooks rules remain enabled and Prettier remains last. If the aligned packages surface source findings, STOP and report the exact files/rules so a separate scoped fix can be approved; do not fold source edits into this migration.

**Verify**: `npm run lint`, standalone typecheck, and build all exit 0.

## Test plan

- No behavioral test suite exists; do not add one in this migration.
- Treat lint, strict typecheck, and production build as the automated regression gates.
- No source code should change; if lint exposes source findings, use the STOP condition rather than weakening rules.

## Done criteria

- [ ] Next and `eslint-config-next` share the 14.2 release line.
- [ ] No canary React Hooks plugin remains unless a documented peer constraint requires it.
- [ ] `npm ls ...`, lint, typecheck, and build pass.
- [ ] No framework/Panda/Sanity major upgrade or broad formatting occurred.

## STOP conditions

- Compatible versions require ESLint 9/flat config or a Next major upgrade.
- Any source file requires a change to make the aligned lint gate pass.
- npm reports unresolved peer conflicts after two focused attempts.

## Maintenance notes

This is preparation, not the future Next migration. Keep any later Next/Panda upgrades in separate plans with browser-level visual verification.
