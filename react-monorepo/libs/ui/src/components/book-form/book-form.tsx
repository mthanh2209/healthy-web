import { memo } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  chakra,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'
import isEqual from 'react-fast-compare'

import { REGEX } from '@react-monorepo/utils'
import { IBook } from '@react-monorepo/types'

export interface BookFormProps {
  isSubmitting?: boolean
  bookValues?: IBook
  onSubmit: (values: IBook) => void
}

const BookForm = memo(({ onSubmit, bookValues, isSubmitting = false }: BookFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>({ defaultValues: bookValues })
  return (
    <Box bgColor="white" border="2px solid" borderColor="dust.50" p={10} maxW={960} shadow="form">
      <Box mb={4}>
        <Heading fontWeight="bold" fontSize="3xl" textTransform="capitalize">
          doctor information:
        </Heading>
      </Box>
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" rowGap={6}>
          <FormControl isInvalid={!!errors.name} pos="relative">
            <FormLabel htmlFor="firstName" m={0}>
              Name
            </FormLabel>
            <Input
              id="name"
              placeholder="Enter the title"
              {...register('name', {
                required: 'Please enter doctor name',
                pattern: {
                  value: REGEX.NOT_CONTAIN_NUMBER,
                  message: 'Doctor should not contain number',
                },
              })}
            />
            <FormErrorMessage pos="absolute" mt={0}>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.author} pos="relative">
            <FormLabel htmlFor="author" m={0}>
              Examination department
            </FormLabel>
            <Input
              id="author"
              placeholder="Medical examination department"
              {...register('author', {
                required: 'Please enter examination department',
                pattern: {
                  value: REGEX.NOT_CONTAIN_NUMBER,
                  message: 'Examination department should not contain number',
                },
                maxLength: { value: 30, message: 'Maximum length should be 30' },
              })}
            />
            <FormErrorMessage pos="absolute" mt={0}>
              {errors.author && errors.author.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.description} pos="relative">
            <FormLabel htmlFor="description" m={0}>
              Description
            </FormLabel>
            <Textarea
              id="description"
              resize="vertical"
              rows={5}
              placeholder="Enter your description about the doctor your wanna add!!!"
              {...register('description', {
                required: 'Please enter your description',
              })}
            />
            <FormErrorMessage pos="absolute" mt={0}>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <Flex rowGap={6} columnGap={2} flexDirection={{ base: 'column', md: 'row' }}>
            <FormControl isInvalid={!!errors.publish_date} m={0} pos="relative">
              <FormLabel htmlFor="publish_date" m={0}>
                Year of Birth
              </FormLabel>
              <Input
                id="publish_date"
                autoComplete="off"
                placeholder="year_of_birth"
                type="date"
                {...register('publish_date', {
                  required: 'Please enter year of birth',
                })}
              />
              <FormErrorMessage pos="absolute" mt={0}>
                {errors.publish_date && errors.publish_date.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.quantity} pos="relative">
              <FormLabel htmlFor="quantity" m={0}>
                Years of experience
              </FormLabel>
              <Input
                id="quantity"
                min={1}
                placeholder="Years of experience"
                {...register('quantity', {
                  valueAsNumber: true,
                  required: 'Please enter years of experience',
                  max: {
                    value: 50,
                    message: 'Years of experience value should not over 50',
                  },
                  min: {
                    value: 1,
                    message: 'Years of experience value should over 1',
                  },
                })}
              />
              <FormErrorMessage pos="absolute" mt={0}>
                {errors.quantity && errors.quantity.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.cover} pos="relative">
              <FormLabel htmlFor="cover" m={0}>
                Image
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiFile />
                </InputLeftElement>
                <Input
                  id="cover"
                  placeholder="Image"
                  {...register('cover', {
                    required: 'Please enter image',
                  })}
                />
              </InputGroup>
              <FormErrorMessage pos="absolute" mt={0}>
                {errors.cover && errors.cover.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
          <Button mt={4} variant="primary" isLoading={isSubmitting} type="submit" fontSize="20px">
            complete
          </Button>
        </Flex>
      </chakra.form>
    </Box>
  )
}, isEqual)

export default BookForm
