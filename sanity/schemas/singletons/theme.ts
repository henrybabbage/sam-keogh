import { ColorWheelIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'theme',
    title: 'Theme',
    type: 'document',
    icon: ColorWheelIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            hidden: true,
        }),
        defineField({
            name: 'backgroundColor',
            title: 'Background color',
            type: 'simplerColor',
            options: {
                colorList: [
                  { label: 'Light', value: '#ffffff' },
                  { label: 'Dark', value: '#1E1E1E' },
                  { label: 'Financial Times', value: '#FFF1E5' },
                  { label: 'Custom...', value: 'custom' },
                ]
            }
        }),
        defineField({
            name: 'typefaceSerif',
            title: 'Typeface serif',
            type: 'string',
            description: 'Select a serif typeface',
            options: {
                list: [
                    { title: 'Simula', value: 'simula' },
                    { title: 'Mondwest', value: 'mondwest' },
                    { title: 'Adobe Garamond Pro', value: 'garamond' },
                ],
                layout: 'dropdown',
            },
            initialValue: 'simula',
        }),
        defineField({
            name: 'typefaceSansSerif',
            title: 'Typeface sans serif',
            type: 'string',
            description: 'Select a sans serif typeface',
            options: {
                list: [
                    { title: 'Azeret', value: 'azeret' },
                    { title: 'Neuebit', value: 'neuebit' },
                    { title: 'ROM', value: 'rom' },
                ],
                layout: 'dropdown',
            },
            initialValue: 'azeret',
        }),
    ],
    preview: {
        select: {
            title: 'title',
        }
    }
})