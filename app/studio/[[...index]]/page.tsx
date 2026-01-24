import Studio from './Studio'
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
	title: 'Sam Keogh Studio',
	description: 'Sam Keogh Sanity Studio'
}

export default function StudioPage() {
	return <Studio />
}
