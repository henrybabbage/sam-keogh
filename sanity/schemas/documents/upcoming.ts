import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'upcoming',
    title: 'Upcoming',
    type: 'document',
    icon: CalendarIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Exhibition title / announcement'
        }),
        defineField({
            name: 'info',
            title: 'Info',
            type: 'string',
            description: 'Optional: extra information to display underneath title'
        }),
        defineField({
            name: 'upcomingDate',
            title: 'Date',
            type: 'datetime',
            options: {
                dateFormat: 'MMMM Do YYYY'
            },
            description: 'Date for the item'
        }),
        defineField({
            title: 'External URL',
            name: 'url',
            type: 'link',
            description: 'Optional: Specify an external page link for the announcement (opens in new tab)'
        }),
        defineField({
            name: 'venue',
            title: 'Venue',
            type: 'reference',
            to: [{ type: 'venue' }],
            description: 'Optional: Location for the announcement'
        })
    ],
    preview: {
        select: {
            title: 'title',
            venue: 'venue.name',
            date: 'upcomingDate',
            media: 'imageGallery.[0]'
        },
        prepare(selection) {
            const { venue, date } = selection
            return { ...selection, subtitle: venue ? `${venue} | ${date}` : `${date}` }
        }
    }
})
