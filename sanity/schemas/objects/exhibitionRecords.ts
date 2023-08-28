import { defineField, defineType } from 'sanity'
import {ThListIcon} from '@sanity/icons'

export default defineType({
    name: 'exhibitionRecords',
    title: 'Exhibition records',
    type: 'object',
    icon: ThListIcon,
    fields: [
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
            description: "Must be in format 'YYYY'",
            validation: (rule) => rule.required().max(4),
        }),
        defineField({
            name: 'exhibitionRecord',
            title: 'Exhibition record',
            type: 'blockContent',
            description: 'Format: title (italicised), venue, city, country',
            validation: (rule) => rule.required(),
        })
    ],
    preview: {
            select: {
            blocks: 'exhibitionRecord',
            year: 'year',
            },
            prepare(value) {
            const block = (value.blocks || []).find(
                (block: any) => block._type === 'block'
            );
            const { year } = value;
            return {
                title: block
                ? block.children
                    .filter((child: any) => child._type === 'span')
                    .map((span: any) => span.text)
                    .join('')
                : 'No data',
                subtitle: year ? year : 'No year',
                media: ThListIcon,
            };
        },
    },
})
