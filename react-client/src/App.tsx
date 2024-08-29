import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import { Box } from '@chakra-ui/react'
import { useStore } from './stores/store'
import { useEffect } from 'react'
import LoadingComponent from './components/common/loading/LoadingComponent'
import { observer } from 'mobx-react-lite'

export default observer(function App() {
  const { commonStore, userStore } = useStore()
  const Navigate = useNavigate()

  useEffect(() => {
    if (commonStore.token) {
      userStore.getCurrentUser(Navigate).finally(() => commonStore.setAppLoaded(true))
    } else {
      commonStore.setAppLoaded(true)
    }
  })

  if (!commonStore.appLoaded) {
    return (
      <LoadingComponent text='Checking power level...' />
    )
  }

  return (
    <>
      <div id='main'>
        <Navbar />
        <Box paddingTop={['3.75rem', null, '3rem']} >
          <Outlet />
        </Box>
      </div>
    </>
  )
})
