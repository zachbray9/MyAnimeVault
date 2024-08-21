import { Outlet } from 'react-router-dom'
import Navbar from './components/nav/Navbar'

export default function App() {
  return (
    <>
      <div id='main'>
        <Navbar />
        <Outlet />
      </div>
    </>
  )
}
