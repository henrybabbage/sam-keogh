import { type SchemaTypeDefinition } from 'sanity'

import artist from './schemas/documents/artist'
import category from './schemas/documents/category'
import exhibition from './schemas/documents/exhibition'
import venue from './schemas/documents/venue'
import blockContent from './schemas/objects/blockContent'
import imageGallery from './schemas/objects/imageGallery'
import link from './schemas/objects/link'
import simpleBlockContent from './schemas/objects/simpleBlockContent'
import bio from './schemas/singletons/CV'
import contact from './schemas/singletons/contact'
import home from './schemas/singletons/home'
import settings from './schemas/singletons/settings'
import theme from './schemas/singletons/theme'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [exhibition, artist, category, blockContent, home, venue, imageGallery, bio, settings, theme, contact, link, simpleBlockContent]
}
