import Nav from '@/components/common/Nav'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './index.css'

const azeretMono = localFont({
    src: [
        {
            path: '../../fonts/AzeretMono/AzeretMono_Regular.otf',
            style: 'normal',
            weight: '400'
        },
        {
            path: '../../fonts/AzeretMono/AzeretMono_Italic.otf',
            style: 'italic',
            weight: '400'
        }
    ],
    display: 'swap',
    variable: '--font-azeret-mono'
})

const simula = localFont({
    src: '../../fonts/Simula/Simula-Book.otf',
    weight: '400',
    style: 'normal',
    display: 'swap',
    variable: '--font-simula'
})

export const metadata: Metadata = {
    title: 'Sam Keogh',
    description: 'Website for the artist Sam Keogh'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${simula.variable} ${azeretMono.variable}`}>
            <body>
                {children}
                <Nav />
            </body>
        </html>
    )
}
