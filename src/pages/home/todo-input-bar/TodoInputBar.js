import {createUseStyles} from "react-jss";
import Button from "../../../components/Button";
import {AlertIcon, CrossIcon, SuccessIcon} from "../../../theme/icons";
import React, {useEffect, useState} from "react";
import Container from "../../../components/Container";
import Column from "../../../components/Column";
import Row from "../../../components/Row";
import TextArea from "../../../components/TextArea";
import ControlledSelect from "../../../components/ControlledSelect";
import DatePickerInput from "../../../components/DatePickerInput";
import {TASK_MODEL} from "../../../models";
import useError from "../../../hooks/useError";
import {handleApiError, retrieveSingleValueForRs} from "../../../utilities/helpers";
import dayjs from "dayjs";
import {TASK_PRIORITIES} from "../../../models/task";

const useStyles = createUseStyles(theme => ({
    sliderContainer: {
        padding: 0,
        [theme.mediaQueries.lUp]: {
            padding: '1rem 1.5rem',
        }
    },
    wrapper: {
        border: `1px solid rgba(255, 255, 255, 0.01)`,
        boxShadow: `0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)`,
        backgroundColor: theme.palette.common.white,
        padding: [16, 32],
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        zIndex: theme.zIndex.inputBar,
        height: '95vh',
        transition: 'max-height 0.2s ease-in-out',
        minHeight: 68,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        width: '100%',
        position: 'relative',
        maxHeight: ({ isOpen }) =>
            isOpen ? `50vh` : 68,
        [theme.mediaQueries.lUp]: {
            flexDirection: 'row',
            alignItems: 'center',
            height: 'auto',
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            maxHeight: `128px !important`,
        },
    },
    root: {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 4,
    },
    input: {
        padding: ({isOpen}) => isOpen && `32px 0 0 0`,
        flexGrow:1,
        '& textarea': {
            boxShadow: 'none',
            border: 'none',
            height: '100% !important',
            minHeight: `10em`,
        },
        [theme.mediaQueries.lUp]: {
            padding: ({isOpen}) => isOpen && `0`,
            '& textarea': {
                minHeight: `1em`,
            },
        }
    },
    filter: {
        display: 'flex',
        gap: 16,
        justifyContent: 'space-between',
        [theme.mediaQueries.lUp]: {
            justifyContent: 'center',
            display: 'flex',
        }
    },
    actionsMobile: {
        display: 'flex',
        gap: 8,
        minHeight: 40,
        '& button': {
            flex: 2,
            height: 'auto',
            '&:nth-child(2)':{
                flex: 1,
                background: theme.palette.error.main
            }
        },
        [theme.mediaQueries.lUp]: {
            display: 'none',
        }
    },
    actions: {
        gap: 8,
        display: 'none',
        '& button': {
            width: 34,
            height: 34,
            '&:nth-child(2)':{
                flex: 1,
                background: theme.palette.error.main
            }
        },
        [theme.mediaQueries.lUp]: {
            display: 'flex',
        }
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        cursor: 'pointer',
        display: 'block',
        [theme.mediaQueries.lUp]: {
            display: 'none'
        }
    },
    overlay: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.53)',
    },
}))


const TodoInputBar = ({task = {}, onAddTaskCb, onEditTaskCb, onCancelCb}) => {
    const [currentTask, setCurrentTask] = useState(task)
    const [inputText, setInputText] = useState('')
    const [date, setDate] = useState('')
    const [priority, setPriority] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const showError = useError();
    const classes = useStyles({isOpen});

    const onConfirm = async () =>{
        const updatedTask = {
            ...currentTask,
            [TASK_MODEL.description]: inputText,
            [TASK_MODEL.effort]: priority ? priority.value : false,
            [TASK_MODEL.date]: dayjs(date).format("YYYY-MM-DD"),
        }
        try {
            if(currentTask[TASK_MODEL.created_at]){
                await onEditTaskCb(currentTask,updatedTask);
                setIsOpen(false)
            }else{
                await onAddTaskCb(updatedTask);
            }
            reset();
        }catch (error){
            console.log('error', error)
            handleApiError({
                error,
                handleGeneralError: showError
            })
        }
    }

    useEffect(
        () => {
            if(task?.id){
                setCurrentTask(task)
            }
            return () => {
                setCurrentTask({})
            }
        },
        [task]
    )

    useEffect(
        () => {
            if(currentTask.id){
                setDate(currentTask[TASK_MODEL.date] ?? '')
                setInputText(currentTask[TASK_MODEL.description] ?? '')
                setPriority(currentTask[TASK_MODEL.effort] ? retrieveSingleValueForRs(TASK_PRIORITIES,currentTask[TASK_MODEL.effort]) : false)
                setIsOpen(true)
            }
            return () => {
                setIsOpen(false)
            }
        },
        [currentTask]
    )

    const reset = () => {
        setDate('')
        setInputText('')
        setPriority(false)
        setIsOpen(false)
    }

    return <>
        {isOpen && <div className={classes.overlay} onClick={() => setIsOpen(false)}/>}
        <div className={classes.root} onClick={() => {setIsOpen(true)}}>
            <Container className={classes.sliderContainer}>
                <Row>
                    <Column start={2} span={10}>

                        <div className={classes.wrapper}>
                            {isOpen && <span className={classes.closeButton} onClick={e => {
                                e.stopPropagation()
                                setIsOpen(false)
                            }}>
                            <CrossIcon width={14} height={14}/>
                        </span>}
                            <TextArea
                                showMaxLength
                                maxLength={200}
                                rootClassName={classes.input}
                                placeholder={'I need to do..'}
                                charCount={inputText.length}
                                inputProps={{
                                    value: inputText
                                }}
                                onChange={e => {
                                    setInputText(e.target.value.slice(0, 200))
                                }}
                            />
                            <div className={classes.filter}>
                                <DatePickerInput
                                    value={date}
                                    callback={setDate}
                                />
                                <ControlledSelect
                                    onChangeCallback={setPriority}
                                    onClear={() => setPriority(false)}
                                    name={'priority'}
                                    placeholder={'Priority'}
                                    isClearable
                                    menuPlacement={'top'}
                                    value={priority}
                                    options={TASK_PRIORITIES}
                                />
                            </div>
                            <div className={classes.actionsMobile}>
                                <Button disabled={!inputText || !date} onClick={onConfirm}>
                                    Add
                                </Button>
                                {currentTask?.id && <Button onClick={
                                    () => {
                                        onCancelCb(null)
                                        reset()
                                    }
                                }>
                                    Delete
                                </Button>}
                            </div>
                            <div className={classes.actions}>
                                <Button disabled={!inputText || !date} icon={<SuccessIcon/>} collapsed onClick={onConfirm}/>
                                <Button icon={<AlertIcon width={17} height={16}/>} collapsed onClick={
                                    () => {
                                        onCancelCb(null)
                                        reset()
                                    }
                                }/>
                            </div>
                        </div>
                    </Column>
                </Row>
            </Container>
        </div>
    </>

}

export default TodoInputBar;