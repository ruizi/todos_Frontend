import {myAction} from "../../utils/actionType";
import {
    AUTH_ERROR,
    LOG_OUT,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_PROFILE_LOADED
} from "../actions/types";

export interface AuthInfo {
    token: string | null,
    isAuthed: boolean,
    loading: boolean,
    userInfo: {
        profile: {
            todoGroups: Array<any>,
            _id: string | undefined,
            email: string | undefined,
            username: string | undefined,
            avatar: string | undefined
        }
    },
}

const initialAuthState = {
    token: localStorage.getItem("token"),
    isAuthed: false,
    loading: true,
    userInfo: {
        profile: {
            todoGroups: [],
            _id: undefined,
            email: undefined,
            username: undefined,
            avatar: undefined
        }
    },
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
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                isAuthed: true,
                loading: false,
                userInfo: action.payload.userInfo
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
            }
        case LOG_OUT:
            localStorage.removeItem("token")
            return {
                ...state,
                token: null,
                isAuthed: false,
                loading: true,
                userInfo: {}
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        default:
            return {
                ...state,
            }
    }
}