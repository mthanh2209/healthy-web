import { memo } from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'
import { Link } from 'react-router-dom'
import isEqual from 'react-fast-compare'

export interface SidebarItemProps {
  to: string
  title: string
  icon: IconType
}

const SidebarItem = memo(({ title, to, icon }: SidebarItemProps) => {
  return (
    <Link to={to}>
      <Box
        px={8}
        bg="transparent"
        color="black"
        _hover={{
          bg: 'white',
        }}
      >
        <Flex columnGap="5px" my={3} py={5} alignItems="center">
          <Box display="flex" pr={3}>
            <Icon as={icon} boxSize={6} color="primary" />
          </Box>
          <Text>{title}</Text>
        </Flex>
      </Box>
    </Link>
  )
}, isEqual)

export default SidebarItem
