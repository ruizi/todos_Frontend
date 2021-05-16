import {combineReducers} from "redux";
// import the combineReducers func from redux to combine/integrate all reducers used in the application
export const rootReducer = combineReducers({})

export type AppState = ReturnType<typeof rootReducer>