import { Box, Button } from '@chakra-ui/react'
import { Link, Outlet } from 'react-router-dom'

import { Navbar as NavbarLayout } from '../../components'
import backgroundImg from '../../../assets/images/squiggle-pattern-gray.webp'

const navbarLink = ['pricing', 'support', 'contact us']

const Navbar = () => {
  return (
    <Box h="100vh" bgImage={backgroundImg}>
      <NavbarLayout>
        {navbarLink.map((item: string) => (
          <Button
            key={item}
            as={Link}
            to="#"
            variant="tertiary"
          >
            {item}
          </Button>
        ))}
      </NavbarLayout>
      <Outlet />
    </Box>
  )
}

export default Navbar
