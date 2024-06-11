import {createUseStyles} from 'react-jss'
import {Outlet} from "react-router-dom";
import useError from "../../hooks/useError";
import useAlert from "../../hooks/useAlert";
import {useViewportSize} from "../../hooks/useViewportSize";


const useStyles = createUseStyles((theme) => ({
    main: {
        height: ({ vh }) => `calc(${vh}px * 100)`,
        display: 'flex',
        flexDirection: 'column',
        padding: [24]
    }
}))

const PublicLayout = () => {
    const { vh } = useViewportSize()

    const {isAlertOpen, alertData, closeAlert} = useAlert()
    const showError = useError()
    const classes = useStyles({vh})

    return <>
            <main className={classes.main}>
                <Outlet/>
            </main>
    </>
}

export default PublicLayout
