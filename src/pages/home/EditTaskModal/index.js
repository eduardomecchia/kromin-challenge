import {createUseStyles} from "react-jss"
import TextArea from "../../../components/TextArea"
import Checkbox from "../../../components/Checkbox"
import React, {useState} from "react"
import Popover from "../../../components/Popover"
import {useForm, useWatch} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup/dist/yup"
import {validationSchema} from "./model"
import dayjs from "dayjs"
import {TASK_MODEL} from "../../../models";
import DatePickerInput from "../../../components/DatePickerInput";
import Select from "../../../components/Select";
import {TASK_PRIORITIES} from "../../../models/task";

const useStyles = createUseStyles(theme => ({
    root: {
        padding: [66, 32, 0],
        display: "flex",
        flexDirection: "column",
        gap: 24
    },
    textareaWrapper: {
        position: "relative",
    },
    checkbox: {
        position: "absolute !important",
        width: "max-content !important",
        top: 0,
        left: 0,
        margin: 0,
        zIndex: 2
    },
    textarea: {
        marginLeft: 32,

        "& textarea": {
            borderRadius: 0,
            border: "none",
            padding: "0 !important",
            fontSize: 16,
            fontWeight: 500,
            color: theme.palette.common.textBlack,
        }
    },
    buttons: {
        ...theme.utils.flexbox.spaceBetween,
        margin: [4, 0]
    }
}))

const EditTaskModal = ({onClose, onUpdateCb, task}) =>  {

    const [date, setDate] = useState(task[TASK_MODEL.date])

    const classes = useStyles()

    const onSubmit = (formValues) => {
        onUpdateCb && onUpdateCb({...task},{
            ...task,
            ...formValues,
            [TASK_MODEL.effort]: formValues[TASK_MODEL.effort].value,
            date: dayjs(date).format("YYYY-MM-DD")
        })
        onClose();
    }

    const {handleSubmit, register, control, reset, setValue, formState: {errors}} = useForm({
        shouldUnregister: false,
        mode: 'onBlur',
        reValidateMode: 'onChange',
        nativeValidation: false,
        shouldFocusError: true,
        resolver: yupResolver(validationSchema),
        defaultValues: {
            [TASK_MODEL.completed]: !!task[TASK_MODEL.completed],
            [TASK_MODEL.description]: task[TASK_MODEL.description],
            [TASK_MODEL.date]: task[TASK_MODEL.date],
            [TASK_MODEL.effort]: +task[TASK_MODEL.effort],
        }
    })

    const description = useWatch({name: TASK_MODEL.description, control})

    return (
        <Popover
            onClose={onClose}
            buttonPrimary={{
                text: "Done",
                disabled: !description || !date,
                onClick: handleSubmit(onSubmit)
            }}
            buttonSecondary={{
                text: "Cancel",
                onClick: () => {
                    reset({
                        [TASK_MODEL.completed]: 0,
                        [TASK_MODEL.description]: "",
                        [TASK_MODEL.date]: null,
                        [TASK_MODEL.effort]: 0,
                    })
                    setDate('')
                }
            }}
        >
            <div className={classes.root}>
                <div className={classes.textareaWrapper}>
                    <Checkbox className={classes.checkbox} {...register(TASK_MODEL.completed)}/>
                    <TextArea
                        className={classes.textarea}
                        maxLength={200}
                        rows={6}
                        charCount={description?.length}
                        {...register(TASK_MODEL.description)}
                    />
                </div>
                <div className={classes.buttons}>
                    <DatePickerInput
                        value={date}
                        callback={setDate}
                    />
                    <Select
                        control={control}
                        name={TASK_MODEL.effort}
                        placeholder={'Effort'}
                        isClearable
                        menuPlacement={'top'}
                        options={TASK_PRIORITIES}
                    />
                </div>
            </div>
        </Popover>
    )
}

export default EditTaskModal