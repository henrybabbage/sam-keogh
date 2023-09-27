import './index.css'

export const metadata = {
    title: 'Sam Keogh',
    description: 'Sam Keogh Sanity Studio'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
