import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'home',
    title: 'Home',
    type: 'document',
    icon: HomeIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            hidden: true
        }),
        defineField({
            name: 'hero',
            title: 'Hero',
            type: 'image',
            description: 'Landing page image',
            validation: (Rule) => Rule.required(),
            options: {
                storeOriginalFilename: true,
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alternative text',
                    type: 'string',
                    description: 'For accessibility and search engine optimization'
                }
            ]
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'reference',
            to: [{ type: 'exhibition' }],
            description: 'Link the displayed image to an exhibition page'
        })
    ],
    preview: {
        select: {
            title: 'name'
        }
    }
})
