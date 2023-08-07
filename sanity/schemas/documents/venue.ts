import {defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons'

export default defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Venue name'
    }),
    defineField({
        name: 'city',
        title: 'City',
        type: 'string',
    }),
    defineField({
        name: 'country',
        title: 'Country',
        type: 'string',
    }),
  ]
})
