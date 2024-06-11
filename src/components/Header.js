import {createUseStyles} from "react-jss";
import logo from "../assets/images/logo_text.png";
import {DarkModeIcon, LogoutIcon, SettingsIcon} from "../theme/icons";
import {useState} from "react";
import cx from "classnames";
import AuthAPI from "../http/auth.http";
import {handleApiError} from "../utilities/helpers";
import useUser from "../hooks/useUser";
import useError from "../hooks/useError";
import {ROUTE_HOME} from "../utilities/constants";
import {useNavigate} from "react-router-dom";

const useStyles = createUseStyles(theme => ({
    headerRoot: {
        gridRowStart: 'header',
        gridRowEnd: 'header',
        padding: [theme.spacing * 2, theme.spacing * 7],
        gridColumnStart: 1,
        gridColumnEnd: 5,
        backgroundColor: theme.palette.common.white,
        [theme.mediaQueries.s]: {
            padding: [theme.spacing * 2, 12],
        },

    },
    headerMenu: {
        ...theme.utils.flexbox.spaceBetween,
        gap: '20px',
    },
    containerLogo: {
        cursor: "pointer",
        gap: '20px',
        flexDirection: 'row',
        ...theme.utils.flexbox.centered,
        '& img': {
            maxWidth: 82
        }
    },
    settingsContainer: {
        position: "relative",
    },
    settingsButton: {
        height: 32,
        width: 32,
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: 8,
        cursor: "pointer",
        transition: "ease-in-out 400ms",
        ...theme.utils.flexbox.centered,
        "&:hover":{
            background:"#e8e8e8"
        }
    },
    settings: {
        position: "absolute",
        right: 0,
        top: 40,
        transform: "scale(0)",
        padding: [theme.spacing * 2, 0, theme.spacing * 3],
        background: theme.palette.common.white,
        border: `1px solid ${theme.palette.grey[400]}`,
        boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
        borderRadius: "24px 0px 24px 24px",
        ...theme.utils.grid.end,
        zIndex: theme.zIndex.settings
    },
    opened: {
        transition: "all ease-in-out 300ms",
        transform: "scale(1)",
    },
    closed: {
        transition: "all ease-in-out 300ms",
        transform: "scale(0)",
    },
    item:{
        padding: [theme.spacing,theme.spacing * 2,theme.spacing, theme.spacing * 4],
        minWidth: 164,
        "&:hover":{
            background:"#f6f6f6"
        }
    },
    userInfo: {
        padding: [theme.spacing,theme.spacing * 2,theme.spacing, theme.spacing * 4],
        "& > p": {
            color: theme.palette.common.black,
            fontSize: 16,
            fontWeight: 400,
            textAlign: "right"
        },
        "& > small": {
            fontSize: 12,
            fontWeight: 500,
            textAlign: "right",
            color: theme.palette.text.secondary,
        }
    },
    menuItem: {
        cursor: "pointer",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        gap: 12,
        "& > p": {
            color: theme.palette.common.black,
            fontSize: 14,
            fontWeight: 500,
            textAlign: "right"
        },
    },
    disabled:{
        background:"#ddd",
        opacity: 0.5,
        pointerEvents: "none"
    }
}))

const Header = () => {
    const [showSettings, setShowSettings] = useState(false);
    const {user, resetUser} = useUser()
    const showError = useError();
    const navigate = useNavigate();
    const classes = useStyles({showSettings});

    const onLogout = async () => {
        try {
            await AuthAPI.logoutUser()
            resetUser()
        }catch (error){
            handleApiError({
                error,
                handleGeneralError: showError
            })
        }
    }

    const menuItems = [
        {
            title: 'Dark mode',
            icon: <DarkModeIcon/>,
            to: '',
            callback: Function.prototype,
            disabled: true,
        },
        {
            title: 'Logout',
            icon: <LogoutIcon/>,
            to: '',
            callback: onLogout,
            disabled: false,
        },
    ]
    return <>
        <div className={classes.headerRoot}>
            <div className={classes.headerMenu}>
                <div className={classes.containerLogo} onClick={() => navigate(ROUTE_HOME)}>
                    <img src={logo} alt={"logo-text"}/>
                </div>
                <div className={classes.settingsContainer}>
                    <div className={classes.settingsButton} onClick={() => setShowSettings(!showSettings)}>
                        <SettingsIcon/>
                    </div>

                    <div className={cx(classes.settings, showSettings ? classes.opened : classes.closed)}>
                        <div className={classes.userInfo}>
                            <p>{user.first_name} {user.last_name}</p>
                            <small>{user.email}</small>
                        </div>
                        {menuItems?.map(({title,disabled, icon,callback}) =>
                            <div className={cx(classes.item, disabled && classes.disabled)} key={title} onClick={() => callback()}>
                                <div className={classes.menuItem}>
                                    <p>{title}</p>
                                    {icon}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Header;