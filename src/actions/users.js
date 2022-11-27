export const RECEIVE_USERS = 'RECEIVE_USERS'

export function recieveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}