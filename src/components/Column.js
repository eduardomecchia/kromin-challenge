import {createUseStyles} from 'react-jss'
import cx from "classnames";

const useStyles = createUseStyles((theme) => ({
    column: ({start, end}) => ({
        gridColumnStart: 1,
        gridColumnEnd: 13,
        [theme.mediaQueries.lUp]: {
            gridColumnStart: start,
            gridColumnEnd: end,
        },
        [theme.mediaQueries.xlUp]: {
            gridColumnStart: start,
            gridColumnEnd: end,
        }
    })
}))

const Column = ({start = 1, span = 12, children, className, ...rest}) => {
    const classes = useStyles({start, end: start + span})
    return <div className={cx(classes.column, className)} {...rest}>
        {children}
    </div>
}

export default Column
