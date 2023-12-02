import { useCallback, useEffect } from 'react'
import { Box, Heading, Text, useToast } from '@chakra-ui/react'
import { shallow } from 'zustand/shallow'

import { useAuthStore } from '@react-monorepo/stores'
import { TUserForm } from '@react-monorepo/types'
import { useRegisterUser } from '@react-monorepo/hooks'
import { MESSAGES_ERRORS, MESSAGES_SUCCESS } from '@react-monorepo/utils'
import { RegisterForm } from '../../components'

const USERS_ENDPOINT = import.meta.env.VITE_USERS_ENDPOINT

const Register = () => {
  const { setLoginUser } = useAuthStore((state) => ({ setLoginUser: state.login }), shallow)
  const { mutate, isLoading, error, isSuccess, data } = useRegisterUser()
  const toast = useToast()

  useEffect(() => {
    if (!isSuccess) return

    setLoginUser(data)
    toast({
      title: MESSAGES_SUCCESS.REGISTER.TITLE,
      description: MESSAGES_SUCCESS.REGISTER.DESC,
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
        user: values,
      })
    },
    [mutate]
  )

  return (
    <>
      <Heading textAlign="center" fontWeight="black" fontSize="70px">
        Sign up now!
      </Heading>
      <Text textAlign="center" fontWeight="light" fontSize="30px">
        Check out our application, we have everything from everywhere.
      </Text>
      <Box mt={20}>
        <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
      </Box>
    </>
  )
}

export default Register
