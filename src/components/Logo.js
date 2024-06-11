import React from 'react';
import {createUseStyles} from "react-jss";
import logoImage from '../assets/images/logo.png'
import logoName from '../assets/images/logo_text.png'

const useStyles = createUseStyles(theme => ({
    logo: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'left',
        [theme.mediaQueries.lUp]: {
            alignItems: 'center',
        }
    },
    logoImage: {
        maxWidth: 42,
    },
    logoName: {
        maxWidth: 64,
    },
    motto: {
        color: theme.palette.text.primary,
        marginBottom: 32
    }
}))


const Logo = () => {
    const classes = useStyles();

    return <div className={classes.logo}>
        <img alt={'logo'} className={classes.logoImage} src={logoImage}/>
        <img alt={'todos'} className={classes.logoName} src={logoName}/>
        <div className={classes.motto}>the simplest todo app. ever.</div>
    </div>
}

export default Logo;