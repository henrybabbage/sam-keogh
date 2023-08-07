import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/objects/blockContent'
import category from './schemas/documents/category'
import exhibition from './schemas/documents/exhibition'
import artist from './schemas/documents/artist'
import home from './schemas/singletons/home'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [exhibition, artist, category, blockContent, home],
}
