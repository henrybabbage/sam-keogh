import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'link',
    title: 'Link',
    type: 'object',
    icon: LinkIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Link text to display'
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: (rule) =>
            rule.uri({
                allowRelative: true,
                scheme: ["https", "http", "mailto", "tel"],
            }),
        }),
    ],
})
