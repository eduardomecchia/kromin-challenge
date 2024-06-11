import {Navigate, Outlet} from 'react-router-dom'
import {ROUTE_LOGIN} from '../../utilities/constants'
import useUser from "../../hooks/useUser";

const PrivateRoute = () => {
    const {accessToken} = useUser()
    return accessToken ? <Outlet/> : <Navigate to={ROUTE_LOGIN}/>
}

export default PrivateRoute
