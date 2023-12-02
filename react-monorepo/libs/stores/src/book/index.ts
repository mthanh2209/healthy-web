import { create } from 'zustand'
import { IBook } from '@react-monorepo/types'

interface BookState {
  books: IBook[]
  add: (book: IBook) => void
  find: (id: number) => IBook | undefined
  update: (book: IBook) => void
  remove: (id: number) => void
  reset: () => void
}

export const useBookStore = create<BookState>((set, get) => ({
  books: [],

  add: (book: IBook) => {
    set((state) => {
      return { books: [...state.books, book] }
    })
  },

  find: (id: number) => {
    return get().books.find((book) => book.id === id)
  },

  update: (book: IBook) => {
    set((state) => {
      const afterUpdate: IBook[] = state.books.map((item) => {
        if (item.id === book.id) return book

        return item
      })

      return { books: afterUpdate }
    })
  },

  remove: (id: number) => {
    set((state) => {
      const afterDelete: IBook[] = state.books.filter((item) => item.id !== id)

      return { books: afterDelete }
    })
  },

  reset: () => set({ books: [] }),
}))
