import { create } from 'zustand'

export type ExhibitionStore = {
    selectedExhibition?: string | null
    setSelectedExhibition: (exhibition: string | null) => void
}

export type ThemeStore = {
    typefaceSerif: string
    typefaceSansSerif: string
}

export const useExhibitionStore = create<ExhibitionStore>((set) => ({
    selectedExhibition: null,
    setSelectedExhibition: (exhibition: string | null) => set({ selectedExhibition: exhibition })
}))

export const useThemeStore = create<ThemeStore>((set) => ({
    typefaceSerif: 'simula',
    typefaceSansSerif: 'neueMontreal',
    setTypefaceSerif: (typefaceSerif: string) => set({ typefaceSerif }),
    setTypefaceSansSerif: (typefaceSansSerif: string) => set({ typefaceSansSerif })
}))
