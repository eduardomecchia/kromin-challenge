import {Outlet} from 'react-router-dom'
import PublicLayout from '../../containers/public-layout/PublicLayout'
import PrivateLayout from '../../containers/private-layout/PrivateLayout'
import useUser from "../../hooks/useUser";

const SharedRoute = () => {
    const {accessToken} = useUser()

    return accessToken ? (
        <PrivateLayout>
            <Outlet/>
        </PrivateLayout>
    ) : (
        <PublicLayout>
            <Outlet/>
        </PublicLayout>
    )
}

export default SharedRoute