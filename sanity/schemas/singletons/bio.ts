import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'bio',
    title: 'CV',
    type: 'document',
    icon: UserIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            hidden: true,
            readOnly: true,
            description: 'Internal use'
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            readOnly: true,
            description: 'Generate the URL slug for this page',
            options: {
                source: 'name',
                maxLength: 96
            }
        }),
        defineField({
            name: 'cv',
            title: 'CV',
            type: 'simpleBlockContent'
        })
    ]
})
