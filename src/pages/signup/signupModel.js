import * as yup from 'yup'

const SIGNUP_MODEL = {
    firstName: 'first_name',
    lastName: 'last_name',
    email: 'email',
    password: 'password',
}

const DEFAULT_SIGNUP_MOCK = {
    [SIGNUP_MODEL.email]: '',
    [SIGNUP_MODEL.firstName]: '',
    [SIGNUP_MODEL.lastName]: '',
    [SIGNUP_MODEL.password]: '',
}

const RequestValidationSchema = yup.object().shape({
    [SIGNUP_MODEL.firstName]: yup
        .string()
        .required('First name is required'),
    [SIGNUP_MODEL.lastName]: yup
        .string()
        .required('Last name is required'),
    [SIGNUP_MODEL.email]: yup
        .string()
        .email()
        .required('Email is required'),
    [SIGNUP_MODEL.password]: yup
        .string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required('Password is required'),
})

export {
    SIGNUP_MODEL,
    DEFAULT_SIGNUP_MOCK,
    RequestValidationSchema as validationSchema,
}
