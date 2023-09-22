import { create } from 'zustand'

export type ExhibitionStore = {
    selectedExhibition?: string | null
    setSelectedExhibition: (exhibition: string | null) => void
}

export const useExhibitionStore = create<ExhibitionStore>((set) => ({
    selectedExhibition: null,
    setSelectedExhibition: (exhibition: string | null) => set({ selectedExhibition: exhibition })
}))
