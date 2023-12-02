import { useCallback, useEffect } from 'react'
import { Box, useToast } from '@chakra-ui/react'
import { shallow } from 'zustand/shallow'

import { useAuthStore } from '@react-monorepo/stores'
import { TUserForm } from '@react-monorepo/types'
import { useLoginUser } from '@react-monorepo/hooks'
import { MESSAGES_ERRORS, MESSAGES_SUCCESS } from '@react-monorepo/utils'
import { LoginForm } from '../../components'

const USERS_ENDPOINT = import.meta.env.VITE_USERS_ENDPOINT

const Login = () => {
  const { setLoginUser } = useAuthStore((state) => ({ setLoginUser: state.login }), shallow)
  const { mutate, isLoading, error, isSuccess, data } = useLoginUser()
  const toast = useToast()

  useEffect(() => {
    if (!isSuccess) return

    setLoginUser(data)
    toast({
      title: MESSAGES_SUCCESS.LOGIN.TITLE,
      description: MESSAGES_SUCCESS.LOGIN.DESC,
      status: 'success',
    })
  }, [data, isSuccess, setLoginUser, toast])

  useEffect(() => {
    if (error instanceof Error)
      toast({
        title: error.message,
        description: MESSAGES_ERRORS.RE_CHECK_INFO,
        status: 'error',
      })
  }, [error, toast])

  const handleSubmit = useCallback(
    (values: TUserForm) => {
      mutate({
        path: USERS_ENDPOINT,
        email: values.email,
        password: values.password,
      })
    },
    [mutate]
  )

  return (
    <Box mt={50}>
      <LoginForm onSubmit={handleSubmit} isLogin={isLoading} />
    </Box>
  )
}

export default Login
