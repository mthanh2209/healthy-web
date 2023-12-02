import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { shallow } from 'zustand/shallow'

import { edit } from '@react-monorepo/services'
import { useAuthStore, useBookStore } from '@react-monorepo/stores'
import { IBook, IEditService, IUser } from '@react-monorepo/types'

export const useMutateUpdate = (): UseMutationResult<IBook | IUser, Error, IEditService<IBook | IUser>, undefined> => {
  const { updateBook } = useBookStore((state) => ({ updateBook: state.update }), shallow)
  const { currentUser, updateUser } = useAuthStore(
    (state) => ({ currentUser: state.user, updateUser: state.login }),
    shallow
  )
  const queryClient = useQueryClient()
  const mutateUpdate = useMutation<IBook | IUser, Error, IEditService<IBook | IUser>, undefined>({
    mutationFn: (variables: IEditService<IBook | IUser>): Promise<IBook | IUser> =>
      edit<IBook | IUser>(variables.path, variables.id, variables.values),

    onSuccess: (data: IBook | IUser) => {
      if ('author' in data) {
        updateBook(data)
        queryClient.invalidateQueries(['books'])
      }

      if ('email' in data) {
        updateUser({ ...currentUser, ...data })
        queryClient.invalidateQueries(['users'])
      }
    },
  })

  return mutateUpdate
}
