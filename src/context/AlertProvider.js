import React, { createContext, useCallback, useEffect, useReducer } from 'react'

export const AlertContext = createContext(null)

const SET_ALERT_DATA_ACTION = 'SET_ALERT_DATA'
const SET_VISIBILITY_ACTION = 'SET_VISIBILITY'
const RESET_ALERT_ACTION = 'RESET_ALERT'
const TRIGGER_ALERT_ACTION = 'TRIGGER_ALERT'

const alertReducer = (state, action) => {
    switch (action.type) {
        case SET_ALERT_DATA_ACTION:
            return {
                ...state,
                data: action.payload.data, // data: { severity: 'success', title: 'my title', description: 'my desc'}
            }
        case SET_VISIBILITY_ACTION:
            return {
                ...state,
                isOpen: action.payload.isOpen,
            }
        case RESET_ALERT_ACTION:
            return {
                ...state,
                isOpen: false,
                data: {},
            }
        case TRIGGER_ALERT_ACTION:
            return {
                ...state,
                isOpen: true,
                data: action.payload,
            }
        default:
            return state
    }
}

const AlertProvider = ({ children }) => {
    const initialState = {
        isOpen: false,
        data: {},
    }
    const [alert, dispatch] = useReducer(alertReducer, initialState)

    const closeAlert = useCallback(() => {
        dispatch({ type: SET_VISIBILITY_ACTION, payload: { isOpen: false } })
    }, [])

    const showAlert = useCallback(() => {
        dispatch({ type: SET_VISIBILITY_ACTION, payload: { isOpen: true } })
    }, [])

    const setAlertData = useCallback(payload => {
        dispatch({ type: SET_ALERT_DATA_ACTION, payload })
    }, [])

    const triggerAlert = useCallback(payload => {
        dispatch({ type: TRIGGER_ALERT_ACTION, payload })
    }, [])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            closeAlert()
        }, 5000)
        return () => {
            clearTimeout(timeoutId)
        }
    }, [alert.isOpen])

    return (
        <AlertContext.Provider
            value={{
                dispatchAlert: dispatch,
                isAlertOpen: alert.isOpen,
                alertData: alert.data,
                closeAlert,
                showAlert,
                setAlertData,
                triggerAlert,
            }}
        >
            {children}
        </AlertContext.Provider>
    )
}

export default AlertProvider
