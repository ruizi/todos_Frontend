import {TodoGroup} from "../reducers/TodoReducer";
import {myAction} from "../../utils/actionType";
import {Dispatch} from "redux";
import axios from "axios";
import {DELETE_A_GROUP, TODO_ADD_SUCCESS, TODO_GROUP_ADD_ERROR, TODO_GROUP_ADD_SUCCESS} from "./types";
import {sendDateAxisConfig} from "../../utils/setHttpReqHeader";
import {loadTodos} from "./todoItemAction";

export const deleteAGroup = async (todoGroup: TodoGroup, dispatch: Dispatch<myAction>) => {
    try {
        const res = await axios.delete('/api/group/' + todoGroup._id)
        console.log(res)
        dispatch({
            type: DELETE_A_GROUP,
            payload: todoGroup
        })
    } catch (error) {
        console.log(error);
    }
}

export const addAGroup = async (groupName: string, dispatch: Dispatch<myAction>) => {
    try {
        const reqBodyContent = JSON.stringify({groupName})
        console.log(reqBodyContent)
        const response = await axios.post('/api/group', reqBodyContent, sendDateAxisConfig())
        console.log(response)
        dispatch({
            type: TODO_GROUP_ADD_SUCCESS,
            payload: response.data
        })
        await loadTodos(dispatch)
    } catch (error) {
        console.log(error);
        dispatch({
            type: TODO_GROUP_ADD_ERROR,
            payload: null
        })
    }
}