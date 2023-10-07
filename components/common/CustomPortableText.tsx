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
                    <p className={cx(css({ fontFamily: 'simula', fontStyle: 'normal', fontSize: { base: 'sm', lg: 'lg' } }), paragraphClasses)}>{children}</p>
                )
            },
            h4: ({ children }) => (
                <h4
                    className={css({
                        fontFamily: 'neueMontreal',
                        fontStyle: 'normal',
                        fontSize: { base: 'sm', lg: 'lg' },
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        mb: '4'
                    })}
                >
                    {children}
                </h4>
            )
        },
        marks: {
            em: ({ children }) => (
                <em className={cx(css({ fontFamily: 'simula', fontStyle: 'italic', fontSize: { base: 'sm', lg: 'lg' } }), paragraphClasses)}>{children}</em>
            ),
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
        list: {
            bullet: ({ children }) => <ul className={cx(css({ fontFamily: 'simula', fontStyle: 'normal', fontSize: { base: 'sm', lg: 'lg' }, mt: '1' }), paragraphClasses)}>{children}</ul>,
            number: ({ children }) => <ol className={cx(css({ fontFamily: 'simula', fontStyle: 'normal', fontSize: { base: 'sm', lg: 'lg' }, mt: '1' }), paragraphClasses)}>{children}</ol>
        },
        types: {
            image: ({ value }: { value: Image & { alt?: string; caption?: string } }) => {
                return (
                    <div className={css({ mt: '2', mb: '2' })}>
                        <ImageBox image={value} alt={value.alt} classesWrapper={css({ pos: 'relative', aspectRatio: '16/9' })} />
                        {value?.caption && (
                            <div className={css({ fontFamily: 'simula', fontSize: { base: 'sm', lg: 'lg' }, lineHeight: 'sm' })}>{value.caption}</div>
                        )}
                    </div>
                )
            }
        }
    }

    return <PortableText components={components} value={value} />
}
