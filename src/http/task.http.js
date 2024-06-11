import axios from "./";
import {TASK_MODEL} from "../models";

const TasksAPI = {
    getTasks: () => {
        const url = '/todos'
        return axios.get(url)
    },
    addTask:(data) => {
        const url = '/todos'
        return axios.post(url,data)
    },
    editTask:(data) => {
        const url = `/todos/${data?.[TASK_MODEL.id]}`
        return axios.patch(url,data)
    },
    deleteTask:(id) => {
        const url = `/todos/${id}`
        return axios.delete(url)
    },
    orderTasks:(data) => {
        const url = '/todos/order'
        return axios.post(url,{todos:[...data]})
    }
}

export default TasksAPI