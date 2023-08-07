import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
    name: 'settings',
    title: 'Settings',
    type: 'document',
    icon: CogIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            hidden: true,
        }),
        defineField({
            name: 'canonicalUrl',
            title: 'Canonical URL',
            type: 'string',
        })
    ],
    preview: {
        select: {
            title: 'title',
        }
    }
})
