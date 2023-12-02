import { create } from 'zustand'
import { IHireRequest } from '@react-monorepo/types'

interface HiredState {
  hireRequests: IHireRequest[]
  add: (book: IHireRequest) => void
  update: (book: IHireRequest) => void
  remove: (id: number) => void
  reset: () => void
}

export const useHiredStore = create<HiredState>((set) => ({
  hireRequests: [],

  add: (hireRequest: IHireRequest) => {
    set((state) => {
      return { hireRequests: [...state.hireRequests, hireRequest] }
    })
  },

  update: (hireRequest: IHireRequest) => {
    set((state) => {
      const afterUpdate: IHireRequest[] = state.hireRequests.map((item) => {
        if (item.id === hireRequest.id) return hireRequest

        return item
      })

      return { hireRequests: afterUpdate }
    })
  },

  remove: (id: number) => {
    set((state) => {
      const afterDelete: IHireRequest[] = state.hireRequests.filter((item) => item.id !== id)

      return { hireRequests: afterDelete }
    })
  },

  reset: () => set({ hireRequests: [] }),
}))
