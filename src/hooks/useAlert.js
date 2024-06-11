import React, { useContext } from 'react'
import { AlertContext } from '../context/AlertProvider'

/**
 * Usage:
 *
 ***** In layout:
 *
 * const { isAlertOpen, alertData, closeAlert, triggerAlert } = useAlert()
 *
 * <Snackbar open={isAlertOpen}>
 *     <Alert onClose={closeAlert}>
 *         {children}
 *     </Alert>
 * </Snackbar>
 *
 ***** In component:
 *
 * triggerAlert({ title: 'good news' })
 *
 *
 *
 * */

const useAlert = () => {
    return useContext(AlertContext)
}

export default useAlert
