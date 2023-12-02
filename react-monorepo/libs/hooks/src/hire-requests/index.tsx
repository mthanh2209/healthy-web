import { AxiosResponse } from 'axios'
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import qs from 'qs'

import { add, get, remove } from '@react-monorepo/services'
import { IAddService, IBook, IHireRequest, IRemoveService, IUser } from '@react-monorepo/types'
import { useMutateUpdate } from '../common/index'

interface useMutateHireRequestResult {
  addMutation: UseMutationResult<IHireRequest, Error, IAddService<IHireRequest>, undefined>
  confirmMutation: UseMutationResult<number, Error, IRemoveService, undefined>
}

const USERS_ENDPOINT = import.meta.env.VITE_USERS_ENDPOINT
const BOOKS_ENDPOINT = import.meta.env.VITE_BOOKS_ENDPOINT
const HIRE_REQUESTS_ENDPOINT = import.meta.env.VITE_HIRE_REQUESTS_ENDPOINT

export const useMutateHireRequest = (
  bookData: IBook | undefined,
  user: IUser | undefined,
  action: 'add' | 'confirm'
): useMutateHireRequestResult => {
  const queryClient = useQueryClient()
  const { mutate: mutateUpdate } = useMutateUpdate()

  const updateBooksQuantity = () => {
    if (!bookData) return
    const bookQuantity = action === 'add' ? { quantity: bookData.quantity - 1 } : { quantity: bookData.quantity + 1 }

    mutateUpdate({
      path: BOOKS_ENDPOINT,
      id: +bookData.id,
      values: { ...bookData, ...bookQuantity },
    })
  }

  const updateUserHireRequest = (): void => {
    if (!user) return
    const userRequest =
      action === 'add' ? { hireRequests: user.hireRequests - 1 } : { hireRequests: user.hireRequests + 1 }

    mutateUpdate({
      path: USERS_ENDPOINT,
      id: user.id,
      values: { ...user, ...userRequest },
    })
  }

  const addMutation = useMutation<IHireRequest, Error, IAddService<IHireRequest>, undefined>({
    mutationFn: (variables: IAddService<IHireRequest>): Promise<IHireRequest> =>
      add<IHireRequest>(variables.path, variables.values),
    onSuccess: () => {
      queryClient.invalidateQueries(['hire-requests'])
      updateBooksQuantity()
      updateUserHireRequest()
    },
  })

  const confirmMutation = useMutation<number, Error, IRemoveService, undefined>({
    mutationFn: (variables: IRemoveService): Promise<AxiosResponse['status']> =>
      remove(variables.path, variables.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['hire-requests'])
      updateBooksQuantity()
      updateUserHireRequest()
    },
  })

  return { addMutation, confirmMutation }
}

export const useGetHireRequests = (): UseQueryResult<IHireRequest[], Error> => {
  const hireRequestQuery = useQuery<IHireRequest[], Error, IHireRequest[], string[]>({
    queryKey: ['hire-requests'],
    queryFn: () =>
      get<IHireRequest>(HIRE_REQUESTS_ENDPOINT, {
        params: { _expand: ['book', 'user'] },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
      }),
  })

  return hireRequestQuery
}
