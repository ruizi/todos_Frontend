import axios from "axios";
import {Dispatch} from "redux";
import {setHttpReqHeaderWithToken, sendDateAxisConfig} from "../utils/setHttpReqHeader";
import {
    AUTH_ERROR,
    USER_PROFILE_LOADED,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOG_OUT
} from './types';
import {myAction} from "../utils/actionType";


//loading user based on the token from localStorage
export const loadUser = async (dispatch: Dispatch<myAction>) => {
    if (localStorage.token) {
        setHttpReqHeaderWithToken(localStorage.token);
    }

    try {
        const response = await axios.get("/api/user/profile")
        dispatch({
            type: USER_PROFILE_LOADED,
            payload: {
                userInfo: response.data,
                token: localStorage.token
            }
        })
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
        const response = await axios.post('/api/user/register', reqBodyContent, sendDateAxisConfig());
        console.log(response);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data,
        })
        //Todo sending out messages
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors)
        // Todo sending out message
        // if (errors) {
        //     errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        // }
        dispatch({
            type: REGISTER_FAIL,
            payload: errors,
        })
    }
}

//user login action func
export const login = async (email: string, password: string, dispatch: Dispatch<myAction>) => {
    try {
        const reqBodyContent = JSON.stringify({email, password});
        const responseForToken = await axios.post("/api/auth/", reqBodyContent, sendDateAxisConfig())
        //await loadUser(dispatch);
        console.log(responseForToken.data)
        setHttpReqHeaderWithToken(responseForToken.data.token);
        const responseForProfile = await axios.get("/api/user/profile")

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                'token': responseForToken.data.token,
                'userInfo': responseForProfile.data
            },
        })
        // dispatch({
        //     type:
        // })
    } catch (error) {
        console.log(error)
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
        type: LOG_OUT,
        payload: null,
    })
}