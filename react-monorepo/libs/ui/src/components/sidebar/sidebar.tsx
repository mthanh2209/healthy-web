import { memo, useCallback } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AspectRatio, Box, BoxProps, Button, CloseButton, Flex, Link, Image, useToast } from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi'
import { shallow } from 'zustand/shallow'
import isEqual from 'react-fast-compare'

import { useAuthStore } from '@react-monorepo/stores'
import { ISideBarItem } from '@react-monorepo/types'
import { SidebarItem } from '../../components'
import logo from '../../../assets/images/library-logo.webp'

export interface SidebarProps extends BoxProps {
  onClose: () => void
  items: ISideBarItem[]
}

const Sidebar = memo(({ onClose, items, ...rest }: SidebarProps) => {
  const toast = useToast()
  const { logOut } = useAuthStore((state) => ({ logOut: state.logout }), shallow)
  const handleLogOut = useCallback(() => {
    logOut()
    toast({
      title: 'Log out success',
      description: 'Hope to see you soon.',
      status: 'success',
    })
  }, [logOut, toast])

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      pos="fixed"
      zIndex={3}
      py={5}
      bg="dust.50"
      minW={{ base: 'full', md: 60 }}
      minH="full"
      {...rest}
    >
      <Box>
        <Flex h="20" alignItems="center" mx="7" justifyContent="space-between">
          <Link as={RouterLink} to="/">
            <AspectRatio ratio={2.8 / 1} minW="140px">
              <Image objectFit="cover" src={logo} alt="logo of library website" />
            </AspectRatio>
          </Link>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {items.map(({ name, icon, href }: ISideBarItem) => (
          <SidebarItem key={name} icon={icon} title={name} to={href} />
        ))}
      </Box>
      <Button onClick={handleLogOut} leftIcon={<FiLogOut />} mx={5} variant="primary">
        Log Out
      </Button>
    </Flex>
  )
}, isEqual)

export default Sidebar
