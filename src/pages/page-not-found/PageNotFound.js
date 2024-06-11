import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'
import {ROUTE_HOME} from "../../utilities/constants";

const useStyles = createUseStyles((theme) => ({
    root: {
        display: 'grid',
        alignContent: 'center',
        padding: [56, 0],
        width: '100vw',
        height: '100%',
    },
}))

const PageNotFound = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.text}>
                <h1>Page Not Found</h1>
                <p>
                    The page you are locking for doesn’t exist or an other error
                    occured. Go to <Link to={ROUTE_HOME}>Homepage</Link>
                </p>
            </div>
        </div>
    )
}

export default PageNotFound
