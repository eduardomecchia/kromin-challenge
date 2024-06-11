import {createUseStyles} from "react-jss";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Column from "../../components/Column";
import TasksAPI from "../../http/task.http";
import useError from "../../hooks/useError";
import {useEffect, useMemo, useState} from "react";
import {
    dateIsInRange,
    dateRenderer,
    groupByDate,
    handleApiError,
    isBeforeToday,
    moveItems, objToFlatArray,
    reorderItems
} from "../../utilities/helpers";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Task from "../../components/Task";
import HomeTableHeader from "./home-table-heading";
import TodoInputBar from "./todo-input-bar/TodoInputBar";
import FilterBar from "./filter-bar/FilterBar";
import {useWindowSize} from "../../hooks/useWindowSize";
import EditTaskModal from "./EditTaskModal";

const useStyles = createUseStyles(theme => ({
    taskBodyRoot: {
        paddingTop: 0,
        height: `calc(${window.innerHeight}px - 184px)`,
        overflow: "scroll",
        paddingBottom: 40,
        [theme.mediaQueries.lUp]: {
            paddingBottom: 16
        }
    },
    section: {
        marginBottom: theme.spacing * 3
    },
    sectionHeading: {
        display: "block",
        margin: [theme.spacing * 3, 0, theme.spacing],
        fontSize: 14,
        fontWeight: 500,
        color: theme.palette.common.textBlack,
    }
}))

