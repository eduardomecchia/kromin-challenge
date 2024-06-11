import {useEffect, useRef, useState} from "react"
import {createUseStyles} from "react-jss"
import {CloseIcon} from "../theme/icons"
import Button from "./Button"
import Spinner, {SPINNER_POSITIONS} from "./Spinner"

const useStyles = createUseStyles(theme => ({
    root: {
        position: "fixed",
        zIndex: theme.zIndex.modal,
        inset: 0,
    },
    overlay: {
        position: "absolute",
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.53)',
        filter: "blur(2.5px)"
    },
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: theme.palette.common.white,
        borderRadius: 32,
        width: 400,
        maxWidth: "calc(100% - 16px)"
    },
    header: {
        padding: 32,
        textAlign: "center",
        "& h1": {
            fontSize: 24,
            fontWeight: 700,
            color: theme.palette.common.black
        }
    },
    body: ({bodyHeight}) => ({
        maxHeight: bodyHeight,
        overflow: "auto"
    }),
    footer: {
        padding: [20, 32],
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: 8
    },
    closeIcon: {
        position: "absolute",
        top: 32,
        right: 32,
        cursor: "pointer",

        "& path": {
            fill: theme.palette.grey[500]
        }
    },
    secondaryButton: {
        background: theme.palette.gradients[2]
    }
}))

const Popover = ({onClose, title, children, buttonPrimary, buttonSecondary, isLoading}) => {
    const pageHeight = window.innerHeight
    const headerRef = useRef()
    const footerRef = useRef()
    const [bodyHeight, setBodyHeight] = useState(window.innerHeight)
    const classes = useStyles({bodyHeight})

    useEffect(() => {
        document.body.style.overflowY = "hidden"

        return () => {
            document.body.style.overflowY = "auto"
        }
    }, [])

    useEffect(() => {
        setBodyHeight(pageHeight - (headerRef.current?.offsetHeight || 0) - (headerRef.current?.offsetHeight || 0) - 32) //32 = margins
    }, [headerRef, footerRef, pageHeight])

    return (
        <div className={classes.root}>
            <div className={classes.overlay} onClick={onClose}/>
            <div className={classes.modal}>
                <CloseIcon
                    size={24}
                    className={classes.closeIcon}
                    onClick={onClose}
                />
                {!!title && (
                    <div className={classes.header} ref={headerRef}>
                        <h1>{title}</h1>
                    </div>
                )}
                {!!children && (
                    <div className={classes.body}>
                        {children}
                    </div>
                )}
                {(!!buttonPrimary || !!buttonSecondary) && (
                    <div className={classes.footer} ref={footerRef}>
                        {!!buttonSecondary && (
                            <Button
                                className={classes.secondaryButton}
                                width="auto"
                                onClick={buttonSecondary.onClick}
                                fullWidth={!buttonPrimary}
                                disabled={buttonSecondary.disabled}
                            >
                                {buttonSecondary.text}
                            </Button>
                        )}
                        {!!buttonPrimary && (
                            <Button
                                width="auto"
                                onClick={buttonPrimary.onClick}
                                fullWidth={!buttonSecondary}
                                disabled={buttonPrimary.disabled}
                            >
                                {buttonPrimary.text}
                            </Button>
                        )}
                    </div>
                )}

                {isLoading && <Spinner position={SPINNER_POSITIONS.ABSOLUTE} overlay/>}
            </div>
        </div>
    )
}

export default Popover