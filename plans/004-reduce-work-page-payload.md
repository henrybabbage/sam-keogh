# Plan 004: Fetch and load only the preview data used by the Work page

> **Executor instructions**: Preserve the Work page's design and hover behavior. Update `plans/README.md` when done.
>
> **Drift check (run first)**: `git diff --stat fce47d5..HEAD -- sanity/lib/sanity.queries.ts sanity/lib/sanity.fetch.ts types/index.ts 'app/(website)/(core)/work/page.tsx' components/pages/exhibitions`

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: `plans/003-add-reproducible-check-and-ci.md`
- **Category**: perf
- **Planned at**: commit `fce47d5`, 2026-07-13

## Why this matters

The Work list fetches every gallery image plus detail-only fields for every exhibition, although it renders only list text and the first preview image. It also marks every opacity-hidden preview as priority. Payload and image competition scale with the whole archive rather than the visible interaction.

## Current state

- `sanity/lib/sanity.queries.ts:52-83` projects full `imageGallery[]`, dereferenced assets, Vimeo, Portable Text, dates, venue, and credits.
- `ExhibitionsPage.tsx:66-90` uses `_id`, `_type`, `slug`, `title`, `year`, and `imageGallery[0]`.
- `ExhibitionPreview.tsx:32-34` renders every preview with `priority={true}` while lines 20-29 hide all but the selected item with opacity.
- `exhibitionBySlugQuery` is the detail projection and must retain its gallery/content fields.
- Sanity convention: explicit projections and `_key` for arrays; avoid `asset->{...}` when the image helpers only need the asset reference plus selected metadata.

## Commands you will need

| Purpose | Command | Expected |
|---|---|---|
| Check | `npm run check` | exit 0 |
| Build | `npm run build` | exit 0; `/work` generated |
| Query audit | `sed -n '52,84p' sanity/lib/sanity.queries.ts` | list query has a single preview projection, no detail-only fields |

## Scope

**In scope**: `sanity/lib/sanity.queries.ts`, `sanity/lib/sanity.fetch.ts`, `types/index.ts`, `app/(website)/(core)/work/page.tsx`, `components/pages/exhibitions/ExhibitionsPage.tsx`, `ExhibitionPreview.tsx`, and a small new list-specific type if needed.

**Out of scope**: detail page query/rendering, CMS schemas, visual redesign, hover timing, new pagination, and the year-order correction in Plan 005.

## Git workflow

- Branch: `codex/004-reduce-work-payload`
- Commit message: `Reduce Work page content payload`.

## Steps

### Step 1: Separate list and detail data contracts

Create a list-specific type containing only fields consumed by Work. Keep `ExhibitionProps` for detail use. Rename the list query/fetch function if needed so future callers cannot assume it returns detail records.

**Verify**: `npm run typecheck` passes and no detail component consumes the narrowed list type.

### Step 2: Narrow the GROQ projection

Project `_id`, `_type`, `slug`, `title`, `year`, and one preview image via `imageGallery[0]` with `_key`, alt/caption, asset reference, dimensions/aspect ratio, and LQIP only if the active image helper needs them. Remove Vimeo, Portable Text, venue, dates, credits, URL, and full-array expansion from the list query.

**Verify**: inspection shows no `imageGallery[]`, `pressRelease`, `vimeo`, or `venue` in the list query; detail query is unchanged.

### Step 3: Stop prioritizing hidden previews

Remove unconditional `priority={true}`. Prefer rendering only the selected preview if that preserves the 75ms hover experience; otherwise leave mounted previews lazy and select priority for at most one genuinely above-fold image.

**Verify**: `rg -n 'priority=\{true\}' components/pages/exhibitions` returns no hidden-preview matches.

### Step 4: Validate payload and interaction

Build and compare `/work` RSC/network payload and image requests before/after using the same archive. Hover rapidly across items at desktop width; confirm correct previews, no stale image, and no layout shift. Mobile list behavior must remain unchanged.

**Verify**: `/work` requests only selected/lazy preview images and build/check pass.

## Test plan

- Query contract: inspect or add a focused assertion that list results expose exactly list fields and one preview.
- Browser: desktop hover across first/middle/last items; leave hover; keyboard/link navigation; mobile list navigation.
- Regression: individual exhibition pages still render complete galleries, videos, and text.

## Done criteria

- [ ] Work query returns one preview, not full galleries/detail content.
- [ ] Hidden previews are not all priority-loaded.
- [ ] Detail query and detail route retain full content.
- [ ] `npm run check` and `npm run build` pass.
- [ ] Design, ordering, and hover timing are unchanged.

## STOP conditions

- Another consumer relies on the current list query's detail fields.
- The image helper requires full asset dereferencing rather than selected fields.
- Rendering only the selected preview causes visible hover regressions that lazy mounting cannot solve narrowly.

## Maintenance notes

Keep list and detail projections separate. If pagination arrives later, preserve the single-preview contract and measure RSC payload rather than only JS bundle size.

