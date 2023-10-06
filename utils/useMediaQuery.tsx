import { useCallback, useEffect, useState } from 'react'

export const useMediaQuery = (query: string): boolean => {
    const isMatch = useCallback((query: string): boolean => {
        if (typeof window === 'undefined') return false

        return window.matchMedia(query).matches
    }, [])

    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const matchMedia = window.matchMedia(query)

        const handleChange = () => {
            setMatches(isMatch(query))
        }

        handleChange()

        matchMedia.addEventListener('change', handleChange)

        return () => {
            matchMedia.removeEventListener('change', handleChange)
        }
    }, [query, isMatch])

    return matches
}
