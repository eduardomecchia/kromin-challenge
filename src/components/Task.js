import {createUseStyles} from "react-jss";
import {DeleteIcon, DragIcon, EditIcon} from "../theme/icons";
import Checkbox from "./Checkbox";
import cx from "classnames";
import {forwardRef, useState} from "react"
import PropTypes from "prop-types";
import {TASK_MODEL} from "../models";
import dayjs from "dayjs";
import {effortRenderer} from "../utilities/helpers";
import {useWindowSize} from "../hooks/useWindowSize";

const useStyles = createUseStyles(theme => ({
    task: {
        display: "grid",
        gridTemplateColumns: "auto 0.1fr 1fr 0.3fr 0.25fr 0.12fr 0.12fr",
        alignItems: "center",
        borderTop: `1px solid ${theme.palette.grey[400]}`,
        [theme.mediaQueries.m]: {
            paddingBottom: theme.spacing * 2,
            borderTop: "unset",
            gridTemplateColumns: "0.1fr 1fr 0.15fr 0.15fr",
        },
    },
    last: {
        borderBottom: `1px solid ${theme.palette.grey[400]}`,
        [theme.mediaQueries.m]: {
            borderBottom: "unset",
        },
    },
    drag: {
        paddingLeft: theme.spacing,
        [theme.mediaQueries.m]: {},
    },
    doneCheck: {
        margin: 0
    },
    check: {
        ...theme.utils.flexbox.centered
    },
    text: {
        fontSize: 16,
        fontWeight: 500,
        color: theme.palette.common.textBlack,
        [theme.mediaQueries.m]: {
            paddingLeft: theme.spacing,
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "start",
            "& p > span:first-child": {
                fontWeight: 500,
                color: theme.palette.common.textBlack,
                display: "flex",
                gap: theme.spacing,
                overflow: "hidden",
                textOverflow: "ellipsis",
                "-webkit-line-clamp": 2,
                "-webkit-box-orient": "vertical"
            }
        },
    },
    date: {
        ...theme.utils.flexbox.centered,
        height: 40,
        fontSize: 12,
        fontWeight: 500,
        color: theme.palette.text.disabled,
        borderLeft: `1px solid ${theme.palette.grey[400]}`,
        [theme.mediaQueries.m]: {
            height: "auto",
            justifyContent: "start",
            border: "unset"
        },
    },
    priority: {
        ...theme.utils.flexbox.centered,
        height: 40,
        fontSize: 16,
        fontWeight: 600,
        color: theme.palette.primary.light,
        borderLeft: `1px solid ${theme.palette.grey[400]}`,
        borderRight: `1px solid ${theme.palette.grey[400]}`,
        [theme.mediaQueries.m]: {
            height: "auto",
            border: "unset"
        },
    },
    delete: {
        width: 32,
        height: 32,
        borderRadius: 32,
        margin: [0,"auto"],
        transition: 'all 400ms ease-in-out',
        cursor: "pointer",
        ...theme.utils.flexbox.centered,
        "&:hover":{
            background: theme.palette.error.light,
            '& > svg > path':{
                fill: theme.palette.common.white,
            }
        }
    },
    edit: {
        cursor: "pointer",
        ...theme.utils.flexbox.centered,
        height: 40,
        borderRight: `1px solid ${theme.palette.grey[400]}`,
    }
}))

const Task = forwardRef((
    {
        task,
        index,
        onDeleteCb,
        onEditCb,
        onUpdateCb,
        dragHandleProps,
        draggableProps,
        isLast,
        ...props
    },
    ref
) => {
    const { width } = useWindowSize();
    const isMobile = width < 768;
    const classes = useStyles();

    return <div className={cx(classes.task, isLast && classes.last)} ref={ref} {...draggableProps}>
        {isMobile ? <>
                <span className={classes.check}>
                    <Checkbox className={classes.doneCheck} onChange={() => onUpdateCb({...task},{...task, [TASK_MODEL.completed]: !task[TASK_MODEL.completed]})}/>
                </span>
                <span className={classes.text} onClick={onEditCb}>
                    <p>
                        <span>
                            {task?.[TASK_MODEL.effort] &&
                                <span className={classes.priority}> {effortRenderer(task[TASK_MODEL.effort])} </span>
                            }
                            {task?.[TASK_MODEL.description]}
                        </span>
                        <span className={classes.date}> {dayjs(task?.[TASK_MODEL.date]).format("DD-MM-YYYY")} </span>
                    </p>
                </span>
                <span className={classes.delete} onClick={() => onDeleteCb(task, index)}> <DeleteIcon/> </span>
                <span {...dragHandleProps} className={classes.drag}><DragIcon/></span>
            </>
            :
            <>
                <span {...dragHandleProps} className={classes.drag}><DragIcon/></span>
                <span className={classes.check}>
                    <Checkbox className={classes.doneCheck}
                              checked={task?.[TASK_MODEL.completed]}
                              onChange={() => onUpdateCb({...task},{...task, [TASK_MODEL.completed]: !task[TASK_MODEL.completed]})}
                    />
                </span>
                <span className={classes.text}> {task?.[TASK_MODEL.description]} </span>
                <span className={classes.date}> {dayjs(task?.[TASK_MODEL.date]).format("DD-MM-YYYY")} </span>
                <span className={classes.priority}> {effortRenderer(task[TASK_MODEL.effort])}</span>
                <span className={classes.edit} onClick={onEditCb}>
                    <EditIcon/>
                </span>
                <span className={classes.delete} onClick={() => onDeleteCb(task, index)}>
                    <DeleteIcon/>
                </span>
            </>
        }
    </div>
})

export default Task;


Task.propTypes = {
    task: PropTypes.object.isRequired,
    dragHandleProps: PropTypes.object,
    onDeleteCb: PropTypes.func,
    onUpdateCb: PropTypes.func,
    draggableProps: PropTypes.object,
    isLast: PropTypes.bool,
}