import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

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
            description: 'Landing page image',
            type: 'image',
            options: {
                storeOriginalFilename: true,
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alternative text',
                    type: 'string',
                }
            ]
        })
    ],
    preview: {
        select: {
            title: 'name'
        }
    }
})
