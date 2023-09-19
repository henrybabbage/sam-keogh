import { defineConfig } from '@pandacss/dev'

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ['./components/**/*.{ts,tsx,js,jsx}', './app/**/*.{ts,tsx,js,jsx}'],

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
        extend: {
            tokens: {
                fonts: {
                    simula: { value: 'var(--font-simula), serif' },
                    azeretMono: { value: 'var(--font-azeret-mono), Menlo, monospace' }
                }
            }
        }
    },

    patterns: {
        extend: {
            scrollable: {
                description: 'A container that allows for scrolling',
                properties: {
                    // The direction of the scroll
                    direction: { type: 'enum', value: ['horizontal', 'vertical'] },
                    // Whether to hide the scrollbar
                    hideScrollbar: { type: 'boolean' }
                },
                // disallow the `overflow` property (in TypeScript)
                blocklist: ['overflow'],
                transform(props: { direction: 'horizontal' | 'vertical'; hideScrollbar: boolean }) {
                    const { direction, hideScrollbar, ...rest } = props
                    return {
                        overflow: 'auto',
                        height: direction === 'horizontal' ? '100%' : 'auto',
                        width: direction === 'vertical' ? '100%' : 'auto',
                        scrollbarWidth: hideScrollbar ? 'none' : 'auto',
                        WebkitOverflowScrolling: 'touch',
                        '&::-webkit-scrollbar': {
                            display: hideScrollbar ? 'none' : 'auto'
                        },
                        ...rest
                    }
                }
            }
        }
    },

    globalCss: {
        body: {
            backgroundColor: '#FFF1E5'
        }
    },

    // The output directory for your css system
    outdir: 'styled-system'
})
