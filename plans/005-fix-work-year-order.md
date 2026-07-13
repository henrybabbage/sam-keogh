# Plan 005: Render exhibition years newest first

> **Executor instructions**: Make only the ordering correction. Update the index row when complete.
>
> **Drift check (run first)**: `git diff --stat fce47d5..HEAD -- components/pages/exhibitions/ExhibitionsPage.tsx`

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: `plans/004-reduce-work-page-payload.md`
- **Category**: bug
- **Planned at**: commit `fce47d5`, 2026-07-13

## Why this matters

The grouping helper explicitly sorts years descending, but rendering reverses them again. Current work is therefore pushed below older work, contrary to the code's stated newest-first intent.

## Current state

`components/pages/exhibitions/ExhibitionsPage.tsx:22-30` sorts descending:

```ts
return years.sort((a, b) => parseInt(b, 10) - parseInt(a, 10))
```

Lines 59-61 then undo it:

```tsx
{Object.entries(sortedExhibitions)
  .reverse()
  .map(([year, exhibitions]) => (
```

Preserve Panda styling, links, preview behavior, and within-year item order.

## Commands you will need

| Purpose | Command | Expected |
|---|---|---|
| Check | `npm run check` | exit 0 |
| Build | `npm run build` | exit 0 |
| Static check | `rg -n '\.reverse\(\)' components/pages/exhibitions/ExhibitionsPage.tsx` | no match in the year render path |

## Scope

**In scope**: `components/pages/exhibitions/ExhibitionsPage.tsx` only.

**Out of scope**: query ordering, CMS `year` validation, archive redesign, performance refactors, item order within a year, and all unrelated dirty files.

## Git workflow

- Branch: `codex/005-fix-work-year-order`
- Commit message: `Show newest exhibition years first`.

## Steps

### Step 1: Remove the contradictory reversal

Render entries in the descending order produced by `getExhibitionYears`. Do not add a second sort or mutate the source exhibitions array.

**Verify**: static check finds no render-time `.reverse()` and `npm run check` passes.

### Step 2: Verify representative years

Use at least three non-consecutive years and confirm headings render numerically descending. Confirm all items remain under their original year.

**Verify**: browser DOM heading order equals `[newest, middle, oldest]`; build passes.

## Test plan

- Regression fixture/manual dataset: years `2026`, `2021`, `1999` provided in mixed input order must render `2026`, `2021`, `1999`.
- Verify two exhibitions in the same year both remain present and retain their input/query order.
- Verify an empty exhibition list renders without error.

## Done criteria

- [ ] Year headings render numerically descending.
- [ ] No render-time reversal undoes the helper sort.
- [ ] Within-year behavior and design are unchanged.
- [ ] Check and build pass; only the in-scope file changed.

## STOP conditions

- The operator confirms oldest-first is the intended editorial order.
- Plan 004 changed the grouping contract and current excerpts no longer match.
- Correct ordering requires CMS data migration rather than this local fix.

## Maintenance notes

Year remains a string in the CMS, so numeric conversion is deliberate. If invalid year content is encountered, handle schema validation in a separate plan rather than broadening this fix.

