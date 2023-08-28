import Nav from '@/components/common/Nav'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './index.css'

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
        <html lang="en">
            <body className={simula.className}>
                {children}
                <Nav />
            </body>
        </html>
    )
}
