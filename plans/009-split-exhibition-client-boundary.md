# Plan 009: Split the exhibition detail into server content and focused client islands

> **Executor instructions**: This is a high-risk refactor. Preserve the current design and behavior exactly; stop on any uncharacterized interaction. Update the index when complete.
>
> **Drift check (run first)**: `git diff --stat fce47d5..HEAD -- 'app/(website)/[slug]/page.tsx' components/pages/exhibition components/common/AspectImage.tsx components/common/VimeoPlayer.tsx components/common/CustomPortableText.tsx`

## Status

- **Priority**: P3
- **Effort**: L
- **Risk**: HIGH
- **Depends on**: `plans/003-add-reproducible-check-and-ci.md`, `plans/006-stabilize-responsive-image-rendering.md`
- **Category**: tech-debt
- **Planned at**: commit `fce47d5`, 2026-07-13

## Why this matters

The entire 277-line exhibition detail is a client component to support scroll callbacks and reveal animations, so static headings, dates, captions, Portable Text, and the full Sanity payload cross the hydration boundary. `/[slug]` currently reports 242 kB first-load JS, the largest public route. Focused client islands can reduce hydration and coupling while retaining the bespoke sticky layout, zoom, video, and motion.

## Current state

- `app/(website)/[slug]/page.tsx:16-23` fetches the exhibition on the server and passes it to `ExhibitionPage`.
- `ExhibitionPage.tsx:1-12` declares `use client` and imports three `useScrollIntoView` hooks plus Framer Motion.
- Lines 32-180 render header/metadata/section controls; lines 182-271 render gallery, videos, and Portable Text.
- `AspectImage` and `VimeoPlayer` are already client components; `CustomPortableText` can render server-side.
- Preserve Panda CSS expressions, 7vh/14vh sticky offsets, 75/desktop layout, date format, scroll alignment/offset, fade timing, modal behavior, and current content order.

## Commands you will need

| Purpose | Command | Expected |
|---|---|---|
| Check | `npm run check` | exit 0 |
| Build | `npm run build` | exit 0; compare `/[slug]` first-load JS to 242 kB baseline |
| Boundary audit | `head -n 3 components/pages/exhibition/ExhibitionPage.tsx` | no page-wide `use client` after extraction |
| Browser | `npm run dev` | interaction matrix passes at mobile/desktop widths |

## Suggested executor toolkit

- Use Sanity/Next.js integration guidance for server/client data boundaries.
- Use a browser automation or in-app browser skill for screenshots, keyboard checks, and console/network capture.

## Scope

**In scope**: `app/(website)/[slug]/page.tsx`, `components/pages/exhibition/ExhibitionPage.tsx`, new focused files under `components/pages/exhibition/`, and minimal prop/type edits in `types/index.ts`.

**Out of scope**: visual redesign, typography/spacing changes, Sanity schema/query changes, replacing Framer Motion/Mantine/Radix, Work page, new preview/draft mode, and unrelated cleanup.

## Git workflow

- Branch: `codex/009-split-exhibition-boundary`
- Prefer logical commits: characterize, extract server structure, isolate interactions, verify.
- Commit messages remain imperative. Do not push/PR unless instructed.

## Steps

### Step 1: Capture the behavioral baseline

Before editing, capture desktop/mobile screenshots and record: initial fade, sticky metadata, Images/Video/Text buttons and offsets, gallery dimensions, modal open/close/focus, video playback, Portable Text links, Back navigation, and console errors. Record the build's `/[slug]` first-load JS.

**Verify**: baseline evidence exists for one media-rich route containing images, video, and text. If no such route exists, STOP and ask for a fixture.

### Step 2: Define the server/client seam

Make `ExhibitionPage` server-rendered. Keep metadata, dates, captions, section markup, and `CustomPortableText` on the server. Create the smallest client coordinator needed for scroll target registration/controls; prefer native IDs/anchors with `scroll-margin` and smooth scrolling if they reproduce the exact behavior without page-wide refs.

**Verify**: boundary audit shows no page-wide `use client`; typecheck passes; serialized props entering client components exclude Portable Text and unrelated exhibition fields unless needed.

### Step 3: Isolate motion and media

Wrap only reveal behavior in a small client component, or reproduce the existing opacity reveal with CSS/IntersectionObserver in a focused island. Retain `AspectImage` and `VimeoPlayer` as client leaves. Do not duplicate the gallery data across multiple client boundaries.

**Verify**: initial/reveal behavior matches baseline with reduced client-module graph and no hydration warnings.

### Step 4: Preserve accessibility and responsive behavior

Verify section controls are semantic links/buttons, focus-visible, and keyboard operable. Re-run Plan 006's mobile/desktop image checks. Confirm reduced-motion users do not receive forced scrolling/reveal motion beyond existing behavior; if changing motion policy would alter product behavior, document as follow-up rather than expanding scope.

**Verify**: complete browser matrix; no console errors; modal and video still work.

### Step 5: Measure the result

Build and record new `/[slug]` first-load JS and RSC payload. The refactor must produce a material reduction or a clearly smaller hydration boundary; if bundle size is flat due to media leaves, document module attribution rather than claiming a win.

**Verify**: build passes and before/after measurements are included in the handoff.

## Test plan

- Desktop 1440px and mobile 390px on a media-rich exhibition.
- Navigate each section control and verify final offset/order.
- Modal: mouse/keyboard open, Escape/close, focus return.
- Vimeo: player loads only where present and remains controllable.
- Portable Text: paragraphs, emphasis, lists, internal/external links.
- Empty variants: no gallery, no video, no text; missing venue/dates.
- Back link and direct/static route navigation.

## Done criteria

- [ ] Static exhibition content renders outside a page-wide client boundary.
- [ ] Only focused interaction/media components hydrate.
- [ ] Visual, responsive, scroll, modal, video, and Portable Text behavior matches baseline.
- [ ] Check/build pass with no hydration warning.
- [ ] Before/after JS and payload measurements are recorded.
- [ ] No schema/query/design or unrelated dependency change occurred.

## STOP conditions

- No representative media-rich route/fixture is available.
- Exact scrolling requires central shared mutable refs that cannot cross the server boundary cleanly.
- Any step changes visual design or content order.
- Bundle/hydration measurement worsens materially after two focused attempts.
- An out-of-scope query/schema change becomes necessary.

## Maintenance notes

Review the server/client import graph, not just file sizes. Future content fields should stay server-rendered unless they directly power interaction. Keep Plan 006's hydration-safe responsive contract intact.

