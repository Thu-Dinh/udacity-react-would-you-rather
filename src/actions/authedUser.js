export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const USER_LOGOUT = 'USER_LOGOUT'


export const setAuthedUser = (authedUser) => {
    return {
        type: SET_AUTHED_USER,
        authedUser,
    }
}

export const onLogout = () => {
    return {
        type: USER_LOGOUT,
    };
}
