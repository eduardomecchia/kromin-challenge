import React, {forwardRef} from 'react';
import {createUseStyles} from 'react-jss';
import cx from 'classnames';
import PropTypes from "prop-types";
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import DatePicker from 'react-date-picker'
import {CrossIcon} from "../theme/icons";

const useStyles = createUseStyles(theme => ({
    root: {
        display: 'flex',
        minWidth: 116,
    },
    input: {
        background: theme.palette.common.white,
        height: theme.spacing * 5,
        width: '100%',
    },
    withDesc: {
        fontSize: "12px",
        color: theme.palette.grey[500],
        letterSpacing: "0",
        lineHeight: "16px",
        marginTop: 4,
    },


    error: {
        color: theme.palette.error.main,
        fontSize: "12px",
        paddingTop: "2px"
    },

    popper: {
        zIndex: `10!important`
    },
    noBorder: {
        border: 'none'
    },
    dateRangeWrapper: {
        '& .react-daterange-picker': {
            maxWidth: `116px !important`
        },
        "& .react-daterange-picker__wrapper": {
            backgroundColor: theme.palette.common.white,
            minHeight: 32,
            minWidth: 135,
            maxWidth: 176,
            borderColor: ({errors}) => errors ? theme.palette.error.main : theme.palette.grey[400],
            borderRadius: 24,
            fontSize: 16,
            padding: 4,
            transition: 'ease-in-out 0.5s',
            color: theme.palette.grey[500],
            cursor: 'pointer',
            '&:hover': {
                borderColor: theme.palette.grey[400],
                '& svg': {
                    fill: `${theme.palette.secondary.main} !important`,
                    stroke: `${theme.palette.secondary.main} !important`,
                }
            },
            '&:focus': {
                borderColor: theme.palette.primary.main
            },
            '& button': {
                outline: '0',
            },
            [theme.mediaQueries.lUp]: {
                minHeight: 40,
                padding: 8,
            }
        },
        '& .react-daterange-picker__inputGroup': {
            textAlign: 'center',
            fontSize: 12,
            minWidth: 52
        },
        "& .react-daterange-picker__inputGroup__input": {
            background: 'transparent',
            color: theme.palette.secondary.main,
        },
        "& .react-daterange-picker__wrapper svg, .react-daterange-picker__calendar-button svg": {
            transition: 'ease-in-out 0.5s',
            '&:hover': {
                fill: `${theme.palette.common.black} !important`,
                stroke: `${theme.palette.common.black} !important`,
            }
        },
        "& .react-calendar": {
            background: theme.palette.common.white,
            border: 0,
            borderRadius: theme.spacing * 2,
            boxShadow: "-2px 1px 20px 14px rgb(97 96 167 / 13%)",
            padding: 8
        },
        "& .react-calendar__navigation__arrow": {
            color: theme.palette.common.black,
            ...theme.utils.flexbox.centered
        },
        "& .react-calendar__navigation__label": {
            color: theme.palette.common.black,
            textTransform: 'uppercase'
        },
        "& .react-calendar__month-view__weekdays": {
            color: theme.palette.common.black
        },
        "& .react-calendar__month-view__days__day": {
            outline: 'none',
            color: theme.palette.grey[500]
        },
        "& .react-calendar__month-view__days__day--neighboringMonth": {
            color: theme.palette.grey[500]
        },
        "& .react-calendar__month-view__days__day--weekend": {
            color: theme.themeColor
        },
        '& .react-calendar__tile--hasActive': {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            '&:hover': {
                backgroundColor: theme.palette.common.lightBlack,
                transition: 'ease-in-out 0.5s'
            }
        },
        "& .react-calendar__tile--active": {
            backgroundColor: '#DAEFFF',
            color: theme.palette.common.black,
            borderRadius: 0,
            '&:hover': {
                background: `${theme.palette.grey[400]}!important`,
                transition: 'ease-in-out 0.5s'
            }
        },
        "& .react-calendar__tile--now": {
            backgroundColor: `${theme.palette.common.white}!important`,
            boxSizing: "border-box",
            border: `2px solid ${theme.palette.primary.main}`,
            color: theme.palette.common.black,
            borderRadius: theme.spacing
        },
        '& .react-date-picker__button': {
            padding: `2px 4px 2px 2px`
        },
        '& .react-calendar__tile--': {
            '&:hover': {
                transition: 'all 0.5s ease-in-out 0s',
                background: theme.palette.common.lightGrey
            }
        },
        '& .react-calendar__tile--rangeStart': {
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 24,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
        },
        '& .react-calendar__tile--rangeEnd': {
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
        },
    },
    datePickerWrapper: {
        '& .react-date-picker': {
            maxWidth: `116px !important`
        },
        "& .react-date-picker__wrapper": {
            backgroundColor: theme.palette.common.white,
            minHeight: 32,
            minWidth: 116,
            maxWidth: 116,
            borderColor: ({errors}) => errors ? theme.palette.error.main : theme.palette.grey[400],
            borderRadius: 24,
            height: 35,
            fontSize: 16,
            padding: 4,
            transition: 'ease-in-out 0.5s',
            color: theme.palette.grey[500],
            cursor: 'pointer',
            '&:hover': {
                borderColor: theme.palette.grey[400],
                '& svg': {
                    fill: `${theme.palette.secondary.main} !important`,
                    stroke: `${theme.palette.secondary.main} !important`,
                }
            },
            '&:focus': {
                borderColor: theme.palette.primary.main
            },
            '& button': {
                outline: '0',
            },
            [theme.mediaQueries.lUp]: {
                minHeight: 40,
                padding: 8,
            }
        },
        '& .react-date-picker__inputGroup': {
            textAlign: 'center',
            fontSize: 12,
        },
        "& .react-date-picker__inputGroup__input": {
            background: 'transparent',
            color: theme.palette.secondary.main,
        },
        "& .react-date-picker__wrapper svg, .react-date-picker__calendar-button svg": {
            transition: 'ease-in-out 0.5s',
            '&:hover': {
                fill: `${theme.palette.common.black} !important`,
                stroke: `${theme.palette.common.black} !important`,
            }
        },
        "& .react-calendar": {
            background: theme.palette.common.white,
            border: 0,
            borderRadius: theme.spacing * 2,
            boxShadow: "-2px 1px 20px 14px rgb(97 96 167 / 13%)",
            padding: 8
        },
        "& .react-calendar__navigation__arrow": {
            color: theme.palette.common.black,
            ...theme.utils.flexbox.centered
        },
        "& .react-calendar__navigation__label": {
            color: theme.palette.common.black,
            textTransform: 'uppercase'
        },
        "& .react-calendar__month-view__weekdays": {
            color: theme.palette.common.black
        },
        "& .react-calendar__month-view__days__day": {
            outline: 'none',
            color: theme.palette.grey[500]
        },
        "& .react-calendar__month-view__days__day--neighboringMonth": {
            color: theme.palette.grey[500]
        },
        "& .react-calendar__month-view__days__day--weekend": {
            color: theme.themeColor
        },
        '& .react-calendar__tile--hasActive': {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            '&:hover': {
                backgroundColor: theme.palette.common.lightBlack,
                transition: 'ease-in-out 0.5s'
            }
        },
        "& .react-calendar__tile--active": {
            backgroundColor: '#DAEFFF',
            color: theme.palette.common.black,
            borderRadius: 0,
            '&:hover': {
                background: `${theme.palette.grey[400]}!important`,
                transition: 'ease-in-out 0.5s'
            }
        },
        "& .react-calendar__tile--now": {
            backgroundColor: `${theme.palette.common.white}!important`,
            boxSizing: "border-box",
            border: `2px solid ${theme.palette.primary.main}`,
            color: theme.palette.common.black,
            borderRadius: theme.spacing
        },
        '& .react-date-picker__button': {
            padding: `2px 4px 2px 2px`
        },
        '& .react-calendar__tile--': {
            '&:hover': {
                transition: 'all 0.5s ease-in-out 0s',
                background: theme.palette.common.lightGrey
            }
        },
        '& .react-calendar__tile--rangeStart': {
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 24,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
        },
        '& .react-calendar__tile--rangeEnd': {
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
        },
    }
}));


