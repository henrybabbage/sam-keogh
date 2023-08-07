import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/objects/blockContent'
import category from './schemas/documents/category'
import exhibition from './schemas/documents/exhibition'
import artist from './schemas/documents/artist'
import home from './schemas/singletons/home'
import venue from './schemas/documents/venue'
import imageGallery from './schemas/objects/imageGallery'
import bio from './schemas/singletons/bio'
import settings from './schemas/singletons/settings'
import theme from './schemas/singletons/theme'
import contact from './schemas/singletons/contact'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [exhibition, artist, category, blockContent, home, venue, imageGallery, bio, settings, theme, contact],
}
