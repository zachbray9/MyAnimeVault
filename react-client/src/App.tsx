import { Outlet } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import { Box } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <div id='main'>
        <Navbar />
        <Box paddingTop={['3.75rem', null, '3rem']}>
          <Outlet />
        </Box>
      </div>
    </>
  )
}
