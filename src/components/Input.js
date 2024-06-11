import { forwardRef } from 'react'
import { createUseStyles } from 'react-jss'
import * as PropTypes from 'prop-types'
import cx from 'classnames'
import { AlertIcon, SuccessIcon } from '../theme/icons'

const useStyles = createUseStyles((theme) => ({
    root: {
        position: 'relative',
        '& label': {
            paddingLeft: theme.spacing * 2
        }
    },
    inputWrapper: ({
        hasError,
        isSuccess,
        touched,
        rounded,
        iconPosition,
        icon
    }) => ({
        position: 'relative',
        margin: [theme.spacing / 2, 0],
        width: '100%',
        '& input': {
            border:'none',
            backgroundColor: `#FFF`,
            boxShadow: `0px 1px 2px rgba(0, 0, 0, 0.05);`,
            paddingLeft:
                icon && iconPosition === 'left' ? theme.spacing * 6 : theme.spacing * 2,
            paddingRight: touched ? theme.spacing * 10 : theme.spacing * 6,
            ...(rounded && { borderRadius: 12 }),
            ...(hasError && { ...theme.controls.inputError }),
            ...(isSuccess && { ...theme.controls.inputSuccess }),
        },
    }),
    icons: ({ iconPosition }) => ({
        position: 'absolute',
        top: '50%',
        ...(iconPosition === 'left'
            ? { left: theme.spacing * 2 }
            : { right: theme.spacing * 2 }),
        transform: 'translateY(-50%)',
        display: 'flex',
        gap: theme.spacing / 2,
        zIndex: 1,
    }),
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        cursor: 'pointer',
    },
    statusIcons: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        gap: theme.spacing / 2,
        zIndex: 1,
        left: 'unset',
        right: theme.spacing * 2,
    },
    statusIconWarning: {
        extend: 'icon',
        cursor: 'unset',
    },
    statusIconSuccess: {
        extend: 'icon',
        cursor: 'unset',
    },
    errorMessage: {
        color: theme.palette.error.main,
    },
}))

//<Input label="First Name" {...register('firstName')} />
const Input = forwardRef(function Input(
    {
        label,
        name,
        type = 'text',
        placeholder,
        helpText,
        onChange,
        onBlur,
        icon,
        iconPosition = 'left',
        rounded,
        iconCallback,
        statusIcon,
        statusIconCallback,
        touched = false,
        errors,
        rootClassName,
        inputProps,
        variant = 'normal',
        ...rest
    },
    ref
) {
    const classes = useStyles({
        touched,
        iconPosition,
        icon,
        rounded,
        isSuccess: !errors && touched,
        hasError: !!errors,
        variant: variant,
        iconDx: icon,
    })
    return (
        <div className={cx(classes.root, rootClassName)} {...rest}>
            {!!label && <label htmlFor={name}>{label}</label>}
            <div className={classes.inputWrapper}>
                <span className={classes.icons}>
                    {icon && (
                        <span
                            className={classes.icon}
                            {...(iconCallback && { onClick: iconCallback })}
                        >
                            {icon}
                        </span>
                    )}
                </span>
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    {...inputProps}
                />
                <span className={classes.statusIcons}>
                    {!!errors ? (
                        <span className={classes.statusIconWarning}>
                            <AlertIcon />
                        </span>
                    ) : (
                        touched && (
                            <span className={classes.statusIconSuccess}>
                                <SuccessIcon />
                            </span>
                        )
                    )}
                    {statusIcon && (
                        <span
                            className={classes.icon}
                            {...(statusIconCallback && {
                                onClick: statusIconCallback,
                            })}
                        >
                            {statusIcon}
                        </span>
                    )}
                </span>
            </div>
            {errors?.message && (
                <div>
                    <small className={classes.errorMessage}>
                        {errors.message}
                    </small>
                </div>
            )}
            {helpText && (
                <div>
                    <small>{helpText}</small>
                </div>
            )}
        </div>
    )
})

export default Input

Input.propTypes = {
    className: PropTypes.any,
    label: PropTypes.string,
    type: PropTypes.oneOf(['email', 'password', 'text', 'number']),
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    iconPosition: PropTypes.oneOf(['left', 'right']),
}
