import { create } from 'zustand'

interface MissionStore {
  isVisible: boolean
  show: () => void
  hide: () => void
}

export const useMissionStore = create<MissionStore>((set) => ({
  isVisible: false,
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
}))