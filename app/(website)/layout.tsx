/* eslint-disable @typescript-eslint/no-unused-vars */
import Nav from '@/components/common/Nav'
import { getTheme } from '@/sanity/lib/sanity.fetch'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
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
    const backgroundFallback = '#fff1e5'
    const background = backgroundColor?.value ?? backgroundFallback
    return (
        <html lang="en" className={`${simula.variable} ${neueMontreal.variable}`}>
            <body
                style={{
                    backgroundColor: `${backgroundFallback}`,
                    color: `${color}`
                }}
            >
                {children}
                <Nav />
            </body>
        </html>
    )
}
