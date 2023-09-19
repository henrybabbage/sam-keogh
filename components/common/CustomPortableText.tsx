import { css } from '@/styled-system/css'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'
import ImageBox from './ImageBox'

export function CustomPortableText({ paragraphClasses, value }: { paragraphClasses?: string; value: PortableTextBlock[] }) {
    const components: PortableTextComponents = {
        block: {
            normal: ({ children }) => {
                return <p className={paragraphClasses}>{children}</p>
            }
        },
        marks: {
            link: ({ children, value }) => {
                return (
                    <a
                        className={css({
                            textDecorationLine: 'underline',
                            transitionProperty:
                                'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
                            transitionTimingFunction: 'transition',
                            transitionDuration: 'transition',
                            _hover: { opacity: '0.5' }
                        })}
                        href={value?.href}
                        rel="noreferrer noopener"
                    >
                        {children}
                    </a>
                )
            }
        },
        types: {
            image: ({ value }: { value: Image & { alt?: string; caption?: string } }) => {
                return (
                    <div className={css({ mt: '2', mb: '2' })}>
                        <ImageBox image={value} alt={value.alt} classesWrapper={css({ pos: 'relative', aspectRatio: '16/9' })} />
                        {value?.caption && (
                            <div className={css({ fontFamily: 'azeretMono', fontSize: 'sm', lineHeight: 'sm', color: 'black' })}>{value.caption}</div>
                        )}
                    </div>
                )
            }
        }
    }

    return <PortableText components={components} value={value} />
}
