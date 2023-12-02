import { memo } from 'react'
import { Box, useDisclosure } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import isEqual from 'react-fast-compare'

import { Drawer, Header, Sidebar } from '../../components'
import { ISideBarItem } from '@react-monorepo/types'

export interface DashboardProps {
  sidebar: ISideBarItem[]
}

const Dashboard = memo(({ sidebar }: DashboardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Sidebar onClose={onClose} items={sidebar} display={{ base: 'none', md: 'flex' }} />
      <Drawer isOpen={isOpen} onClose={onClose}>
        <Sidebar onClose={onClose} items={sidebar} />
      </Drawer>
      <Header onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} pos="relative">
        <Outlet />
      </Box>
    </Box>
  )
}, isEqual)

export default Dashboard
