import { StackCompactIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'exhibition',
    title: 'Works',
    type: 'document',
    icon: StackCompactIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            description: 'Optional'
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'string',
            options: {
                list: [
                    { title: 'Internal', value: 'internal' },
                    { title: 'External', value: 'external' }
                ],
                layout: 'dropdown'
            },
            initialValue: 'internal'
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Generate a slug to display exhibition on the website',
            options: {
                source: 'title',
                maxLength: 96
            },
            hidden: ({ document }) => document?.link !== 'internal',
            validation: (rule) => {
                return rule.custom((set, context) => {
                    const slugIsSet = set !== undefined
                    if (!slugIsSet && context?.document?.link === 'internal') {
                        return 'Exhibitions must have a slug in order to be displayed on www.samkeogh.net'
                    }
                    return true
                })
            }
        }),
        defineField({
            title: 'External URL',
            name: 'url',
            type: 'link',
            description: 'Optional: Specify an external page link for an exhibition (opens in new tab)',
            hidden: ({ document }) => document?.link !== 'external'
        }),
        defineField({
            name: 'imageGallery',
            title: 'Image gallery',
            type: 'imageGallery',
            description: 'Documentation from the exhibition'
        }),
        defineField({
            name: 'pressRelease',
            title: 'Press release',
            type: 'blockContent',
            description: 'Optional: Displayed on the individual exhibition page'
        }),
        defineField({
            name: 'vimeo',
            title: 'Vimeo / YouTube',
            type: 'array',
            of: [{ type: 'link' }],
            description: 'Optional: Provide Vimeo URLs and captions'
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            description: 'Optional: Solo or Group (used for filtering)',
            options: {
                list: [
                    { title: 'Solo', value: 'solo' },
                    { title: 'Group', value: 'group' }
                ],
                layout: 'dropdown'
            },
            initialValue: 'solo'
        }),
        defineField({
            name: 'artist',
            title: 'Artist(s)',
            type: 'reference',
            to: { type: 'artist' },
            description: 'Optional: Participating artist(s)',
            hidden: true
            // hidden: ({ document }) => document?.type !== 'group'
        }),
        // TODO: Add switch for eventDate type or exhibitionDates type
        defineField({
            name: 'startDate',
            title: 'Start date',
            type: 'datetime',
            options: {
                dateFormat: 'MMMM Do YYYY'
            },
            description: 'Optional: Only displayed inside individual exhibition pages'
        }),
        defineField({
            name: 'endDate',
            title: 'End date',
            type: 'datetime',
            options: {
                dateFormat: 'MMMM Do YYYY'
            },
            description: 'Optional: Only displayed inside individual exhibition pages',
            validation: (rule) => rule.warning().min(rule.valueOfField('startDate'))
        }),
        defineField({
            name: 'eventDate',
            title: 'Event date',
            type: 'datetime',
            options: {
                dateFormat: 'MMMM Do YYYY'
            },
            description: 'Optional: For events or performances that occur on a single date'
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
            validation: (rule) => rule.warning().required().max(4),
            description: 'Must be in format: YYYY (important for ordering)'
        }),
        defineField({
            name: 'venue',
            title: 'Venue',
            type: 'reference',
            to: [{ type: 'venue' }],
            description: 'Optional: Location of the exhibition (only displayed inside individual exhibition pages)'
        }),
        defineField({
            name: 'photographerCredit',
            title: 'Photographer credit',
            type: 'string'
        })
    ],
    orderings: [
        {
            title: 'Year (Ascending)',
            name: 'yearAscending',
            by: [{ field: 'year', direction: 'asc' }]
        },
        {
            title: 'Year (Descending)',
            name: 'yearDescending',
            by: [{ field: 'year', direction: 'desc' }]
        }
    ],
    preview: {
        select: {
            title: 'title',
            venue: 'venue.name',
            media: 'imageGallery.[0]'
        },
        prepare(selection) {
            const { venue } = selection
            return { ...selection, subtitle: venue && `${venue}` }
        }
    }
})
