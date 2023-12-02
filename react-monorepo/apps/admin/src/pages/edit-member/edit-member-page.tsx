import { lazy, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, useToast } from '@chakra-ui/react'
import { shallow } from 'zustand/shallow'

import { useUserStore } from '@react-monorepo/stores'
import { TUserForm } from '@react-monorepo/types'
import { useFindUser, useMutateEditUser } from '@react-monorepo/hooks'
import { MESSAGES_ERRORS, MESSAGES_SUCCESS } from '@react-monorepo/utils'

const RegisterForm = lazy(() => import('@react-monorepo/ui').then((module) => ({ default: module.RegisterForm })))
const Loading = lazy(() => import('@react-monorepo/ui').then((module) => ({ default: module.Loading })))

const USERS_ENDPOINT = import.meta.env.VITE_USERS_ENDPOINT

const EditMember = () => {
  const { userId } = useParams()
  const toast = useToast()
  const navigate = useNavigate()
  const { editUser } = useUserStore((state) => ({ editUser: state.update }), shallow)
  const { data: userData, isLoading } = useFindUser(userId)
  const { mutate, isSuccess, data, error } = useMutateEditUser()

  useEffect(() => {
    if (!isSuccess) return

    editUser(data)
    toast({
      title: MESSAGES_SUCCESS.EDIT.TITLE,
      description: `User ${data.firstName} ${data.lastName} have been modify successfully.`,
      status: 'success',
    })
    navigate('/')
  }, [data, editUser, isSuccess, navigate, toast])

  useEffect(() => {
    if (error instanceof Error)
      toast({
        title: error.message,
        description: MESSAGES_ERRORS.ACTION_FAIL,
        status: 'error',
      })
  }, [error, toast])

  const handleOnSubmit = useCallback(
    (values: TUserForm) => {
      if (!userId) return
      mutate({
        path: USERS_ENDPOINT,
        id: +userId,
        values,
      })
    },
    [mutate, userId]
  )

  return (
    <Box mt={10}>
      <RegisterForm onSubmit={handleOnSubmit} userInfo={userData} confirmTitle="update" />
      {isLoading && <Loading />}
    </Box>
  )
}

export default EditMember
