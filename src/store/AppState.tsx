import {combineReducers} from "redux";
import {AuthReducer} from "../reducers/authReducer";
// import the combineReducers func from redux to combine/integrate all reducers used in the application
export const rootReducer = combineReducers({
    auth: AuthReducer
})

export type AppState = ReturnType<typeof rootReducer>