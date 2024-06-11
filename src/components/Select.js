import React, { useCallback } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { useController } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import ReactSelect from 'react-select'
import {CrossIcon} from "../theme/icons";

const useStyles = createUseStyles((theme) => ({
    root: {
        position: 'relative',
    },
    label: {},
    errorMessage: {
        color: theme.palette.error.main,
    },
}))

const Select = ({
    control,
    name,
    options,
    label,
    placeholder,
    helpText,
    defaultValue = '',
    isSearchable = false,
    isClearable = false,
    isCreatable = false,
    addOptionMessage,
    maxItems = 100,
    isMulti,
    onChangeCallback,
    closeMenuOnSelect = true,
    ...props
}) => {
    const {
        field: { onChange, ...fieldProps },
        fieldState: { error, isTouched, ...fieldStateProps },
        formState,
    } = useController({
        name,
        control,
        defaultValue,
    })

    // This extend the default onChange
    const onChangeHandler = (value) => {
        if (typeof onChangeCallback === 'function') onChangeCallback(value)
        if (!isMulti || (isMulti && value.length <= maxItems)) onChange(value) // Limit multi select
    }

    // Label for new item creation
    const createLabel = useCallback(
        (value) => (
            <span style={{ fontSize: 14 }}>
                {addOptionMessage}
                <span>{value}</span>
            </span>
        ),
        [addOptionMessage]
    )

    const classes = useStyles()
    const theme = useTheme()
    //React select styles - https://react-select.com/styles
    const reactSelectsStyle = {
        placeholder: (defaults, state) => ({
            ...defaults,
            color: theme.palette.grey[500],
            fontWeight: 400,
            fontSize: 16,
            margin: 0,
            textAlign: 'center'
        }),
        valueContainer: (defaults, state) => ({
            ...defaults,
            fontSize: 16,
            padding: 0,
            gap: 4,
        }),
        singleValue: (defaults, { isDisabled, isFocused }) => ({
            ...defaults,
            ...props?.singleValueCustomStyle,
            color: theme.palette.grey[500],
            fontWeight: 400,
            fontSize: 16,
            textAlign: 'center'
        }),
        control: (defaults, { isDisabled, isFocused }) => ({
            ...defaults,
            padding: `5px 12px`,
            height: 'auto',
            minWidth: 116,
            minHeight: 32,
            borderWidth: '1px !important',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            borderColor: `${theme.palette.grey[400]} !important`,
            display: 'flex',
            alignContent: 'center',
            ...(isDisabled && {
                borderColor: `${theme.palette.grey[200]} !important`,
            }),
            ...(isFocused && {
                border: `none`,
            }),
            borderRadius: 24,
            [theme.mediaQueries.lUp]: {
                minHeight: 40,
                minWidth: 116,
                padding: `4px 12px`,
            }
        }),
        option: (provided, { isDisabled, isFocused, isSelected }) => ({
            ...provided,
            marginTop: 4,
            color: isDisabled
                ? theme.palette.grey[200]
                : theme.palette.secondary.main,
            padding: `12px 16px`,
            ...((isFocused || isSelected) && {
                color: `${theme.palette.primary.light} !important`,
                backgroundColor: `${theme.palette.grey[300]} !important`,
            }),
            ...(isSelected && { fontWeight: 700 }),
            ...props?.optionCustomStyle,
            fontSize: 16,
            borderRadius: 4,
        }),
        indicatorsContainer: (defaults) => ({
            ...defaults,
            display: 'flex',
            alignItems: 'center',
            justifyItems: 'center',
            backgroundColor: 'transparent',
            padding: 0,
            '& svg': {
                fill: theme.palette.grey[500],
            },
        }),
        indicatorSeparator: (defaults) => ({
            ...defaults,
            width: 0,
            padding: 0,
        }),
        menu: (defaults) => ({
            ...defaults,
            zIndex: 20,
            borderRadius: 10,
            overflow: 'hidden',
        }),
        menuList: (defaults) => ({
            ...defaults,
            padding: 0,
            margin: 8,
        }),
        dropdownIndicator: (defaults) => ({
            ...defaults,
            padding: '2px',
        }),
        clearIndicator: (defaults) => ({
            ...defaults,
            borderRadius: '50px',
            marginRight: 4,
            padding: 0,
            backgroundColor: 'transparent',
        }),
        multiValueLabel: (defaults) => ({
            ...defaults,
            textTransform: isCreatable ? 'uppercase' : 'none',
            padding: 0,
            ...props?.multiValueLabelCustomStyle,
        }),
        multiValue: (defaults, state) => ({
            ...defaults,
            margin: 0,
            ...props?.multiValueCustomStyle,
        }),
        multiValueRemove: (defaults, state) => ({
            display: 'flex',
            alignItems: 'center',
            padding: '0 4px',
        }),
    }

    const selectProps = {
        options,
        closeMenuOnSelect,
        isSearchable,
        isClearable,
        isMulti,
        isDisabled: props.readOnly || props.disabled,
        className: classes.select,
        classNamePrefix: isCreatable ? 'creatable_select' : 'select',
        styles: reactSelectsStyle,
        placeholder,
        ...props,
    }

    return (
        <div className={classes.root}>
            {!!label && <label>{label}</label>}
            {isCreatable ? (
                <CreatableSelect
                    formatCreateLabel={createLabel}
                    components={{ DropdownIndicator: null, ClearIndicator }}
                    onChange={onChangeHandler}
                    {...formState} // from Controller
                    {...fieldProps} // from Controller
                    {...selectProps} // from Component
                />
            ) : (
                <ReactSelect
                    components={{ DropdownIndicator: null, ClearIndicator }}
                    onChange={onChangeHandler}
                    {...formState}
                    {...fieldProps}
                    {...selectProps}
                />
            )}
            {error?.message && (
                <div>
                    <small className={classes.errorMessage}>
                        {error.message}
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
}

const ClearIndicator = (props) => {
    const {
        children = <CrossIcon width={8} height={8}/>,
        getStyles,
        innerProps: { ref, ...restInnerProps },
    } = props;
    return (
        <div
            {...restInnerProps}
            ref={ref}
            style={{...getStyles('clearIndicator', props)}}
        >
            <div style={{ padding: '0px 5px', display: 'flex' }}>{children}</div>
        </div>
    );
};

export default Select
