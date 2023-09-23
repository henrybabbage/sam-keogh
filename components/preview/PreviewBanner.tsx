/* eslint-disable @next/next/no-html-link-for-pages */
import { css } from '@/styled-system/css'

export function PreviewBanner() {
    return (
        <div className={css({ bgColor: 'black', p: '3', textAlign: 'center', color: 'white' })}>
            <h3 className={css({ fontFamily: 'azeretMono', fontStyle: 'normal', fontSize: 'md', textTransform: 'uppercase' })}>{'Previewing drafts'}</h3>
            <a
                className={css({
                    fontFamily: 'azeretMono',
                    fontStyle: 'normal',
                    fontSize: 'md',
                    textTransform: 'uppercase',
                    textDecorationLine: 'underline',
                    transitionProperty:
                        'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
                    transitionTimingFunction: 'transition',
                    transitionDuration: 'transition',
                    _hover: { opacity: '0.5' }
                })}
                href="/api/disable-draft"
            >
                Back to published
            </a>
        </div>
    )
}
