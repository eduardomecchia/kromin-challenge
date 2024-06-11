import { forwardRef, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'

const useStyles = createUseStyles((theme) => ({
    root: {
        position: 'relative',
    },
    textAreaWrapper: ({ hasError }) => ({
        position: 'relative',
        flexGrow: 1,
        '& textarea': {
            padding: [6, 8],
            resize: 'none',
            overflow: 'auto',
            maxHeight: theme.spacing * 20,
            minHeight: 36,
            fontSize: 16,
            color: theme.palette.grey[600],
            height: 'auto',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
            '-ms-overflow-style': 'none' /* IE and Edge */,
            scrollbarWidth: 'none' /* Firefox */,
            '&:focus': {
                outline: 'none',
            },
            ...(hasError && { ...theme.controls.textareaError }),
        },
    }),
    errorMessage: {
        color: theme.palette.error.main,
    },
    charsLeft: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        fontSize: 10,
        color: theme.palette.grey[400],
    },
}))

/**
 * Expand the height of the input box as multiple lines of text are entered.
 */
const autoExpand = (el) => {
    setTimeout(() => {
        el.style.cssText = 'height:auto; padding:0'
        el.style.cssText = 'height:' + el.scrollHeight + 'px'
    }, 0)
}

const TextArea = forwardRef(function TextArea(
    {
        label,
        name,
        placeholder,
        helpText,
        onChange,
        onBlur,
        icon,
        iconCallback,
        touched = false,
        errors,
        inputProps,
        keyPressCallback,
        className,
        rootClassName,
        rows = 1,
        charCount = 0,
        showMaxLength = false,
        ...rest
    },
    forwardedRef
) {
    const textAreaRef = useRef()
    /* Textarea must have at least one ref to autoExpand*/
    const ref = forwardedRef ?? textAreaRef

    const handleKeyPress = (e) => {
        if (typeof keyPressCallback === 'function') keyPressCallback(e)
        autoExpand(e.target)
    }

    const classes = useStyles({
        touched,
        isSuccess: !errors && touched,
        hasError: !!errors,
    })

    return (
        <div className={cx(classes.root, rootClassName)} {...rest}>
            {!!label && <label htmlFor={name}>{label}</label>}
            <div className={cx(classes.textAreaWrapper, className)}>
                <textarea
                    ref={ref}
                    name={name}
                    rows={rows}
                    onChange={onChange}
                    onBlur={onBlur}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    maxLength={rest.maxLength}
                    {...inputProps}
                />
                {rest.maxLength && showMaxLength && (
                    <div className={classes.charsLeft}>
                        {charCount}/{rest.maxLength}
                    </div>
                )}
            </div>
            {errors?.message && (
                <div>
                    <small className={classes.errorMessage}>
                        {errors.message}
                    </small>
                </div>
            )}
        </div>
    )
})
export default TextArea
