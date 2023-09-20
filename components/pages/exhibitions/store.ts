import { ExhibitionProps } from '@/types'
import { create } from 'zustand'

export type ExhibitionStore = {
    selectedExhibition?: ExhibitionProps | null
    setSelectedExhibition: (exhibition: ExhibitionProps | null) => void
}

export const useExhibitionStore = create<ExhibitionStore>((set) => ({
    selectedExhibition: null,
    setSelectedExhibition: (exhibition: ExhibitionProps | null) => set({ selectedExhibition: exhibition })
}))
