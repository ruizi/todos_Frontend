import {TodoGroup} from "../reducers/TodoReducer";
import {myAction} from "../../utils/actionType";
import {Dispatch} from "redux";
import axios from "axios";
import {
    DELETE_A_GROUP,
    TODO_ADD_SUCCESS,
    TODO_GROUP_ADD_ERROR,
    TODO_GROUP_ADD_SUCCESS,
    TODO_GROUP_DELETE_ERROR, TODO_GROUP_DELETE_SUCCESS
} from "./types";
import {sendDateAxisConfig} from "../../utils/setHttpReqHeader";
import {loadTodos} from "./todoItemAction";
import {AddMessage} from "./MessageAction";

export const addAGroup = async (groupName: string, dispatch: Dispatch<myAction>) => {
    try {
        const reqBodyContent = JSON.stringify({groupName})
        const response = await axios.post('/api/group', reqBodyContent, sendDateAxisConfig())
        dispatch({
            type: TODO_GROUP_ADD_SUCCESS,
            payload: response.data
        })
        await loadTodos(dispatch)
        AddMessage("Add a new group successfully", "success", dispatch);
    } catch (error) {
        AddMessage(error.response.data.message, "error", dispatch);
        dispatch({
            type: TODO_GROUP_ADD_ERROR,
            payload: null
        })
    }
}

export const updateAGroup = async (updatedGroup: TodoGroup, dispatch: Dispatch<myAction>) => {
    try {
        const reqBodyContent = JSON.stringify(updatedGroup)
        const response = await axios.put('/api/group', reqBodyContent, sendDateAxisConfig())
        dispatch({
            type: TODO_GROUP_ADD_SUCCESS,
            payload: response.data
        })
        await loadTodos(dispatch)
        AddMessage("Add a new group successfully", "success", dispatch);
    } catch (error) {
        AddMessage(error.response.data.message, "error", dispatch);
        dispatch({
            type: TODO_GROUP_ADD_ERROR,
            payload: null
        })
    }
}

export const deleteAGroup = async (todoGroup: TodoGroup, dispatch: Dispatch<myAction>) => {
    try {
        await axios.delete('/api/group/' + todoGroup._id)
        dispatch({
            type: TODO_GROUP_DELETE_SUCCESS,
            payload: todoGroup
        })
        await loadTodos(dispatch)
        AddMessage("Delete a new group successfully", "success", dispatch);
    } catch (error) {
        AddMessage(error.response.data.message, "error", dispatch);
        dispatch({
            type: TODO_GROUP_DELETE_ERROR,
            payload: null
        })
    }
}
