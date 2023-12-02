import { memo } from 'react'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, chakra } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import isEqual from 'react-fast-compare'

import { IUser, TUserForm } from '@react-monorepo/types'
import { REGEX } from '@react-monorepo/utils'

export interface RegisterFormProps {
  isLoading?: boolean
  userInfo?: IUser
  confirmTitle?: string
  onSubmit: (values: TUserForm) => void
}

const RegisterForm = memo(
  ({ onSubmit, userInfo, confirmTitle = 'start now', isLoading = false }: RegisterFormProps) => {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<TUserForm>({ defaultValues: userInfo })

    return (
      <Box bgColor="white" border="2px solid" borderColor="dust.50" p={10} maxW={960} margin="0 auto" shadow="form">
        <Box mb={4}>
          <Heading fontWeight="bold" fontSize="3xl" textTransform="capitalize">
            Account info:
          </Heading>
        </Box>
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
          <HStack>
            <FormControl isInvalid={!!errors.firstName} mb={7} pos="relative">
              <FormLabel mb={0} htmlFor="firstName">
                First name
              </FormLabel>
              <Input
                id="firstName"
                placeholder="First name"
                {...register('firstName', {
                  required: 'Please enter your first name',
                  pattern: {
                    value: REGEX.NOT_CONTAIN_NUMBER,
                    message: 'First name should not contain number',
                  },
                  maxLength: { value: 30, message: 'Maximum length should be 30' },
                })}
              />
              <FormErrorMessage mt={0} pos="absolute">
                {errors.firstName && errors.firstName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.lastName} mb={7} pos="relative">
              <FormLabel mb={0} htmlFor="lastName">
                Last name
              </FormLabel>
              <Input
                id="lastName"
                placeholder="Last name"
                {...register('lastName', {
                  required: 'Please enter your last name',
                  pattern: {
                    value: REGEX.NOT_CONTAIN_NUMBER,
                    message: 'Last name should not contain number',
                  },
                  maxLength: { value: 30, message: 'Maximum length should be 30' },
                })}
              />
              <FormErrorMessage mt={0} pos="absolute">
                {errors.lastName && errors.lastName.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>

          <HStack>
            <FormControl isInvalid={!!errors.email} mb={7} pos="relative">
              <FormLabel mb={0} htmlFor="email">
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
              <FormLabel mb={0} htmlFor="password">
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
          </HStack>

          <FormControl isInvalid={!!errors.phone} mb={7} pos="relative">
            <FormLabel mb={0} htmlFor="phone">
              Phone
            </FormLabel>
            <Input
              id="phone"
              placeholder="Phone"
              {...register('phone', {
                required: 'Please enter your phone number',
                pattern: {
                  value: REGEX.ONLY_NUMBER,
                  message: 'Phone should not contain alphabet characters',
                },
                maxLength: { value: 10, message: 'Maximum length should be 10' },
              })}
            />
            <FormErrorMessage mt={0} pos="absolute">
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>
          <Button mt={4} isLoading={isSubmitting || isLoading} type="submit" fontSize="24px" variant="primary">
            {confirmTitle}
          </Button>
        </chakra.form>
      </Box>
    )
  },
  isEqual
)

export default RegisterForm
