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
            hidden: true
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
                    { label: 'Custom...', value: 'custom' }
                ]
            },
            validation: (rule) => rule.warning().required().error('Color must be set for the website background color'),
        }),
        defineField({
            name: 'fontColor',
            title: 'Font color',
            type: 'simplerColor',
            options: {
                colorList: [
                    { label: 'Light', value: '#ffffff' },
                    { label: 'Dark', value: '#222222' },
                    { label: 'Custom...', value: 'custom' }
                ]
            },
            validation: (rule) => rule.warning().required().error('Color must be set for the website background color'),
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
                    { title: 'Adobe Garamond Pro', value: 'garamond' }
                ],
                layout: 'dropdown'
            },
            initialValue: 'simula',
            validation: (rule) => rule.warning().required().error('Sans serif must be set for the website text'),
        }),
        defineField({
            name: 'typefaceSansSerif',
            title: 'Typeface sans serif',
            type: 'string',
            description: 'Select a sans serif typeface',
            options: {
                list: [
                    { title: 'Azeret Mono', value: 'azeret' },
                    { title: 'Neuebit', value: 'neuebit' },
                    { title: 'ROM', value: 'rom' }
                ],
                layout: 'dropdown'
            },
            initialValue: 'azeret',
            validation: (rule) => rule.warning().required().error('Serif must be set for the website text'),
        })
    ],
    preview: {
        select: {
            title: 'title'
        }
    }
})