import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'

const useUser = () => {
    const { user, accessToken, refreshToken, ...rest } = useContext(UserContext)

    return { user, accessToken, refreshToken, ...rest }
}

export default useUser
