import { Suspense, lazy, useMemo } from 'react'
import { FiAlertTriangle, FiDollarSign, FiHelpCircle, FiHome, FiInfo, FiMail } from 'react-icons/fi'
import { AbsoluteCenter, Box, ChakraProvider, Spinner } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useAuthStore } from '@react-monorepo/stores'
import { ISideBarItem } from '@react-monorepo/types'
import theme from '@react-monorepo/themes'

const NavbarLayout = lazy(() => import('@react-monorepo/ui').then((module) => ({ default: module.NavbarLayout })))
const BookDetail = lazy(() => import('@react-monorepo/ui').then((module) => ({ default: module.BookDetail })))
const DashboardLayout = lazy(() => import('@react-monorepo/ui').then((module) => ({ default: module.DashboardLayout })))
const LoginPage = lazy(() => import('@react-monorepo/ui').then((module) => ({ default: module.Login })))
const RegisterPage = lazy(() => import('@react-monorepo/ui').then((module) => ({ default: module.Register })))

const Home = lazy(() => import('../pages').then((module) => ({ default: module.Home })))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 10 },
  },
})

const App = () => {
  const { authUser } = useAuthStore((state) => ({ authUser: state.user }), shallow)

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        theme={theme}
        toastOptions={{ defaultOptions: { position: 'bottom', duration: 3000, isClosable: true } }}
      >
        <Suspense fallback={<OverlayLoading />}>
          <Routes>
            {authUser ? (
              <Route path="/*" element={<PrivateRoutes />} />
            ) : (
              <Route path="/*" element={<PublicRoutes />} />
            )}
          </Routes>
        </Suspense>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<NavbarLayout />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
)

const PrivateRoutes = () => {
  const sidebarContent: ISideBarItem[] = useMemo(
    () => [
      { name: 'Home', icon: FiHome, href: '/' },
      { name: 'Price', icon: FiDollarSign, href: '#' },
      { name: 'Report issues', icon: FiAlertTriangle, href: '#' },
      { name: 'Help', icon: FiHelpCircle, href: '#' },
      { name: 'About us', icon: FiInfo, href: '#' },
      { name: 'Contact', icon: FiMail, href: '#' },
    ],
    []
  )

  return (
    <Routes>
      <Route path="/*" element={<DashboardLayout sidebar={sidebarContent} />}>
        <Route path="home" element={<Home />} />
        <Route path="books/:bookId" element={<BookDetail />} />
        <Route path="*" element={<Navigate to="home" />} />
      </Route>
    </Routes>
  )
}

const OverlayLoading = () => (
  <Box position="relative" h="100vh" bgColor="black" opacity={0.5}>
    <AbsoluteCenter axis="both">
      <Spinner thickness="4px" speed="0.65s" color="primary" size="xl" />
    </AbsoluteCenter>
  </Box>
)

export default App
