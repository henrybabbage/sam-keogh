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
            name: 'desktopHero',
            title: 'Desktop hero',
            type: 'image',
            description: 'Landing page image on desktop browsers',
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
            name: 'mobileHero',
            title: 'Mobile hero',
            type: 'image',
            description: 'Landing page image on mobile browsers',
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
    ],
    preview: {
        select: {
            title: 'name'
        }
    }
})