const Homepage = () => {
    const showError = useError()
    const [searchInput, setSearchInput] = useState('');
    const [tasks, setTasks] = useState(null);
    const [dateFilter, setDateFilters] = useState('');
    const [priority, setPriority] = useState(false);
    const [openedTask, setOpenedTask] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const classes = useStyles();

    const {width} = useWindowSize()
    const isMobile = width < 600

    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = async () => {
        try {
            const {data} = await TasksAPI.getTasks();
            setTasks(groupByDate(data));
        } catch (error) {
            handleApiError({
                error,
                handleGeneralError: showError
            })
        }
    }

    /**
     * Edit task
     * @param oldTask
     * @param newTask
     * @returns {Promise<void>}
     */
    const onEditTask = async (oldTask,newTask) => {
        try {
            const {data} = await TasksAPI.editTask(newTask);
            onUpdateItem(oldTask,data)
        } catch (error) {
            handleApiError({
                error,
                handleGeneralError: showError
            })
        }
    }
    const onUpdateItem = (oldItem,updatedItem) => {
        let newTasks = tasks;
        const isDateChanged = updatedItem[TASK_MODEL.date] !== oldItem[TASK_MODEL.date] && !(isBeforeToday(oldItem[TASK_MODEL.date]) && isBeforeToday(updatedItem[TASK_MODEL.date]))

        if(isDateChanged) {
            //remove the task from old list
            if(isBeforeToday(oldItem[TASK_MODEL.date])){
                newTasks["Expired"].filter(task => task[TASK_MODEL.id] !== updatedItem[TASK_MODEL.id])
            } else {
                newTasks[oldItem[TASK_MODEL.date]] = newTasks[oldItem[TASK_MODEL.date]].filter(task => task[TASK_MODEL.id] !== updatedItem[TASK_MODEL.id])
            }

            //add the task in new list
            if(isBeforeToday(updatedItem[TASK_MODEL.date])){
                newTasks["Expired"].push(updatedItem)
            } else {
                if(updatedItem[TASK_MODEL.date] in newTasks) {
                    newTasks[updatedItem[TASK_MODEL.date]].push(updatedItem)
                } else {
                    newTasks[updatedItem[TASK_MODEL.date]] = [updatedItem];
                }
            }
        } else {
            //update the task in the same list
            if(isBeforeToday(updatedItem[TASK_MODEL.date])) {
                const taskToUpdateIndex = newTasks["Expired"].findIndex(task => task[TASK_MODEL.id] === updatedItem[TASK_MODEL.id])
                newTasks["Expired"][taskToUpdateIndex] = updatedItem
            } else {
                const taskToUpdateIndex = newTasks[updatedItem[TASK_MODEL.date]].findIndex(task => task[TASK_MODEL.id] === updatedItem[TASK_MODEL.id])
                newTasks[updatedItem[TASK_MODEL.date]][taskToUpdateIndex] = updatedItem
            }
        }
        setTasks({...newTasks});
    }

    /**
     * Delete Task
     * @param task
     * @param index
     * @returns {Promise<void>}
     */
    const onDeleteTask = async (task,index) => {
        try {
            await TasksAPI.deleteTask(task[TASK_MODEL.id]);
            onDeleteItem(task[TASK_MODEL.date],index)
        } catch (error) {
            handleApiError({
                error,
                handleGeneralError: showError
            })
        }
    }
    const onDeleteItem = (key,index) => {
        let newTasks = tasks;
        //remember that key is => date
        //check if is Expired
        if(isBeforeToday(key)){
            newTasks["Expired"].splice(index,1);
        }else{
            newTasks[key].splice(index,1);
        }
        setTasks({...newTasks});
    }

    /**
     * On order tasks after d&d event
     * @param orderedItems: list after d&d event
     * @returns {Promise<void>}
     */
    const onOrderTasks = async (orderedItems) => {
        const newTasks = objToFlatArray(orderedItems).map(el => el[TASK_MODEL.id])
        try {
            await TasksAPI.orderTasks(newTasks);
        } catch (error) {
            handleApiError({
                error,
                handleGeneralError: showError
            })
        }
    }
    const onDragEnd = (result) => {
        const {source, destination} = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = source.droppableId;
        const dInd = destination.droppableId;
        const newState = {...tasks};

        if (sInd === dInd) {
            newState[sInd] = reorderItems(tasks[sInd], source.index, destination.index);
            setTasks({...newState});
        } else {
            const result = moveItems(tasks[sInd], tasks[dInd], source, destination);
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];
            setTasks({...newState});
        }

        onOrderTasks(newState)
    }

    /**
     * Add Task
     * @param task
     * @returns {Promise<void>}
     */
    const onAddTasks = async (task) => {
        const {data} = await TasksAPI.addTask(task);
        onAddItem(data)
    }
    const onAddItem = (newItem) => {
        let newTasks = tasks;
        if(newItem?.date in newTasks){
            newTasks[newItem?.date].push(newItem);
        }else{
            newTasks[newItem?.date] = newTasks[newItem?.date] || [];
            newTasks[newItem?.date].push(newItem);
        }
        setTasks({...newTasks});
    }

    const filteredTasks = useMemo(
        () => {
            const filtered = {}
            if(tasks){
                Object.keys(tasks).forEach(date => {
                    const filteredDate = tasks[date].filter(t => {
                        const isInDate = dateFilter ?
                            dateIsInRange(t[TASK_MODEL.date], dateFilter?.[0], dateFilter?.[1]) : true
                        const isInSearch = searchInput ? t[TASK_MODEL.description].includes(searchInput) : true
                        const isInPriority = priority ? t[TASK_MODEL.effort] === priority.value : true
                        return isInDate && isInSearch && isInPriority
                    })
                    if(filteredDate.length) filtered[date] = filteredDate
                })
            }
            return filtered
        },
        [tasks, dateFilter, searchInput, priority]
    )

    return <>
        <FilterBar
            onSearchHandler={setSearchInput}
            onDateChangeHandler={setDateFilters}
            dateFilter={dateFilter}
            onPriorityHandler={setPriority}
        />
        <HomeTableHeader/>
        <Container className={classes.taskBodyRoot}>
            <Row>
                <Column start={2} span={10}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {filteredTasks && Object.keys(filteredTasks)?.map((date) =>
                            <Droppable key={date} droppableId={`${date}`} isDropDisabled={date === "Expired"}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        <div className={classes.section}>
                                            <div key={date} className={classes.sectionHeading}>
                                                {dateRenderer(date)}
                                            </div>
                                            {filteredTasks[date]?.map((task, index) =>
                                                <Draggable key={task.id} draggableId={`item-${task.id}`} index={index}>
                                                    {(provided, snapshot) => (
                                                        <Task task={task}
                                                              index={index}
                                                              isLast={(tasks[date]?.length - 1 === index)}
                                                              ref={provided.innerRef}
                                                              onDeleteCb={onDeleteTask}
                                                              onUpdateCb={onEditTask}
                                                              onEditCb={() =>{
                                                                  setOpenedTask(task)
                                                                  setShowEditModal(true)
                                                              }}
                                                              draggableProps={provided.draggableProps}
                                                              dragHandleProps={provided.dragHandleProps}
                                                        />
                                                    )}
                                                </Draggable>
                                            )}
                                        </div>
                                    </div>)}
                            </Droppable>
                        )}
                    </DragDropContext>
                </Column>
            </Row>
        </Container>
        {showEditModal && !isMobile && (
            <EditTaskModal
                onClose={() => {
                    setShowEditModal(false)
                }}
                task={openedTask}
            />
        )}
        <TodoInputBar task={isMobile && openedTask} onCancelCb={setOpenedTask} onAddTaskCb={onAddTasks} onEditTaskCb={onEditTask}/>
    </>
}

export default Homepage;