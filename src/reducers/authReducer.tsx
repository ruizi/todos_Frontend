import {myAction} from "../utils/actionType";
import {AUTH_ERROR, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_PROFILE_LOADED} from "../actions/types";

export interface AuthInfo {
    token: string | null,
    isAuth: boolean,
    loading: boolean,
    userInfo: {},
}

const initialAuthState = {
    token: localStorage.getItem("token"),
    isAuth: false,
    loading: true,
    userInfo: {},
}


export const AuthReducer = (state: AuthInfo | null = initialAuthState, action: myAction) => {
    switch (action.type) {
        case USER_PROFILE_LOADED:
            return {
                ...state,
                isAuthed: true,
                loading: false,
                userInfo: action.payload.userInfo,
                token: action.payload.token
            }
        case AUTH_ERROR:
            return {
                ...state,
                isAuthed: false,
                loading: false,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                isAuthed: true,
                loading: false,
            }
        case REGISTER_SUCCESS:
        case REGISTER_FAIL:
        default:
            return {
                ...state,
            }
    }
}