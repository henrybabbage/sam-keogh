import {defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons'

export default defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Venue name'
    }),
    defineField({
        name: 'city',
        title: 'City',
        type: 'string',
        description: 'Optional'
    }),
    defineField({
        name: 'country',
        title: 'Country',
        type: 'string',
        description: 'Optional'
    }),
  ]
})
