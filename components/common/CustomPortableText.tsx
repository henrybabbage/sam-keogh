import { css, cx } from '@/styled-system/css'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'
import ImageBox from './ImageBox'

export function CustomPortableText({ paragraphClasses, value }: { paragraphClasses?: string; value: PortableTextBlock[] }) {
    const components: PortableTextComponents = {
        block: {
            normal: ({ children }) => {
                return (
                    <p
                        className={cx(
                            css({ fontFamily: 'simula', fontStyle: 'normal', fontSize: 'md', color: 'foreground' }),
                            paragraphClasses
                        )}
                    >
                        {children}
                    </p>
                )
            },
            h4: ({ children }) => (
                <h4
                    className={css({
                        fontFamily: 'azeretMono',
                        fontStyle: 'normal',
                        fontSize: 'md',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        mb: '4',
                        color: 'foreground'
                    })}
                >
                    {children}
                </h4>
            )
        },
        marks: {
            em: ({ children }) => (
                <em className={cx(css({ fontFamily: 'simula', fontStyle: 'italic', fontSize: 'md', color: 'foreground' }), paragraphClasses)}>{children}</em>
            ),
            link: ({ children, value }) => {
                return (
                    <a
                        className={css({
                            color: 'foreground',
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
        list: {
            bullet: ({ children }) => (
                <ul className={cx(css({ fontFamily: 'simula', fontStyle: 'normal', fontSize: 'md', color: 'foreground', mt: '1' }), paragraphClasses)}>
                    {children}
                </ul>
            ),
            number: ({ children }) => (
                <ol className={cx(css({ fontFamily: 'simula', fontStyle: 'normal', fontSize: 'md', color: 'foreground', mt: '1' }), paragraphClasses)}>
                    {children}
                </ol>
            )
        },
        types: {
            image: ({ value }: { value: Image & { alt?: string; caption?: string } }) => {
                return (
                    <div className={css({ mt: '2', mb: '2' })}>
                        <ImageBox image={value} alt={value.alt} classesWrapper={css({ pos: 'relative', aspectRatio: '16/9' })} />
                        {value?.caption && (
                            <div className={css({ fontFamily: 'simula', fontSize: 'sm', lineHeight: 'sm', color: 'foreground' })}>{value.caption}</div>
                        )}
                    </div>
                )
            }
        }
    }

    return <PortableText components={components} value={value} />
}
