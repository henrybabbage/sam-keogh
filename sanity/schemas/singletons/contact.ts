import { EarthGlobeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'contact',
    title: 'Contact',
    type: 'document',
    icon: EarthGlobeIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            hidden: true,
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'galleryEmail',
            title: 'Gallery email',
            type: 'string',
        }),
    ]
})
