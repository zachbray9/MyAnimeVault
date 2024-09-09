import { observer } from "mobx-react-lite"
import { useStore } from "../stores/store"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default observer( function RequireAuth(){
    const {userStore } = useStore()
    const location = useLocation()

    if(!userStore.isLoggedIn){
        return <Navigate to='/login' state={{from: location}}/>
    }

    return <Outlet />
})