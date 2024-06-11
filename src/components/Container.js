import {createUseStyles} from 'react-jss'
import cx from "classnames";

const useStyles = createUseStyles((theme) => ({
    container: ({size}) => ({
        margin: [0, "auto"],
        padding: [theme.spacing * 2, theme.spacing * 3],
        maxWidth: size,
        [theme.mediaQueries.s]: {
            padding: [theme.spacing * 2],
        },
    }),
}))

const Container = ({size = 1320, children, className, ...rest}) => {
    const classes = useStyles({size})
    return <div className={cx(classes.container, className)} {...rest}>
        {children}
    </div>
}

export default Container
