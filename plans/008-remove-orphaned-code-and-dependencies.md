# Plan 008: Remove orphaned image/state code and unused dependencies

> **Executor instructions**: Reconfirm every reference before deletion. Keep active image and exhibition-hover paths intact. Update the index on completion.
>
> **Drift check (run first)**: `git diff --stat fce47d5..HEAD -- package.json package-lock.json components/common/DynamicImage.tsx 'app/(website)/store.ts'`

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: `plans/003-add-reproducible-check-and-ci.md`
- **Category**: tech-debt
- **Planned at**: commit `fce47d5`, 2026-07-13

## Why this matters

The repo retains an unused `sanity-image` wrapper, an unused theme Zustand store, and direct dependencies with no imports. These parallel paths obscure the active conventions and enlarge install/migration surface. Cleanup should be evidence-driven and must not touch active Next Image or hover-state code.

## Current state

- `components/common/DynamicImage.tsx` is the only `sanity-image` import and has no consumers.
- `app/(website)/store.ts:24-32` creates `useThemeStore`; no file imports it. `useExhibitionStore` at lines 19-22 is active in `ExhibitionListItem` and `ExhibitionPreview` and must remain.
- `package.json:23,28,36` includes `clsx`, `media-icons`, and `sanity-image`; source search finds no `clsx` or `media-icons` imports.
- `@types/jest` is unused but intentionally excluded here because the selected findings did not include the testing-baseline plan and it may be used shortly.
- Active image convention: `NextImage`, `AspectImage`, `ZoomImage`, and `ImageBox` use `next/image` plus Sanity helpers.

## Commands you will need

| Purpose | Command | Expected |
|---|---|---|
| Reference scan | `rg -n "DynamicImage|useThemeStore|from ['\"](clsx|media-icons|sanity-image)['\"]" --glob '!package-lock.json' .` | only the known declarations before removal; no matches after |
| Remove deps | `npm uninstall clsx media-icons sanity-image` | manifest/lock updated, exit 0 |
| Check | `npm run check` | exit 0 |
| Build | `npm run build` | exit 0 |

## Scope

**In scope**: delete `components/common/DynamicImage.tsx`; edit `app/(website)/store.ts`; update `package.json` and `package-lock.json` for `clsx`, `media-icons`, `sanity-image` only.

**Out of scope**: `NextImage`, `AspectImage`, `ZoomImage`, `ImageBox`, `useExhibitionStore`, `@types/jest`, Zustand removal, image redesign, broad dependency cleanup, and unrelated dirty files.

## Git workflow

- Branch: `codex/008-remove-orphaned-code`
- Commit message: `Remove unused image and theme state code`.

## Steps

### Step 1: Reconfirm dead references

Search source, configs, dynamic imports, and generated-code inputs. If any runtime/config consumer is found, stop and report rather than deleting it.

**Verify**: searches show only the known declaration/manifest sites.

### Step 2: Remove orphaned code narrowly

Delete `DynamicImage.tsx`. Remove `ThemeStore` and `useThemeStore` while leaving `ExhibitionStore` byte-for-byte behaviorally equivalent.

**Verify**: typecheck passes before dependency removal.

### Step 3: Remove unused direct dependencies

Run the exact npm uninstall command. Review the lockfile so transitive removals are attributable only to those packages. Do not opportunistically upgrade other packages.

**Verify**: reference scan returns no matches; `npm ls clsx media-icons sanity-image` reports they are absent as direct dependencies (transitive copies, if any, are acceptable and documented).

### Step 4: Validate active paths

Run check/build and smoke home, Work preview hover, exhibition gallery/modal, CV Portable Text, and Studio.

**Verify**: all active image/state paths function and no missing-module error appears.

## Test plan

- Static reference scan before/after.
- Production build catches generated/dynamic imports.
- Browser smoke covers every active image abstraction and Work hover state.

## Done criteria

- [ ] Orphaned wrapper and theme store are gone.
- [ ] Three verified-unused direct dependencies are removed from manifest/lock.
- [ ] Active image helpers and `useExhibitionStore` are unchanged in behavior.
- [ ] Check/build and route smoke tests pass.
- [ ] No other dependency or source cleanup is included.

## STOP conditions

- Any consumer of `DynamicImage`, `useThemeStore`, or a proposed dependency is found.
- Lockfile regeneration updates unrelated direct dependencies.
- Active Work hover or image behavior changes.

## Maintenance notes

Treat the remaining Next Image/Sanity helper path as canonical. A later image abstraction consolidation requires its own measured plan.
