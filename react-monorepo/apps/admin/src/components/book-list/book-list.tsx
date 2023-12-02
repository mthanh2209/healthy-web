import { useId, useMemo, useCallback, useEffect, memo, lazy } from 'react'
import { shallow } from 'zustand/shallow'
import { useToast, Grid, Text } from '@chakra-ui/react'

import { useBookStore } from '@react-monorepo/stores'
import { MESSAGES_ERRORS } from '@react-monorepo/utils'
import { useGetBooks } from '@react-monorepo/hooks'

const Card = lazy(() => import('@react-monorepo/ui').then((module) => ({ default: module.Card })))
const Loading = lazy(() => import('@react-monorepo/ui').then((module) => ({ default: module.Loading })))

const BookList = memo(() => {
  const { books } = useBookStore((state) => ({ books: state.books }), shallow)
  const toast = useToast()
  const toastID = useId()
  const { data, isLoading, isError, error } = useGetBooks()

  const renderData: React.ReactNode = useMemo(() => {
    if (!books.length) return <Text textAlign="center">Oops! There's no doctors.</Text>

    return books.map((book) => (
      <Card
        href={`/admin/books/${book.id}`}
        key={book.id}
        imageUrl={book.cover}
        name={book.name}
        author={book.author}
        alt="img doctor"
      />
    ))
  }, [books])

  const renderError = useCallback(() => {
    if (toast.isActive(toastID)) return
    if (error instanceof Error)
      toast({
        id: toastID,
        title: error.message,
        description: MESSAGES_ERRORS.ERROR_REQUEST,
        status: 'error',
      })

    return undefined
  }, [error, toast, toastID])

  useEffect(() => {
    if (!data) return
    useBookStore.setState({ books: data })
  }, [data])

  useEffect(() => {
    isError && renderError()
  }, [isError, renderError])

  return (
    <Grid
      templateColumns={{
        base: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
        xl: 'repeat(5, 1fr)',
        '2xl': 'repeat(7, 1fr)',
      }}
    >
      {renderData}
      {isLoading && <Loading />}
    </Grid>
  )
})

export default BookList
