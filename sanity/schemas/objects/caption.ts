import { BlockContentIcon } from '@sanity/icons'
import { defineArrayMember, defineType } from 'sanity'

export default defineType({
    name: 'caption',
    title: 'Caption',
    type: 'array',
    icon: BlockContentIcon,
    of: [
        defineArrayMember({
            title: 'Block',
            type: 'block',
            styles: [{ title: 'Normal', value: 'normal' }],
            lists: [],
            marks: {
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' }
                ],
                annotations: [
                    {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                            {
                                title: 'URL',
                                name: 'href',
                                type: 'url',
                                validation: (rule) =>
                                    rule.uri({
                                        allowRelative: true,
                                        scheme: ['https', 'http', 'mailto', 'tel']
                                })
                            }
                        ]
                    }
                ]
            }
        })
    ]
})
