import {combineReducers} from "redux";
import {AuthReducer} from "../reducers/AuthReducer";
import {TodoReducer} from "../reducers/TodoReducer";
import {MessageReducer} from "../reducers/MessageReducer";
// import the combineReducers func from redux to combine/integrate all reducers used in the application
export const rootReducer = combineReducers({
    auth: AuthReducer,
    todo: TodoReducer,
    messages: MessageReducer
})

export type AppState = ReturnType<typeof rootReducer>