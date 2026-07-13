# Plan 006: Stabilize responsive exhibition image rendering

> **Executor instructions**: Preserve desktop zoom and mobile non-modal behavior. Run every verification and update `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat fce47d5..HEAD -- utils/useMediaQuery.tsx components/common/AspectImage.tsx components/common/Modal.tsx components/common/ZoomImage.tsx`

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: MED
- **Depends on**: `plans/003-add-reproducible-check-and-ci.md`
- **Category**: bug
- **Planned at**: commit `fce47d5`, 2026-07-13

## Why this matters

`useMediaQuery` always begins false, so mobile receives the desktop modal subtree during SSR/initial hydration and then replaces it after the effect runs. This can create interaction/layout shifts and unnecessary desktop image/modal work. The result should have stable server/client markup while retaining zoom only above 1024px.

## Current state

- `utils/useMediaQuery.tsx:10-19` initializes `matches` to false and corrects it in an effect.
- `AspectImage.tsx:71-111` chooses two structurally different trees: a mobile image or desktop Radix `Modal` with `ZoomImage`.
- Mobile sizing uses 90vw/90vh; desktop uses 66vw/90vh. Preserve these dimensions and `objectFit` behavior.
- `Modal.tsx` is a reusable Radix compound component; do not rewrite it unless required by the chosen stable structure.

## Commands you will need

| Purpose | Command | Expected |
|---|---|---|
| Check | `npm run check` | exit 0 |
| Build | `npm run build` | exit 0, no hydration error |
| Browser | run `npm run dev` and inspect `/[slug]` at 390px and 1440px | stable initial layout; desktop modal only |

## Scope

**In scope**: `utils/useMediaQuery.tsx`, `components/common/AspectImage.tsx`, and only if unavoidable `Modal.tsx`/`ZoomImage.tsx`.

**Out of scope**: changing breakpoints, image visual design, gallery animation, replacing Radix/Next Image, Work previews, or the larger page-boundary refactor in Plan 009.

## Git workflow

- Branch: `codex/006-stable-responsive-images`
- Commit message: `Stabilize responsive exhibition images`.

## Steps

### Step 1: Choose a hydration-safe structure

Prefer one shared image DOM structure with CSS media rules controlling whether the desktop trigger/modal affordance is active. If that is impractical with Radix, make the hook return an explicit unresolved state until mounted and render a dimension-preserving neutral image shell whose markup does not falsely enable desktop interaction. Do not use user-agent detection.

**Verify**: server output and first client render choose the same structure at both viewport sizes; no hydration warning appears.

### Step 2: Preserve interaction contracts

At widths above 1024px, clicking the image opens the existing zoom modal, Escape/close dismisses it, and focus behavior remains Radix-managed. At 1024px and below, the image is not a modal trigger. Resizing across the breakpoint must not leave a hidden modal open.

**Verify**: complete the browser matrix in the test plan with no console errors.

### Step 3: Verify sizing and loading

Confirm portrait and landscape images preserve their existing desktop/mobile bounds, alt text, Next Image `sizes`, and object-fit modes. Avoid loading a second full-resolution image on mobile solely because desktop markup exists.

**Verify**: network panel shows one primary gallery image request on initial mobile load; check and build pass.

## Test plan

- 390px initial load: stable dimensions, no zoom trigger, no post-hydration subtree flash.
- 1024px and 1025px: correct side of breakpoint.
- 1440px: modal opens, closes by button/Escape, and focus returns to trigger.
- Resize while modal is open: no stuck overlay or body/focus lock.
- Test one portrait and one landscape asset.

## Done criteria

- [ ] Initial SSR/client markup is hydration-safe.
- [ ] Mobile never briefly enables the desktop interaction.
- [ ] Desktop zoom and mobile sizing remain intact.
- [ ] Check/build pass and browser console has no hydration warning.
- [ ] Only in-scope files changed.

## STOP conditions

- A single DOM structure breaks Radix accessibility semantics.
- Preventing double loading requires changing the project-wide image abstraction.
- The existing 1024px breakpoint is not the intended product breakpoint.

## Maintenance notes

Plan 009 may later move this component into a smaller client island; preserve this stable responsive contract during that extraction.

