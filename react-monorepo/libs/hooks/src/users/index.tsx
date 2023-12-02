import { AxiosResponse } from 'axios'
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { shallow } from 'zustand/shallow'

import { edit, find, get, login, register, remove } from '@react-monorepo/services'
import { IEditService, ILoginService, IRegisterService, IRemoveService, IUser } from '@react-monorepo/types'
import { useUserStore } from '@react-monorepo/stores'

const USERS_ENDPOINT = import.meta.env.VITE_USERS_ENDPOINT

export const useLoginUser = (): UseMutationResult<IUser, Error, ILoginService, undefined> => {
  const loginMutate = useMutation<IUser, Error, ILoginService, undefined>({
    mutationFn: (variables: ILoginService): Promise<IUser> =>
      login(variables.path, variables.email, variables.password),
  })

  return loginMutate
}

export const useRegisterUser = (): UseMutationResult<IUser, Error, IRegisterService, undefined> => {
  const registerMutate = useMutation<IUser, Error, IRegisterService, undefined>({
    mutationFn: (variables: IRegisterService): Promise<IUser> => register(variables.path, variables.user),
  })

  return registerMutate
}

export const useDeleteMember = (): UseMutationResult<number, Error, IRemoveService, undefined> => {
  const { deleteMember } = useUserStore((state) => ({ deleteMember: state.remove }), shallow)
  const deleteMutation = useMutation<number, Error, IRemoveService, undefined>({
    mutationFn: (variables: IRemoveService): Promise<AxiosResponse['status']> => remove(variables.path, variables.id),

    onSuccess: (_, variables: IRemoveService) => deleteMember(variables.id),
  })

  return deleteMutation
}

export const useGetUsers = (): UseQueryResult<IUser[], Error> => {
  const getQuery = useQuery<IUser[], Error, IUser[], string[]>({
    queryKey: ['users'],
    queryFn: () => get<IUser>(USERS_ENDPOINT),
  })

  return getQuery
}

export const useMutateEditUser = (): UseMutationResult<IUser, Error, IEditService<IUser>, undefined> => {
  const queryClient = useQueryClient()
  const editMutation = useMutation<IUser, Error, IEditService<IUser>, undefined>({
    mutationFn: (variables: IEditService<IUser>) => edit(variables.path, variables.id, variables.values),

    onSuccess: () => queryClient.invalidateQueries(['users']),
  })

  return editMutation
}

export const useFindUser = (userId: number | string | undefined): UseQueryResult<IUser, Error> => {
  const userQuery = useQuery<IUser, Error, IUser, (string | number)[]>({
    queryKey: ['users', Number(userId)],
    enabled: !!userId,
    queryFn: (): Promise<IUser> => find(`${USERS_ENDPOINT}/${userId}`),
  })

  return userQuery
}
