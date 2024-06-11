import React from "react"
import PropTypes from "prop-types"
import cx from "classnames"
import {createUseStyles} from "react-jss"

export const SPINNER_POSITIONS = {
    ABSOLUTE: "absolute",
    FIXED: "fixed",
    STATIC: "static"
}

const useStyles = createUseStyles(theme => ({
    root: ({position, fullWidth}) => ({
        position: position,
        display: "inline-block",

        ...(fullWidth && {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }),
        ...((position === SPINNER_POSITIONS.FIXED || position === SPINNER_POSITIONS.ABSOLUTE) && {
            inset: 0
        }),
        ...((position === SPINNER_POSITIONS.FIXED) && {
            zIndex: 9900
        })
    }),
    overlay: {
        position: "absolute",
        inset: 0,
        background: theme.palette.common.white,
        opacity: 0.4
    },
    spinner: ({position, size}) => ({
        display: "inline-block",
        position: position,
        width: size,
        height: size,

        ...((position === SPINNER_POSITIONS.FIXED || position === SPINNER_POSITIONS.ABSOLUTE) && {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }),

        "& div": {
            boxSizing: "border-box",
            display: "block",
            position: "absolute",
            width: size,
            height: size,
            margin: 4,
            borderWidth: 4,
            borderStyle: "solid",
            borderColor: `${theme.palette.common.black} transparent transparent transparent`,
            borderRadius: "50%",
            animation: "$spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite"
        },

        "& div:nth-child(1)": {
            animationDelay: "-0.45s"
        },
        "& div:nth-child(2)": {
            animationDelay: "-0.3s"
        },
        "& div:nth-child(3)": {
            animationDelay: "-0.15s"
        }
    }),

    "@keyframes spin": {
        from: {
            transform: "rotate(0deg)"
        },
        to: {
            transform: "rotate(360deg)"
        }
    }
}))

const Spinner = ({
                     className,
                     position = SPINNER_POSITIONS.STATIC,
                     overlay,
                     fullWidth,
                     size = 40
                 }) => {
    const classes = useStyles({position, fullWidth, size})

    return (
        <div className={cx(classes.root, className)}>
            {overlay && <div className={classes.overlay}/>}
            <div className={classes.spinner}>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )
}

export default Spinner

Spinner.propTypes = {
    className: PropTypes.string,
    position: PropTypes.oneOf(Object.values(SPINNER_POSITIONS)).isRequired,
    overlay: PropTypes.bool,
    fullWidth: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}