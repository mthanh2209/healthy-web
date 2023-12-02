import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { AspectRatio, Box, Button, Flex, HStack, IconButton, Image } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import isEqual from 'react-fast-compare'

import logo from '../../../assets/images/library-logo.webp'

export interface NavbarProps {
  children: React.ReactNode
}

const Navbar = memo(({ children }: NavbarProps) => {
  return (
    <Box mx="auto" p={5} maxW={1200}>
      <Flex alignItems="center" justifyContent="space-between">
        <Link to="/">
          <AspectRatio ratio={2.8 / 1} minW="140px">
            <Image objectFit="cover" src={logo} alt="logo of library website" />
          </AspectRatio>
        </Link>
        <HStack spacing={5} display={{ base: 'none', md: 'flex' }}>
          {children}
          <Link to="/login">
            <Button variant='secondary'>login</Button>
          </Link>
          <Link to="/register">
            <Button variant='secondary'>get started</Button>
          </Link>
        </HStack>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          aria-label="open menu"
          bg="transparent"
          icon={<FiMenu size={24} />}
        />
      </Flex>
    </Box>
  )
}, isEqual)

export default Navbar
