import { createBrowserRouter } from 'react-router-dom'
import SharedRoute from './route-guards/shared-route/SharedRoute'
import PublicLayout from './containers/public-layout/PublicLayout'
import * as routeNames from "./utilities/constants";
import * as pages from './pages'
import PublicRoute from "./route-guards/public-route/PublicRoute";
import PrivateLayout from "./containers/private-layout/PrivateLayout";
import PrivateRoute from "./route-guards/private-route/PrivateRoute";

const router = createBrowserRouter(
    [
        {
            element: <PrivateRoute />,
            children: [
                {
                    element: <PrivateLayout />,
                    children: [
                        {
                            exact: true,
                            path: routeNames.ROUTE_HOME,
                            element: <pages.Home/>,
                        },
                        {
                            exact: true,
                            path: routeNames.ROUTE_COMPLETED,
                            element: <pages.History/>,
                        },
                    ],
                },
            ],
        },
        {
            element: <PublicRoute />,
            children: [
                {
                    element: <PublicLayout />,
                    children: [
                        {
                            exact: true,
                            path: routeNames.ROUTE_LOGIN,
                            element: <pages.Login/>,
                        },

                    ],
                },
                {
                    element: <PublicLayout />,
                    children: [
                        {
                            exact: true,
                            path: routeNames.ROUTE_SIGNUP,
                            element: <pages.Signup/>,
                        },

                    ],
                },
            ],
        },
        {
            element: <SharedRoute />,
            children: [
                {
                    path: '*', // Not found route
                    element: <pages.NotFound />,
                }
            ],
        },
    ],
    {
        basename: '/',
    }
)

export default router
