import React, {
    createContext,
    useCallback,
    useEffect,
    useReducer,
    useState,
} from 'react'
import LocalStorageManager from '../utilities/local-storage-manager'
import {LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_REFRESH_TOKEN} from "../utilities/constants";

export const UserContext = createContext({})

const SET_USER_ACTION = 'SET_USER'
const SET_ACCESS_TOKEN_ACTION = 'SET_ACCESS_TOKEN'
const SET_REFRESH_TOKEN_ACTION = 'SET_REFRESH_TOKEN'
const RESET_USER_ACTION = 'RESET_USER'
const UPDATE_USER_ACTION = 'UPDATE_USER'
const RESET_ACCESS_TOKEN_ACTION = 'RESET_ACCESS_TOKEN'

const authReducer = (state, action) => {
    switch (action.type) {
        case SET_USER_ACTION:
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
            }
        case UPDATE_USER_ACTION:
            return {
                ...state,
                user: action.payload,
            }
        case SET_ACCESS_TOKEN_ACTION:
            return {
                ...state,
                accessToken: action.payload,
            }
        case RESET_ACCESS_TOKEN_ACTION:
            return {
                ...state,
                accessToken: null,
            }
        case SET_REFRESH_TOKEN_ACTION:
            return {
                ...state,
                refreshToken: action.payload,
            }
        case RESET_USER_ACTION:
            return {
                user: null,
                accessToken: null,
                refreshToken: null,
            }
        default:
            return state
    }
}

const authInitialState = {
    user: LocalStorageManager.user.get(),
    accessToken: LocalStorageManager.accessToken.get(),
    refreshToken: LocalStorageManager.refreshToken.get(),
}

const UserProvider = ({ children }) => {
    const [auth, dispatch] = useReducer(authReducer, authInitialState)

    const createUser = useCallback(payload => {
        dispatch({ type: SET_USER_ACTION, payload })
    }, [])

    const updateUser = useCallback(payload => {
        dispatch({ type: UPDATE_USER_ACTION, payload })
    }, [])

    const resetUser = useCallback(() => {
        dispatch({ type: RESET_USER_ACTION })
    }, [])

    const resetAccessToken = useCallback(() => {
        dispatch({ type: RESET_ACCESS_TOKEN_ACTION })
    }, [])

    const setAccessToken = useCallback(payload => {
        dispatch({ type: SET_ACCESS_TOKEN_ACTION, payload })
    }, [])

    const setRefreshToken = useCallback(payload => {
        dispatch({ type: SET_REFRESH_TOKEN_ACTION })
    }, [])


    const [value, setValue] = useState({
        ...auth,
        updateUser,
        resetUser,
        createUser,
        resetAccessToken,
        setAccessToken,
        setRefreshToken
    })

    useEffect(() => {
        const authResetLS = e => {
            switch(e.key){
                case LOCAL_STORAGE_ACCESS_TOKEN:
                    if(e.newValue === null){
                        resetAccessToken()
                    }
                    setAccessToken(e.newValue)
                    break
                case LOCAL_STORAGE_REFRESH_TOKEN:
                    setRefreshToken(e.newValue)
                    break
            }
        }
        window.addEventListener('storage', authResetLS)
        return () => {
            window.removeEventListener('storage', authResetLS)
        }
    }, [])


    useEffect(() => {
        setValue(prev => ({ ...prev, ...auth }))
    }, [auth])

    useEffect(() => {
        if (value.user) {
            LocalStorageManager.user.set(value.user)
        } else {
            LocalStorageManager.user.remove()
        }
    }, [value.user])

    useEffect(() => {
        if (value.accessToken) {
            LocalStorageManager.accessToken.set(value.accessToken)
        } else {
            LocalStorageManager.accessToken.remove()
        }
    }, [value.accessToken])

    useEffect(() => {
        if (value.refreshToken) {
            LocalStorageManager.refreshToken.set(value.refreshToken)
        } else {
            LocalStorageManager.refreshToken.remove()
        }
    }, [value.refreshToken])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
