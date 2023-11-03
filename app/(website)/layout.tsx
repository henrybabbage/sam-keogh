/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import GoogleAnalytics from '@/components/common/GoogleAnalytics'
import Nav from '@/components/common/Nav'
import { getTheme } from '@/sanity/lib/sanity.fetch'
// @ts-ignore
// TODO this package is still experimental and is missing type declarations https://github.com/vercel/next.js/discussions/48256#discussioncomment-7439421
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { create } from 'zustand'
import './index.css'

const neueMontreal = localFont({
    src: [
        {
            path: '../../fonts/NeueMontreal/NeueMontreal_Regular.woff2',
            style: 'normal',
            weight: '400'
        },
        {
            path: '../../fonts/NeueMontreal/NeueMontreal_Italic.woff2',
            style: 'italic',
            weight: '400'
        },
        {
            path: '../../fonts/NeueMontreal/NeueMontreal_Bold.woff2',
            style: 'normal',
            weight: '700'
        },
        {
            path: '../../fonts/NeueMontreal/NeueMontreal_BoldItalic.woff2',
            style: 'italic',
            weight: '700'
        }
    ],
    display: 'swap',
    variable: '--font-neue-montreal'
})

const simula = localFont({
    src: [
        {
            path: '../../fonts/Simula/Simula_Book.woff2',
            style: 'normal',
            weight: '400'
        },
        {
            path: '../../fonts/Simula/Simula_BookItalic.woff2',
            style: 'italic',
            weight: '400'
        }
    ],
    display: 'swap',
    variable: '--font-simula'
})

export const metadata: Metadata = {
    title: 'Sam Keogh',
    description: 'Website for the artist Sam Keogh'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const data = await getTheme()

    const { backgroundColor, fontColor, typefaceSerif, typefaceSansSerif } = data ?? {}

    const fallbackColor = '#000000'
    const color = fontColor?.value ?? fallbackColor

    const useThemeStore = create(() => ({ backgroundColor: backgroundColor }))
    const bg = useThemeStore.getState().backgroundColor

    const backgroundFallback = '#fff1e5'
    const background = bg?.value ?? backgroundFallback

    return (
        <html suppressHydrationWarning lang="en" className={`${simula.variable} ${neueMontreal.variable}`}>
            <body
                style={{
                    backgroundColor: `${background}`,
                    color: `${color}`
                }}
            >
                {children}
                <Nav background={background} />
            </body>
            {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} /> : null}
            {process.env.NEXT_PUBLIC_GTM_ID ? <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} /> : null}
        </html>
    )
}
