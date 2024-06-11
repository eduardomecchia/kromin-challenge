import colors from './colors'

const neutral = {
    common: colors.common,
    grey: colors.greyscale,
    transparency: colors.transparency,
    gradients: colors.gradients,
}

const palette = {
    light: {
        ...neutral,
        primary: {
            light: colors.blue[400],
            main: colors.blue[500],
            dark: colors.blue[600],
        },
        secondary: {
            main: colors.greyscale[500],
        },
        success: {
            light: colors.green[400],
            main: colors.green[500],
            background: '#F3FEF3',
        },
        error: {
            light: colors.red[400],
            main: colors.red[500],
            transparency: colors.red['A75'],
            background: '#FEF5F3',
        },
        warning: {
            light: colors.yellow[400],
            main: colors.yellow[500],
            background: '#FFFDF5',
        },
        disabled: {
            main: colors.greyscale[400],
        },
        background: {
            body: colors.greyscale[300],
            section: colors.common.white,
        },
        text: {
            primary: colors.greyscale[500],
            secondary: colors.greyscale[600],
            inactive: colors.greyscale[400],
            disabled: colors.greyscale[400],
        },
        link: {
            normal: colors.blue[500],
            visited: colors.blue[600],
        },
        icon: {
            active: colors.greyscale[500],
            inactive: colors.greyscale[400],
        },
        action: {
            active: colors.greyscale[500],
            inactive: colors.greyscale[400],
        },
        divider: {
            active: colors.blue[500],
            external: colors.greyscale[300],
            internal: colors.greyscale[200],
        },
        input: {
            active: colors.greyscale[500],
            placeholder: colors.greyscale[400],
        },
    },
    dark: {
        ...neutral,
        primary: {
            light: colors.blue[400],
            main: colors.blue[500],
            dark: colors.blue[600],
        },
        secondary: {
            main: colors.greyscale[500],
        },
        success: {
            light: colors.green[400],
            main: colors.green[500],
            background: '#F3FEF3',
        },
        error: {
            light: colors.red[400],
            main: colors.red[500],
            transparency: colors.red['A75'],
            background: '#FEF5F3',
        },
        warning: {
            light: colors.yellow[400],
            main: colors.yellow[500],
            background: '#FFFDF5',
        },
        disabled: {
            main: colors.greyscale[400],
        },
        background: {
            body: colors.greyscale[500],
            section: colors.common.white,
        },
        text: {
            primary: colors.greyscale[500],
            secondary: colors.greyscale[600],
            inactive: colors.greyscale[400],
            disabled: colors.greyscale[400],
        },
        link: {
            normal: colors.blue[500],
            visited: colors.blue[600],
        },
        icon: {
            active: colors.greyscale[500],
            inactive: colors.greyscale[400],
        },
        action: {
            active: colors.greyscale[500],
            inactive: colors.greyscale[400],
        },
        divider: {
            active: colors.blue[500],
            external: colors.greyscale[300],
            internal: colors.greyscale[200],
        },
        input: {
            active: colors.greyscale[500],
            placeholder: colors.greyscale[400],
        },
    },
}

export default palette
