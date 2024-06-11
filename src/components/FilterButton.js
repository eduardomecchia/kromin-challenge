import React from "react";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles(theme => ({
    filter: {
        backgroundColor: theme.palette.common.white,
        padding: [7, 4],
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: 50,
        color: theme.palette.secondary.main,
        fontSize: 14,
        cursor: 'pointer',
        minWidth: 116,
        textAlign: 'center',
        maxHeight: 40,
        transition: "ease-out 400ms",
        '& :focus': {
            borderColor: theme.palette.primary.main
        },
        '& :hover': {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main
        },
        [theme.mediaQueries.lUp]: {
            padding: [10, 8],
            minWidth: 120
        }
    }
}))
const FilterButton = ({children, name, onClickCallback}) => {
    const classes = useStyles();
    return <span className={classes.filter} onClick={onClickCallback}>
            {name ?? children}
        </span>
}

export default FilterButton