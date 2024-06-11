export default (userResponse = {}) => {
    const user = userResponse.user ?? {}
    return ({
        ...user,
        // here the extra modelling
    })
}


