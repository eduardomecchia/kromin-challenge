import * as yup from 'yup'

const LOGIN_MODEL = {
    email: 'email',
    password: 'password',
}

const DEFAULT_LOGIN_MOCK = {
    [LOGIN_MODEL.email]: '',
    [LOGIN_MODEL.password]: '',
}

const RequestValidationSchema = yup.object().shape({
    [LOGIN_MODEL.email]: yup
        .string()
        .email()
        .required('Email is required'),
    [LOGIN_MODEL.password]: yup
        .string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required('Password is required'),
})

export {
    LOGIN_MODEL,
    DEFAULT_LOGIN_MOCK,
    RequestValidationSchema as validationSchema,
}
