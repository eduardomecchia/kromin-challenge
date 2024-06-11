import {createUseStyles} from 'react-jss'
import {Outlet} from "react-router-dom";
import Header from "../../components/Header";
import useError from "../../hooks/useError";
import useAlert from "../../hooks/useAlert";

const useStyles = createUseStyles((theme) => ({

}))

const PrivateLayout = () => {

    const {isAlertOpen, alertData, closeAlert} = useAlert()
    const showError = useError()
    const classes = useStyles()

    return <>
        <Header/>
            <main className={classes.main}>
                <Outlet/>
            </main>
    </>
}

export default PrivateLayout
