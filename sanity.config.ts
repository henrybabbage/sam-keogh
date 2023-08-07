/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {pageStructure, singletonPlugin} from './sanity/plugins/settings'
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schema'
import home from './sanity/schemas/singletons/home'

export const PREVIEWABLE_DOCUMENT_TYPES: string[] = []

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Sam Keogh'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['home'])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  // Add and edit the content schema in the './sanity/schema' folder
  schema: {
    types: schema.types,
    // templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType))
  },
  plugins: [
    deskTool({
        structure: pageStructure([home]),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([]),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) => (singletonTypes.has(context.schemaType) ? input.filter(({ action }) => action && singletonActions.has(action)) : input)
  },
})
