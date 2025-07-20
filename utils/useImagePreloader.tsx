'use client'

import { useEffect, useState } from 'react'

export function useImagePreloader(imageUrls: string[]) {
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
    const [isAllLoaded, setIsAllLoaded] = useState(false)

    useEffect(() => {
        if (!imageUrls.length) {
            setIsAllLoaded(true)
            return
        }

        const preloadPromises = imageUrls.map((url) => {
            return new Promise<string>((resolve, reject) => {
                const img = new window.Image()
                img.onload = () => {
                    setLoadedImages(prev => new Set(prev).add(url))
                    resolve(url)
                }
                img.onerror = reject
                img.src = url
            })
        })

        Promise.allSettled(preloadPromises).then(() => {
            setIsAllLoaded(true)
        })

        // Cleanup function
        return () => {
            setLoadedImages(new Set())
            setIsAllLoaded(false)
        }
    }, [imageUrls])

    return { loadedImages, isAllLoaded, isImageLoaded: (url: string) => loadedImages.has(url) }
}

export function preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const img = new window.Image()
        img.onload = () => resolve()
        img.onerror = reject
        img.src = url
    })
}