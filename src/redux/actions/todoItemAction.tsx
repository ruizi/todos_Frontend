import {Dispatch} from "redux";
import {myAction} from "../../utils/actionType";
import {
    AUTH_ERROR, TODO_ADD_ERROR, TODO_ADD_SUCCESS,
    TODO_INFO_LOADED,
    TODO_UPDATE_ERROR,
    TODO_UPDATE_SUCCESS,
    UPDATE_DETAILS,
    USER_PROFILE_LOADED
} from "./types";
import axios from "axios";
import {sendDateAxisConfig, setHttpReqHeaderWithToken} from "../../utils/setHttpReqHeader";

export interface TodoItem {
    _id: string,
    title: string,
    subTitle: string,
    isFinished: boolean,
    repeatCircle: string,
    creator: string,
    group: string,
    createAt: string,
    scheduleAt: string,
    description: string,
}

export const loadTodos = async (dispatch: Dispatch<myAction>) => {
    if (localStorage.token) {
        setHttpReqHeaderWithToken(localStorage.token);
    }
    try {
        const response = await axios.get("/api/group")
        let todoGroups = [];
        for (let todoGroup of response.data.todoGroups) {
            todoGroup = {...todoGroup, todoItemDetails: todoGroup.todoList[0]}
            todoGroups.push(todoGroup);
        }
        dispatch({
            type: TODO_INFO_LOADED,
            payload: {
                todoGroups: todoGroups,
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

export const updateATodoItem = async (todoItem: TodoItem, dispatch: Dispatch<myAction>) => {
    try {
        const reqBodyContent = JSON.stringify(todoItem)
        console.log(reqBodyContent)
        const response = await axios.put("/api/todo/", reqBodyContent, sendDateAxisConfig())
        console.log(response)
        dispatch({
            type: TODO_UPDATE_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: TODO_UPDATE_ERROR,
            payload: null
        })
    }
}

export const addATodoItem = async (newTodoItem: any, dispatch: Dispatch<myAction>) => {
    try {
        const reqBodyContent = JSON.stringify(newTodoItem)
        console.log(reqBodyContent)
        const response = await axios.post('/api/todo/todoItem', reqBodyContent, sendDateAxisConfig())
        console.log(response)
        dispatch({
            type: TODO_ADD_SUCCESS,
            payload: response.data
        })
        await loadTodos(dispatch)
    } catch (error) {
        console.log(error);
        dispatch({
            type: TODO_ADD_ERROR,
            payload: null,
        })
    }
}

export const showDetails = (todoItem: TodoItem, dispatch: Dispatch<myAction>) => {
    try {
        dispatch({
            type: UPDATE_DETAILS,
            payload: todoItem
        })
    } catch (error) {
        console.log(error)
    }
}