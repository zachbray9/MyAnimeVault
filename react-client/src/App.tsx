import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <>
      <div id='main'>
        <Outlet />
      </div>
    </>
  )
}
