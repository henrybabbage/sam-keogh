# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an artist portfolio website for Sam Keogh built with Next.js 14 (App Router), TypeScript, Panda CSS for styling, and Sanity CMS for content management. The site showcases exhibitions, CV/bio information, and contact details with a custom theming system.

## Key Commands

- `npm run dev` - Start development server (clears .next cache first)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prepare` - Generate Panda CSS code (runs automatically on install)

## Architecture

### Frontend Structure
- **App Router**: Uses Next.js 14 App Router with nested layouts
- **Styling**: Panda CSS with custom tokens, patterns, and responsive breakpoints
- **Fonts**: Custom local fonts (Neue Montreal, Simula) with CSS variables
- **State**: Zustand for theme state management

### Content Management
- **CMS**: Sanity Studio mounted at `/studio` route
- **Data Fetching**: Server-side with tag-based revalidation using `sanityFetch()`
- **Schemas**: Document types (artist, exhibition, venue) and singletons (home, bio, theme, contact)
- **Images**: Sanity CDN with Next.js Image optimization

### Key Patterns

#### Panda CSS Integration
- Custom `aspect` pattern for responsive image containers with ratio calculations
- `scrollable` pattern for horizontal/vertical scrolling containers
- Custom color tokens and font variables defined in `panda.config.ts`
- Generated styled-system in `/styled-system` directory

#### Sanity Integration
- Server-only data fetching in `sanity/lib/sanity.fetch.ts`
- Tag-based cache invalidation for specific content types
- Singleton documents for global content (theme, settings, bio)
- Custom studio plugins for preview and production URL handling

#### Theming System
- Dynamic background/font colors from Sanity theme singleton
- Zustand store for theme state management
- Fallback colors when theme data unavailable

### File Organization
- `/app/(website)` - Public website routes
- `/app/studio` - Sanity Studio admin interface
- `/components` - Reusable UI components organized by type (common, pages, icons)
- `/sanity` - CMS configuration, schemas, queries, and utilities
- `/types` - TypeScript type definitions
- `/fonts` - Local font files (Neue Montreal, Simula)

### Environment Variables
Required variables (see .env.example):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_READ_TOKEN`

Optional:
- `NEXT_PUBLIC_GOOGLE_ANALYTICS`
- `NEXT_PUBLIC_GTM_ID`

## Development Notes

- Panda CSS generates styles in `/styled-system` - do not edit these files directly
- Use the custom `aspect` pattern for responsive images rather than CSS aspect-ratio
- Sanity queries use GROQ and are centralized in `sanity/lib/sanity.queries.ts`
- Image optimization uses both Sanity's image pipeline and Next.js Image component
- The site supports dynamic theming through Sanity's theme singleton