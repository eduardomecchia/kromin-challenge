import {Navigate, Outlet} from 'react-router-dom'
import {ROUTE_HOME} from '../../utilities/constants'
import useUser from "../../hooks/useUser";

const PublicRoute = () => {
    const {accessToken} = useUser()
    return accessToken ? <Navigate to={ROUTE_HOME}/> : <Outlet/>
}

export default PublicRoute