const DatePickerInput = forwardRef(({
                                       className,
                                       label,
                                       errors,
                                       rootProps,
                                       name,
                                       inForm = true,
                                       customFormat = null,
                                       dateFieldName = null,
                                       defaultValue,
                                       description,
                                       disabled,
                                       minDate,
                                       maxDate,
                                       showYearDropdown = true,
                                       showTimeSelect = false,
                                       isRange = false,
                                       filters,
                                       isClearable,
                                       setFilters,
                                       onChange = Function.prototype,
                                       callback,
                                       border = true,
                                       language = 'en',
                                       value,
                                       calendarIcon = null,
                                       showLeadingZeros = false,
                                       selectRange,
                                       ...props
                                   }, ref) => {

    const classes = useStyles({errors: !!errors});

    const dateValue = (value && typeof value === "string") ? new Date(value) : value;

    return <div data-control id={props.name} className={cx(classes.root, className)} {...rootProps}>
        {!!label && <span className={classes.label}>{label}</span>}
        {selectRange ?
            <DateRangePicker
                name={name}
                calendarIcon={calendarIcon}
                showLeadingZeros={showLeadingZeros}
                clearIcon={value ? <CrossIcon width={8} height={8}/> : null}
                ref={ref}
                locale={language}
                format={"MM-dd"}
                onChange={callback}
                value={dateValue}
                minDate={minDate}
                maxDate={maxDate}
                className={classes.dateRangeWrapper}
                returnValue={selectRange ? 'range' : 'start'}
                selectRange={selectRange}
            />
            :
            <DatePicker
                name={name}
                calendarIcon={calendarIcon}
                showLeadingZeros={showLeadingZeros}
                clearIcon={value ? <CrossIcon width={8} height={8}/> : null}
                ref={ref}
                locale={language}
                format={"yyyy-dd-MM"}
                onChange={callback}
                value={dateValue}
                minDate={minDate}
                maxDate={maxDate}
                className={classes.datePickerWrapper}
                returnValue={'start'}
            />}
        {description && <small className={classes.withDesc}> {description} </small>}
        {!!errors && <small className={classes.error}>{errors.message}</small>}
    </div>
});

export default DatePickerInput;

DatePickerInput.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    description: PropTypes.string,
    register: PropTypes.func, //required if we use it with react hook form
    defaultValue: PropTypes.any,
    maxDate: PropTypes.any,
    isRange: PropTypes.bool
};