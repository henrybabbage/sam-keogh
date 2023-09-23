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
            hidden: false,
            readOnly: true,
            description: 'Internal use'
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Generate the URL slug for this page',
            options: {
                source: 'title',
                maxLength: 96
            },
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'instagram',
            title: 'Instagram',
            type: 'link',
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'link',
        }),
    ],
})
