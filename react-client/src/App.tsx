import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Box, Stack } from '@chakra-ui/react'
import { useStore } from './stores/store'
import LoadingComponent from './components/common/loading/LoadingComponent'
import { observer } from 'mobx-react-lite'
import Footer from './components/footer/Footer'
import usePersistentLogin from './hooks/usePersistentLogin'
import Navbar from './components/nav/Navbar'

export default observer(function App() {
  const { commonStore } = useStore()
  usePersistentLogin()

  if (!commonStore.appLoaded) {
    return (
      <LoadingComponent text='Checking power level...' />
    )
  }

  return (
    <>
      <ScrollRestoration />
      <Stack id='main' minHeight='100dvh'>
        <Navbar />
        <Box paddingTop={['3.75rem', null, '3rem']} flex={1}>
          <Outlet />
        </Box>
        <Footer />
      </Stack>
    </>
  )
})
