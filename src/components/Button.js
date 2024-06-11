import { createUseStyles, useTheme } from 'react-jss'
import PropTypes from 'prop-types'
import cx from 'classnames'

const useStyles = createUseStyles((theme) => ({
    root: ({
        size,
        variant,
        collapsed,
        icon,
        data,
        disabled,
        width,
        isLight,
    }) => ({
        ...theme.utils.grid.centered,
        borderRadius: 12,
        position: 'relative',
        background: theme.palette.gradients[1],
        color:
            variant === 'ghost' || variant === 'borderless' || isLight
                ? theme.palette[data].main
                : theme.palette.common.white,

        ...(!disabled && {
            cursor: 'pointer',
            '&:hover': {
                backgroundColor:
                    variant === 'ghost' || variant === 'borderless'
                        ? 'none'
                        : theme.palette[data].darker,
                borderColor: theme.palette[data].darker,
                color:
                    variant === 'ghost' || variant === 'borderless'
                        ? theme.palette[data].darker
                        : theme.palette.common.white,
                '& svg': {
                    fill:
                        !disabled &&
                        (variant === 'ghost' || variant === 'borderless') &&
                        `${theme.palette[data].darker} !important`,
                },
            },
        }),

        ...(collapsed && {
            height: theme.spacing * 7,
            width: theme.spacing * 7,
        }),
        ...(!collapsed && {
            width: width,
            aspectRatio: 'unset',
            height: theme.spacing * 6,
        }),

        ...(size === 'large' && {
            height: theme.spacing * 7,
        }),
        ...(size === 'medium' && {
            height: theme.spacing * 6,
        }),
        ...(size === 'small' && {
            height: theme.spacing * 4,
        }),

        ...((variant === 'filled' || variant === 'round') && {
            color: theme.palette.common.white,
        }),

        ...(variant === 'ghost' && {
            backgroundColor: 'unset',
        }),
        ...(variant === 'borderless' && {
            backgroundColor: isLight
                ? `${theme.palette[data][isLight ? 'buttonLight' : 'main']}`
                : 'unset',
            border: 0,
        }),
        ...(variant === 'round' && {
            borderRadius: 100,
        }),

        ...(disabled && {opacity: 0.5}),

        '& > span': {
            ...theme.utils.grid.centered,
            gridTemplateColumns: icon && !collapsed ? 'repeat(2, auto)' : '1fr',
            gridColumnGap: theme.spacing,
            ...(size === 'large' && {
                ...theme.typography.buttonBig,
            }),
            ...(size === 'medium' && {
                ...theme.typography.buttonMedium,
            }),
            ...(size === 'small' && {
                ...theme.typography.buttonSmall,
            }),
            '& svg': {
                ...theme.utils.flexbox.centered,
                width: 22,
                fill: disabled
                    ? `${theme.palette.disabled} !important`
                    : variant !== 'ghost' && variant !== 'borderless'
                    ? `${theme.palette.common.white} !important`
                    : `${theme.palette[data].main} !important`,
            },
        },
    }),
}))

const Button = ({
    children,
    variant = 'filled',
    type = 'button',
    collapsed = false,
    data = 'primary',
    transparency = 'default',
    alert,
    icon,
    iconPosition = 'right',
    size = 'medium',
    width = 220,
    height,
    disabled = false,
    isLight = false,
    onClick,
    className,
    ...props
}) => {
    const classes = useStyles({
        size,
        variant,
        collapsed,
        icon,
        data,
        disabled,
        width,
        isLight,
    })

    return (
        <button
            className={cx(classes.root, className)}
            {...props}
            type={type}
            onClick={onClick}
        >
            {collapsed ? (
                <span>{icon}</span>
            ) : icon ? (
                iconPosition === 'left' ? (
                    <span>
                        {icon}
                        <span>{children}</span>
                    </span>
                ) : (
                    <span>
                        <span>{children}</span>
                        {icon}
                    </span>
                )
            ) : (
                <span>{children}</span>
            )}
        </button>
    )
}

export default Button

Button.propTypes = {
    data: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    variant: PropTypes.oneOf(['filled', 'ghost', 'borderless', 'round']),
    size: PropTypes.oneOf(['large', 'medium', 'small']),
    iconPosition: PropTypes.oneOf(['left', 'right']),
    transparency: PropTypes.oneOf(['low', 'medium', 'high']),
}
