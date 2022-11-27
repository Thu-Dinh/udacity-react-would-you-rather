import {SET_REDIRECT_URL} from "../actions/shared";

export default function setRedirectUrl(state = null, action) {
    switch (action.type) {
        case SET_REDIRECT_URL :
            return action.redirectUrl

        default:
            return state;
    }
}