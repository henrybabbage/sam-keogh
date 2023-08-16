import { StackCompactIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'exhibition',
  title: 'Exhibitions',
  type: 'document',
  icon: StackCompactIcon,
  fields: [
    defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
    }),
    defineField({
        name: 'subtitle',
        title: 'Subtitle',
        type: 'string',
        description: 'Optional',
    }),
    defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
            source: 'title',
            maxLength: 96,
        },
    }),
    defineField({
        title: 'External URL',
        name: 'url',
        type: 'url',
        description: 'Optionally specify an external page link for an exhibition (opens in new tab)',
        validation: (rule) =>
            rule.uri({
                scheme: ['http', 'https'],
                allowRelative: true,
        }),
    }),
    defineField({
        name: 'imageGallery',
        title: 'Image gallery',
        type: 'imageGallery',
        description: 'Documentation',
    }),
    defineField({
        name: 'pressRelease',
        title: 'Press release',
        type: 'blockContent',
    }),
    defineField({
        name: 'type',
        title: 'Type',
        type: 'string',
        description: 'Solo or Group',
        options: {
            list: [
                { title: 'Solo', value: 'solo' },
                { title: 'Group', value: 'group' },
            ],
            layout: 'dropdown',
        },
        initialValue: 'solo',
    }),
    defineField({
        name: 'artist',
        title: 'Artist(s)',
        type: 'reference',
        to: {type: 'artist'},
        description: 'Participating artist(s)',
        hidden: ({ document }) => document?.type !== 'group',
    }),
    defineField({
        name: 'startDate',
        title: 'Start date',
        type: 'datetime',
        options: {
            dateFormat: 'MMMM Do YYYY',
        },
    }),
    defineField({
        name: 'endDate',
			title: 'End date',
			type: 'datetime',
			options: {
				dateFormat: 'MMMM Do YYYY',
			},
			validation: (Rule) => Rule.warning().min(Rule.valueOfField('startDate')),
    }),
    defineField({
        name: 'venue',
        title: 'Venue',
        type: 'reference',
        description: 'Location of the exhibition',
        to: [{ type: 'venue' }],
    }),
    defineField({
        name: 'photographerCredit',
        title: 'Photographer credit',
        type: 'string',
    })
  ],
  preview: {
    select: {
        title: 'title',
        artist: 'artist.name',
        media: 'imageGallery.[0]',
    },
    prepare(selection) {
        const {artist} = selection
        return {...selection, subtitle: artist && `by ${artist}`}
    },
  },
})
