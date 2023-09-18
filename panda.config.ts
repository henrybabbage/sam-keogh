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

    globalCss: {
        body: {
            backgroundColor: '#fff'
        }
    },

    // The output directory for your css system
    outdir: 'styled-system'
})
