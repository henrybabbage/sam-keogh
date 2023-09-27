import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'videoLink',
    title: 'Video link',
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
            name: 'provider',
            title: 'Provider',
            type: 'string',
            description: 'Vimeo or YouTube',
            options: {
                list: [
                    { title: 'Vimeo', value: 'vimeo' },
                    { title: 'YouTube', value: 'youtube' }
                ],
                layout: 'dropdown'
            },
            initialValue: 'vimeo'
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: (rule) =>
                rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'http']
                })
        })
    ]
})
