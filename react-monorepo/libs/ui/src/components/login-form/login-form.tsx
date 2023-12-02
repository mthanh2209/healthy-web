import { memo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Link,
  Heading,
  chakra,
} from '@chakra-ui/react'

import { REGEX } from '@react-monorepo/utils'
import { TUserForm } from '@react-monorepo/types'

export interface LoginFormProps {
  isLogin?: boolean
  onSubmit: (values: TUserForm) => void
}

const LoginForm = memo(({ onSubmit, isLogin = false }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUserForm>()

  return (
    <Box
      bgColor="white"
      border="2px solid"
      borderColor="dust.50"
      borderRadius={10}
      shadow="form"
      p={10}
      maxW={460}
      margin="0 auto"
    >
      <Box mb={4}>
        <Heading fontWeight="bold" fontSize="3xl" textTransform="capitalize">
          manager login
        </Heading>
      </Box>
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email} mb={7} pos="relative">
          <FormLabel htmlFor="email" m={0}>
            Email
          </FormLabel>
          <Input
            id="email"
            placeholder="Email"
            {...register('email', {
              required: 'Please enter your email',
              pattern: {
                value: REGEX.EMAIL,
                message: 'Please enter correct email pattern',
              },
            })}
          />
          <FormErrorMessage mt={0} pos="absolute">
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} mb={7} pos="relative">
          <FormLabel htmlFor="password" m={0}>
            Password
          </FormLabel>
          <Input
            id="password"
            autoComplete="off"
            placeholder="Password"
            type="password"
            {...register('password', {
              required: 'Please enter your password',
              maxLength: {
                value: 30,
                message: 'Please enter password equal or shorter than 30 characters',
              },
              minLength: {
                value: 6,
                message: 'Please enter password equal or longer than 6 characters',
              },
            })}
          />
          <FormErrorMessage mt={0} pos="absolute">
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Box mt={4}>
          <Checkbox textTransform="capitalize">remember me</Checkbox>
        </Box>
        <Button
          w="100%"
          mt={4}
          isLoading={isSubmitting || isLogin}
          type="submit"
          variant="primary"
          _hover={{
            filter: 'brightness(70%)',
          }}
        >
          sign in
        </Button>
      </chakra.form>
      <Center my={6}>
        <Divider orientation="horizontal" />
      </Center>
      <Text textAlign="center">
        Don't have an account?
        <Link color="primary" as={RouterLink} to={'/register'} px={1}>
          Sign Up!
        </Link>
      </Text>
    </Box>
  )
})

export default LoginForm
