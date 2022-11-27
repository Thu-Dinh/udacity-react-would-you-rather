import {getInitialData} from "../utils/api";
import {recieveUsers} from "./users";
import {receiveQuestions} from "./questions";
import {setAuthedUser} from "./authedUser";
import {showLoading, hideLoading} from "react-redux-loading";

export const SET_REDIRECT_URL = 'SET_REDIRECT_URL'

export function setRedirectUrl (redirectUrl) {
    return {
        type: SET_REDIRECT_URL,
        redirectUrl,
    }
}

export function handleInitialData(authedUser) {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(recieveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(authedUser))
                dispatch(hideLoading())
            })
    }
}