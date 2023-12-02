import { AxiosResponse } from 'axios'
import { shallow } from 'zustand/shallow'
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { add, edit, find, get, remove } from '@react-monorepo/services'
import { IAddService, IBook, IEditService, IRemoveService } from '@react-monorepo/types'
import { useBookStore } from '@react-monorepo/stores'

const BOOK_ENDPOINT = import.meta.env.VITE_BOOKS_ENDPOINT

export const useGetBooks = (): UseQueryResult<IBook[], Error> => {
  const bookQuery = useQuery<IBook[], Error, IBook[], string[]>({
    queryKey: ['books'],
    queryFn: (): Promise<IBook[]> => get<IBook>(BOOK_ENDPOINT),
  })

  return bookQuery
}

export const useGetBookDetail = (bookId: number | string | undefined): UseQueryResult<IBook, Error> => {
  const bookQuery = useQuery<IBook, Error, IBook, (string | number)[]>({
    queryKey: ['books', Number(bookId)],
    enabled: !!bookId,
    queryFn: (): Promise<IBook> => find<IBook>(`${BOOK_ENDPOINT}/${bookId}`),
  })

  return bookQuery
}

export const useMutateDeleteBook = (): UseMutationResult<number, Error, IRemoveService, undefined> => {
  const { removeBook } = useBookStore((state) => ({ removeBook: state.remove }), shallow)
  const queryClient = useQueryClient()

  const mutateBook = useMutation<number, Error, IRemoveService, undefined>({
    mutationFn: (variables: IRemoveService): Promise<AxiosResponse['status']> => remove(variables.path, variables.id),

    onSuccess: (_, variables: IRemoveService) => {
      queryClient.invalidateQueries(['books'], { exact: true })
      removeBook(variables.id)
    },
  })

  return mutateBook
}

export const useMutateAddBook = (): UseMutationResult<IBook, Error, IAddService<Omit<IBook, 'id'>>, undefined> => {
  const queryClient = useQueryClient()
  const addMutation = useMutation<IBook, Error, IAddService<Omit<IBook, 'id'>>, undefined>({
    mutationFn: (variables: IAddService<Omit<IBook, 'id'>>) => add<IBook>(variables.path, variables.values),

    onSuccess: () => queryClient.invalidateQueries(['books']),
  })

  return addMutation
}

export const useMutateEditBook = (): UseMutationResult<IBook, Error, IEditService<IBook>, undefined> => {
  const queryClient = useQueryClient()
  const editMutation = useMutation<IBook, Error, IEditService<IBook>, undefined>({
    mutationFn: (variables: IEditService<IBook>) => edit(variables.path, variables.id, variables.values),

    onSuccess: (data: IBook) => queryClient.invalidateQueries(['books', data.id]),
  })

  return editMutation
}
