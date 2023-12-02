import { memo } from 'react'
import { Box, Center, Spinner } from '@chakra-ui/react'

const Loading = memo(() => {
  return (
    <Box pos="absolute" top={0} left={0} zIndex="overlay" bgColor='white' minW='full' minH='full'>
      <Center mt={10}>
        <Spinner thickness="4px" speed="0.65s" color="primary" size="xl" />
      </Center>
    </Box>
  )
})

export default Loading
