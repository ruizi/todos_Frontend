import {createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {rootReducer} from "./AppState";

const initialState = {}

//create the state store to fix the usage of redux.
//rootReducer is the combination of all reducer in this application
//we need to set up an initial/startup state for the application
//And the devtools is a connector for the browser's dev tools
const configureStore = () => {
    return createStore(rootReducer, initialState, composeWithDevTools());
}

export default configureStore;