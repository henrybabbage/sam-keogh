import Nav from '@/components/common/Nav'
import type { Metadata } from 'next'
import { Azeret_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './index.css'

const azeretMono = Azeret_Mono({
    weight: '400',
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-azeret-mono'
})

const simula = localFont({
    src: '../../fonts/Simula-Book.otf',
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
