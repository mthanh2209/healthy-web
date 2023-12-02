import { create } from 'zustand'

import { IUser } from '@react-monorepo/types'

interface UserState {
  users: IUser[]
  add: (user: IUser) => void
  update: (user: IUser) => void
  remove: (id: number) => void
  reset: () => void
}

export const useUserStore = create<UserState>()((set) => ({
  users: [],

  add: (user: IUser) => {
    set((state) => {
      return { users: [...state.users, user] }
    })
  },

  update: (user: IUser) => {
    set((state) => {
      const afterUpdate: IUser[] = state.users.map((item) => {
        if (item.id === user.id) return user

        return item
      })

      return { users: afterUpdate }
    })
  },

  remove: (id: number) => {
    set((state) => {
      const afterDelete: IUser[] = state.users.filter((item) => item.id !== id)

      return { users: afterDelete }
    })
  },

  reset: () => set({ users: [] }),
}))
