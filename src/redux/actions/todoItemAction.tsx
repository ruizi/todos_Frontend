import {Dispatch} from "redux";
import {myAction} from "../../utils/actionType";
import {
    AUTH_ERROR, TODO_ADD_ERROR, TODO_ADD_SUCCESS, TODO_DELETE_ERROR, TODO_DELETE_SUCCESS,
    TODO_INFO_LOADED,
    TODO_UPDATE_ERROR,
    TODO_UPDATE_SUCCESS,
    UPDATE_DETAILS,
} from "./types";
import axios from "axios";
import {sendDateAxisConfig, setHttpReqHeaderWithToken} from "../../utils/setHttpReqHeader";
import {AddMessage} from "./MessageAction";

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
        AddMessage(error.response.data.message, "error", dispatch);
        dispatch({
            type: AUTH_ERROR,
            payload: null
        })
    }
}

export const updateATodoItem = async (todoItem: TodoItem, dispatch: Dispatch<myAction>) => {
    try {
        const reqBodyContent = JSON.stringify(todoItem)
        const response = await axios.put("/api/todo/", reqBodyContent, sendDateAxisConfig())
        dispatch({
            type: TODO_UPDATE_SUCCESS,
            payload: response.data
        })
        AddMessage("Update a new item successfully", "success", dispatch);
    } catch (error) {
        AddMessage(error.response.data.message, "error", dispatch);
        dispatch({
            type: TODO_UPDATE_ERROR,
            payload: null
        })
    }
}

export const addATodoItem = async (newTodoItem: any, dispatch: Dispatch<myAction>) => {
    try {
        const reqBodyContent = JSON.stringify(newTodoItem)
        const response = await axios.post('/api/todo/', reqBodyContent, sendDateAxisConfig())
        dispatch({
            type: TODO_ADD_SUCCESS,
            payload: response.data
        })
        await loadTodos(dispatch)
        AddMessage("Add a new item successfully", "success", dispatch);
    } catch (error) {
        AddMessage(error.response.data.message, "error", dispatch);
        dispatch({
            type: TODO_ADD_ERROR,
            payload: null,
        })
    }
}

export const deleteATodoItem = async (todoItemId: string, dispatch: Dispatch<myAction>) => {
    try {
        const response = await axios.delete(`/api/todo/${todoItemId}`)
        dispatch({
            type: TODO_DELETE_SUCCESS,
            payload: response.data
        })
        await loadTodos(dispatch)
        AddMessage("Delete a new item successfully", "success", dispatch);
    } catch (error) {
        AddMessage(error.response.data.message, "error", dispatch);
        dispatch({
            type: TODO_DELETE_ERROR,
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
        AddMessage(error, "error", dispatch);
    }
}