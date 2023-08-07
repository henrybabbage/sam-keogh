import {defineField, defineType} from 'sanity'
import {ColorWheelIcon} from '@sanity/icons'

export default defineType({
    name: 'theme',
    title: 'Theme',
    type: 'document',
    icon: ColorWheelIcon,
    fields: [
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
        })
    ]
})