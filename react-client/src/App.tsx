import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import { Box, Stack } from '@chakra-ui/react'
import { useStore } from './stores/store'
import { useEffect } from 'react'
import LoadingComponent from './components/common/loading/LoadingComponent'
import { observer } from 'mobx-react-lite'
import Footer from './components/footer/Footer'

export default observer(function App() {
  const { commonStore, userStore } = useStore()
  const Navigate = useNavigate()

  useEffect(() => {
      userStore.getCurrentUser(Navigate).finally(() => commonStore.setAppLoaded(true))
  }, [commonStore, Navigate, userStore])

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
