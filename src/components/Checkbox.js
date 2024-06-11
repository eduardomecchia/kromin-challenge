import React, { forwardRef } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import PropTypes from 'prop-types'

const useStyles = createUseStyles((theme) => ({
    root: {
        width: 'max-content',
        display: 'grid',
        gridAutoFlow: ({ labelOn }) => (!labelOn ? 'row' : 'column'),
        gridColumnGap: ({ labelOn }) =>
            !labelOn ? undefined : theme.spacing / 2,
        alignContent: 'center',
        alignItems: 'center',
        position: 'relative',
        [theme.mediaQueries.sUp]: {
            width: 'unset',
        },
    },
    label: {
        fontSize: 14,
        marginLeft: 4,
        cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
        marginBottom: ({ labelOn }) =>
            labelOn ? 0 : theme.control.label['margin-bottom'],
        gridColumn: ({ labelOn }) =>
            !labelOn ? undefined : labelOn === 'left' ? 1 : 2,
    },
    input: {
        width: ({ isSmall }) => (isSmall ? 16 : 20),
        height: ({ isSmall }) => (isSmall ? 16 : 20),
        cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: 4,
        appearance: 'none',
        color: '#000',
        transition: 'background 0.4s',
        padding: 0,
        '&:checked': {
            color: '#fff',
            borderColor: 'none',
            background: theme.palette.gradients[1],
        },
        '&[type=checkbox]:not(:checked)': {},
        '&[type=checkbox]:checked': {
            content: ({ isSelectAll }) =>
                isSelectAll
                    ? `url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24'%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='minimize_black_24dp'%3E%3Cpolygon id='Path' points='0 0 24 0 24 24 0 24'%3E%3C/polygon%3E%3Cpolygon id='Path' fill='%23FFFFFF' fill-rule='nonzero' points='6 11 18 11 18 13 6 13'%3E%3C/polygon%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    : `url("data:image/svg+xml,%3Csvg viewBox='-4 -4 18 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4L4 7L9 1' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")`,
            fill: theme.palette.common.white,
            border: `none`,
        },
        '&[type=checkbox]:disabled': {
            background: theme.palette.grey[100],
            border: `none`,
        },
    },
    error: {
        display: 'grid',
        position: 'relative',
        gridRow: '2',
        gridColumnStart: '1',
        gridColumnEnd: '3',
        color: theme.palette.error.main,
    },
}))

const Checkbox = forwardRef(
    (
        {
            children,
            className,
            readOnly,
            proFeatureCb,
            label,
            labelOn = 'right',
            disabled,
            errors,
            isSmall,
            isDark = false,
            isSelectAll = false,
            ...props
        },
        ref
    ) => {
        const classes = useStyles({
            labelOn,
            errors: !!errors,
            disabled,
            isSmall,
            isDark,
            isSelectAll,
            readOnly,
        })

        return (
            <label id={props.name} className={cx(classes.root, className)}>
                {!!label && <span className={classes.label}>{label}</span>}
                <input
                    type={'checkbox'}
                    className={classes.input}
                    disabled={disabled}
                    ref={ref}
                    {...props}
                />
                {!!errors && !props?.disabled && (
                    <small className={classes.error}>{errors.message}</small>
                )}
                {children}
            </label>
        )
    }
)

export default Checkbox

Checkbox.propTypes = {
    children: PropTypes.any,
    label: PropTypes.string,
    labelOn: PropTypes.oneOf(['right', 'left']),
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    isSmall: PropTypes.bool,
}
