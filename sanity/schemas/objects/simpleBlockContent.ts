import { defineArrayMember, defineType } from 'sanity'

export default defineType({
    title: 'Simple Block Content',
    name: 'simpleBlockContent',
    type: 'array',
    of: [
        defineArrayMember({
            title: 'Block',
            type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'Heading', value: 'h4' }
            ],
            lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' }
            ],
            marks: {
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                    { title: 'Underline', value: 'underline' }
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
                                        allowRelative: false,
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
