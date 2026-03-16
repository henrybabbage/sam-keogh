import { css, cx } from '@/styled-system/css'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'
import ImageBox from './ImageBox'

type CustomPortableTextProps = {
    paragraphClasses?: string
    value: PortableTextBlock[]
    variant?: 'default' | 'contact'
}

export function CustomPortableText({ paragraphClasses, value, variant = 'default' }: CustomPortableTextProps) {
    const isContactVariant = variant === 'contact'

    const components: PortableTextComponents = {
        block: {
            normal: ({ children }) => {
                return (
                    <p
                        className={cx(
                            css(
                                isContactVariant
                                    ? {
                                          fontFamily: 'neueMontreal',
                                          fontStyle: 'normal',
                                          fontSize: { base: 'sm', lg: 'lg' },
                                          fontWeight: '700',
                                          textTransform: 'uppercase',
                                          textAlign: 'center'
                                      }
                                    : {
                                          fontFamily: 'simula',
                                          fontStyle: 'normal',
                                          fontSize: { base: 'sm', lg: 'lg' }
                                      }
                            ),
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
                        fontFamily: 'neueMontreal',
                        fontStyle: 'normal',
                        fontSize: { base: 'sm', lg: 'lg' },
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        my: '6'
                    })}
                >
                    {children}
                </h4>
            )
        },
        marks: {
            em: ({ children }) => (
                <em
                    className={cx(
                        css(
                            isContactVariant
                                ? {
                                      fontFamily: 'neueMontreal',
                                      fontStyle: 'italic',
                                      fontSize: { base: 'sm', lg: 'lg' },
                                      fontWeight: '700',
                                      textTransform: 'uppercase'
                                  }
                                : {
                                      fontFamily: 'simula',
                                      fontStyle: 'italic',
                                      fontSize: { base: 'sm', lg: 'lg' }
                                  }
                        ),
                        paragraphClasses
                    )}
                >
                    {children}
                </em>
            ),
            link: ({ children, value }) => {
                const isExternal = typeof value?.href === 'string' && /^https?:\/\//.test(value.href)

                return (
                    <a
                        className={css(
                            isContactVariant
                                ? {
                                      textDecorationLine: 'underline',
                                      textUnderlineOffset: '4px',
                                      textDecorationThickness: '1.5px',
                                      transitionProperty:
                                          'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
                                      transitionTimingFunction: 'transition',
                                      transitionDuration: 'transition',
                                      _hover: { color: 'hover' },
                                      _active: { color: 'active' }
                                  }
                                : {
                                      textDecorationLine: 'underline',
                                      transitionProperty:
                                          'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
                                      transitionTimingFunction: 'transition',
                                      transitionDuration: 'transition',
                                      _hover: { opacity: '0.5' }
                                  }
                        )}
                        href={value?.href}
                        target={isExternal ? '_blank' : undefined}
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
