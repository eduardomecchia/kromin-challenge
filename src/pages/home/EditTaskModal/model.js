import * as yup from "yup"
import {TASK_MODEL} from "../../../models";

const validationSchema = yup.object().shape({
    [TASK_MODEL.completed]: yup.bool(),
    [TASK_MODEL.description]: yup.string().required('The description is required'),
    [TASK_MODEL.effort]: yup.number()
})

export {validationSchema}