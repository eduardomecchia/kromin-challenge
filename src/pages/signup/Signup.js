import {createUseStyles} from "react-jss";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {DEFAULT_SIGNUP_MOCK, SIGNUP_MODEL, validationSchema} from "./signupModel";
import Input from "../../components/Input";
import {useState} from "react";
import {EyeOffIcon, EyeOnIcon, SuccessIcon} from "../../theme/icons";
import Button from "../../components/Button";
import {Link} from "react-router-dom";
import {ROUTE_LOGIN} from "../../utilities/constants";
import {handleApiError} from "../../utilities/helpers";
import useError from "../../hooks/useError";
import AuthAPI from "../../http/auth.http";
import Logo from "../../components/Logo";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles(theme => ({
    formTitle: {
        textAlign: 'left',
        [theme.mediaQueries.lUp]: {
            textAlign: 'center'
        }
    },
    formFooter: {
        textAlign: 'center',
        '& > * ': {
            marginBottom: 24
        }
    },
    success:{
        textAlign: "center",
        margin: [theme.spacing * 5,0],
    },
    formWrapper: {
        height: '100%',
        margin: '0 auto',
        display: "flex",
        flexDirection: 'column',
        gap: 40,
        flexGrow: 1,
        justifyContent: "space-between",
        minWidth: 348,
        maxWidth: 348,
        [theme.mediaQueries.lUp]: {
            justifyContent: "center",
            height: 'auto',
        }
    },
    fieldWrapper: {
        display: "flex",
        flexDirection: 'column',
        gap: 16,
    },
}))

const Signup = () => {
    const showError = useError();
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();

    const methods = useForm({
        shouldUnregister: false,
        mode: 'onBlur',
        reValidateMode: 'onChange',
        nativeValidation: false,
        shouldFocusError: true,
        resolver: yupResolver(validationSchema),
        defaultValues: DEFAULT_SIGNUP_MOCK,
    })
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting, touchedFields},
    } = methods

    const submitHandler = async (values) => {
        try {
            await AuthAPI.signupUser(values)
            setIsSuccess(true)
        } catch (error) {
            handleApiError({
                error,
                handleGeneralError: showError,
                handleFormError: setError
            })
        }
    }

    return <>
        {isSuccess ? <div className={classes.formWrapper}>
                <div className={classes.fieldWrapper}>
                    <div className={classes.formTitle}>
                        <Logo/>
                    </div>
                    <div className={classes.success}>
                        <h5>Registration completed</h5>
                        <p>Let's start</p>
                    </div>
                    <div className={classes.formFooter}>
                        <Button
                            onClick={() => navigate("/login")}
                            icon={<SuccessIcon/>}
                            iconPosition={'left'}
                            width={'100%'}
                            type={'btn'}
                            variant={'filled'}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div> :
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(submitHandler)} className={classes.formWrapper}>
                    <div className={classes.fieldWrapper}>
                        <div className={classes.formTitle}>
                            <Logo/>

                        </div>
                        <Input
                            type={'text'}
                            label={'first name'}
                            placeholder={'Mario'}
                            touched={touchedFields[SIGNUP_MODEL.firstName]}
                            errors={errors[SIGNUP_MODEL.firstName]}
                            {...register(SIGNUP_MODEL.firstName)}
                        />
                        <Input
                            type={'text'}
                            label={'last name'}
                            placeholder={'Rossi'}
                            touched={touchedFields[SIGNUP_MODEL.lastName]}
                            errors={errors[SIGNUP_MODEL.lastName]}
                            {...register(SIGNUP_MODEL.lastName)}
                        />
                        <Input
                            type={'text'}
                            label={'Email'}
                            placeholder={'mario.rossi@example.com'}
                            touched={touchedFields[SIGNUP_MODEL.email]}
                            errors={errors[SIGNUP_MODEL.email]}
                            {...register(SIGNUP_MODEL.email)}
                        />
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            label={'Password'}
                            touched={touchedFields[SIGNUP_MODEL.password]}
                            errors={errors[SIGNUP_MODEL.password]}
                            {...register(SIGNUP_MODEL.password)}
                            statusIcon={showPassword ? <EyeOnIcon/> : <EyeOffIcon/>}
                            statusIconCallback={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    <div className={classes.formFooter}>
                        <Button
                            icon={<SuccessIcon/>}
                            iconPosition={'left'}
                            disabled={isSubmitting}
                            width={'100%'}
                            type={'submit'}
                            variant={'filled'}
                        >
                            sign up
                        </Button>
                        already have todos account? <Link to={ROUTE_LOGIN}>login</Link>
                    </div>
                </form>
            </FormProvider>
        }
    </>
}

export default Signup;