import Nav from '@/components/common/Nav'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './index.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Sam Keogh',
    description: 'Website for the artist Sam Keogh'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
                <Nav />
            </body>
        </html>
    )
}
