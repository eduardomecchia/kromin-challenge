import React, { useCallback } from 'react'
import useAlert from './useAlert'

/**
 * Usage:
 *
 * const showError = useError()
 * showError('something wrong')
 *
 * */

const useError = () => {
    const { triggerAlert } = useAlert()

    return useCallback(errorMessage => {
        triggerAlert({ severity: 'error', title: errorMessage })
    }, [])
}

export default useError
