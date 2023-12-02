import { useCallback, useEffect, useId } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import {
  AspectRatio,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  chakra,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiBook, FiEdit2, FiTrash2 } from 'react-icons/fi'
import dayjs from 'dayjs'

import { useAuthStore, useHiredStore } from '@react-monorepo/stores'
import { MESSAGES_ERRORS, MESSAGES_SUCCESS } from '@react-monorepo/utils'
import { useGetBookDetail, useMutateHireRequest, useMutateDeleteBook } from '@react-monorepo/hooks'
import { ConfirmDialog, Loading } from '../../components'

const BOOKS_ENDPOINT = import.meta.env.VITE_BOOKS_ENDPOINT
const VITE_HIRE_REQUESTS_ENDPOINT = import.meta.env.VITE_HIRE_REQUESTS_ENDPOINT

const BookDetail = () => {
  const { bookId } = useParams()
  const { currentUser } = useAuthStore((state) => ({ currentUser: state.user }), shallow)
  const { addHireRequest } = useHiredStore((state) => ({ addHireRequest: state.add }), shallow)
  const toast = useToast()
  const toastId = useId()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const renderError = useCallback(
    (error: unknown) => {
      if (error instanceof Error)
        return toast({
          title: error.message,
          description: MESSAGES_ERRORS.ERROR_REQUEST,
          status: 'error',
        })
    },
    [toast]
  )
  const { data: bookData, isLoading, isError, error } = useGetBookDetail(bookId)

  useEffect(() => {
    isError && renderError(error)
  }, [isError, renderError, error])

  const {
    mutate: mutateDeleteBook,
    isLoading: isDeleting,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
  } = useMutateDeleteBook()

  const handleDeleteBook = useCallback(() => {
    if (!bookId) return
    mutateDeleteBook({
      path: BOOKS_ENDPOINT,
      id: +bookId,
    })
    onClose()
  }, [bookId, mutateDeleteBook, onClose])

  useEffect(() => {
    if (!isDeleteSuccess) return

    toast({
      title: MESSAGES_SUCCESS.DELETE.TITLE,
      description: MESSAGES_SUCCESS.DELETE.DESC,
      status: 'success',
    })
    navigate('/admin/dashboard')
  }, [isDeleteSuccess, navigate, toast])

  useEffect(() => {
    isDeleteError && renderError(deleteError)
  }, [deleteError, isDeleteError, renderError])

  const {
    addMutation: {
      mutate: mutateHireBook,
      isLoading: isHiring,
      isSuccess: isHireSuccess,
      isError: isHireError,
      error: hireError,
      data: returnData,
    },
  } = useMutateHireRequest(bookData, currentUser, 'add')

  useEffect(() => {
    if (!bookData) return
    if (!isHireSuccess) return
    if (!returnData) return

    addHireRequest(returnData)
    if (toast.isActive(toastId)) return
    toast({
      id: toastId,
      title: MESSAGES_SUCCESS.HIRE.TITLE,
      description: `Doctor ${bookData.name} have been booked successfully.`,
      status: 'success',
    })
  }, [addHireRequest, bookData, isHireSuccess, returnData, toast, toastId])

  useEffect(() => {
    isHireError && renderError(hireError)
  }, [hireError, isHireError, renderError])

  const handleEditBook = useCallback(() => navigate(`/admin/edit-book/${bookId}`), [navigate, bookId])

  const handleHireBook = useCallback(() => {
    if (!bookData) return
    if (!currentUser) return

    if (bookData.quantity <= 0) {
      return toast({
        title: MESSAGES_ERRORS.ACTION_FAIL,
        description: `Doctor ${bookData.name} have been out of stock.`,
        status: 'error',
      })
    }

    if (currentUser?.hireRequests <= 0) {
      return toast({
        title: MESSAGES_ERRORS.ACTION_FAIL,
        description: `User ${currentUser.firstName} ${currentUser.lastName} have been out of book request.`,
        status: 'error',
      })
    }

    mutateHireBook({
      path: VITE_HIRE_REQUESTS_ENDPOINT,
      values: {
        bookId: bookData.id,
        userId: currentUser?.id,
        borrow_date: dayjs().format('MM-DD-YYYY HH:mm:ss'),
      },
    })
  }, [mutateHireBook, bookData, currentUser, toast])

  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: '2fr 7fr 3fr' }}
      gap={10}
      px={{ base: 5, md: 10 }}
      pt={5}
      pos="relative"
    >
      <GridItem>
        <AspectRatio ratio={2 / 3}>
          <Image objectFit="cover" src={bookData?.cover} borderRadius="lg" alt="cover of book" />
        </AspectRatio>
        <ButtonGroup float="right" mt={5}>
          {currentUser?.role === 'admin' && (
            <>
              <Button
                onClick={handleEditBook}
                leftIcon={<FiEdit2 />}
                variant="outline"
                _hover={{
                  bgColor: 'blue.100',
                  color: 'blue',
                }}
              >
                Edit
              </Button>
              <Button
                onClick={onOpen}
                isLoading={isDeleting}
                leftIcon={<FiTrash2 />}
                variant="outline"
                _hover={{
                  bgColor: 'red.100',
                  color: 'red',
                }}
              >
                Delete
              </Button>
            </>
          )}
          <Button
            onClick={handleHireBook}
            isLoading={isHiring}
            leftIcon={<FiBook />}
            variant="outline"
            _hover={{
              bgColor: 'green.100',
              color: 'green',
            }}
          >
            Book
          </Button>
        </ButtonGroup>
      </GridItem>

      <GridItem>
        <Heading>{bookData?.name}</Heading>
        <VStack alignItems="flex-start">
          <Text textColor="dust.200" fontSize="2xl">
            {bookData?.author}
          </Text>
          <Text textTransform="capitalize">
            <chakra.b>Year of birth</chakra.b>: {bookData?.publish_date}
          </Text>
          <Text textTransform="capitalize">
            <chakra.b>Year of expensive</chakra.b>: {bookData?.quantity}
          </Text>
        </VStack>

        <Tabs mt={4}>
          <TabList>
            <Tab px={0} color="primary">
              <Text as="b" textTransform="capitalize" fontSize="xl">
                descriptions
              </Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <Text as={motion.p} layout>
                {bookData?.description}
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </GridItem>
      {
        <ConfirmDialog
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleDeleteBook}
          confirmTitle="delete"
          header={`Delete ${bookData?.name} doctor`}
          body={`Are you sure? You can't undo this action afterwards.`}
        />
      }
      {isLoading && <Loading />}
    </Grid>
  )
}

export default BookDetail
