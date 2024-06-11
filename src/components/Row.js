import {createUseStyles} from 'react-jss'
import cx from "classnames";

const useStyles = createUseStyles((theme) => ({
    row: ({columns, gutter}) => ({
        display: `grid`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gutter
    })
}))

const Row = ({columns = 12, gutter = 0, className, children, ...rest}) => {
    const classes = useStyles({columns, gutter})
    return <div className={cx(classes.row, className)} {...rest}>
        {children}
    </div>
}

export default Row
