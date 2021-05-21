import axios from "axios";
import {Dispatch} from "redux";
import {setHttpReqHeaderWithToken, sendDateAxisConfig} from "../../utils/setHttpReqHeader";
import {
    AUTH_ERROR,
    USER_PROFILE_LOADED,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOG_OUT, CLEAR_TODO
} from './types';
import {myAction} from "../../utils/actionType";
import {loadTodos} from "./todoItemAction";
import {AddMessage} from "./MessageAction";


//loading user based on the token from localStorage
export const loadUser = async (dispatch: Dispatch<myAction>) => {
    if (localStorage.token) {
        setHttpReqHeaderWithToken(localStorage.token);
    }

    try {
        const response = await axios.get("/api/user")
        dispatch({
            type: USER_PROFILE_LOADED,
            payload: {
                userInfo: response.data,
                token: localStorage.token
            }
        })
        loadTodos(dispatch).then();
    } catch (error) {
        console.log(error)
        dispatch({
            type: AUTH_ERROR,
            payload: null
        })
    }
}

//user register action func
export const register = async (email: string, username: string, password: string, dispatch: Dispatch<myAction>) => {
    try {
        const reqBodyContent = JSON.stringify({email, username, password});
        const response = await axios.post('/api/user', reqBodyContent, sendDateAxisConfig());
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data,
        })
        AddMessage("Sign up successfully", "success", dispatch);
    } catch (error) {
        AddMessage("Please check your input!", "info", dispatch);
        AddMessage(error.response.data.message, "error", dispatch);
        dispatch({
            type: REGISTER_FAIL,
            payload: error,
        })
    }
}

//user login action func
export const login = async (email: string, password: string, dispatch: Dispatch<myAction>) => {
    try {
        const reqBodyContent = JSON.stringify({email, password});
        const responseForToken = await axios.post("/api/auth/", reqBodyContent, sendDateAxisConfig())
        //await loadUser(dispatch);
        setHttpReqHeaderWithToken(responseForToken.data.token);
        const responseForProfile = await axios.get("/api/user")
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                'token': responseForToken.data.token,
                'userInfo': responseForProfile.data
            },
        })
        await loadTodos(dispatch);
        AddMessage("Welcome Back!", "success", dispatch);
    } catch (error) {
        AddMessage("Please check your input!", "info", dispatch);
        AddMessage(error, "error", dispatch);
        dispatch({
            type: LOGIN_ERROR,
            payload: {
                status: error.response.status,
                msg: error.response.statusText
            }
        })
    }
}

export const logout = (dispatch: Dispatch<myAction>) => {
    dispatch({
        type: CLEAR_TODO,
        payload: null,
    })
    dispatch({
        type: LOG_OUT,
        payload: null,
    })
}