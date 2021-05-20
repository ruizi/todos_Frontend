import {myAction} from "../../utils/actionType";
import {
    CLEAR_TODO,
    DELETE_A_GROUP, TODO_ADD_SUCCESS, TODO_GROUP_ADD_ERROR, TODO_GROUP_ADD_SUCCESS,
    TODO_INFO_LOADED,
    TODO_UPDATE_ERROR,
    TODO_UPDATE_SUCCESS,
    UPDATE_DETAILS
} from "../actions/types";
import {TodoItem} from "../actions/todoItemAction";


export interface TodoGroup {
    todoList: Array<TodoItem>,
    _id: string | undefined,
    owner: string | undefined,
    groupName: string | undefined,
    todoItemDetails: TodoItem | undefined,
}

export interface TodoGroups {
    todoGroups: Array<TodoGroup>,
}

const initialTodoGroupsState = {
    todoGroups: [],
}

export const TodoReducer = (state: TodoGroups = initialTodoGroupsState, action: myAction) => {
    switch (action.type) {
        case TODO_INFO_LOADED: {
            return {
                ...state,
                todoGroups: action.payload.todoGroups
            }
        }
        case TODO_UPDATE_SUCCESS: {
            const updatedTodoItem = action.payload.updatedTodoItem;
            const newTodoGroups = state.todoGroups.map((todoGroup, index) => {
                if (todoGroup._id !== updatedTodoItem.group) {
                    return todoGroup
                } else {
                    const newTodoList = todoGroup.todoList.map((todoItem, index) => {
                        if (todoItem._id !== updatedTodoItem._id) {
                            return todoItem
                        } else {
                            return updatedTodoItem
                        }
                    })
                    return {...todoGroup, todoList: newTodoList}
                }
            })
            return {
                ...state,
                todoGroups: newTodoGroups
            }
        }
        case CLEAR_TODO:
            return {
                ...state,
                todoGroups: [],
            }
        case UPDATE_DETAILS:
            return {
                ...state,
                todoItemDetails: action.payload,
            }
        case DELETE_A_GROUP:
            return {
                ...state,
                todoGroups: state.todoGroups.filter((todoGroup) => todoGroup !== action.payload)
            }
        case TODO_ADD_SUCCESS:
        case TODO_UPDATE_ERROR:
        case TODO_GROUP_ADD_SUCCESS:
        case TODO_GROUP_ADD_ERROR:
        default:
            return {
                ...state,
            }
    }
}