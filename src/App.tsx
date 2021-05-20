import './App.css';
import React, {useEffect} from 'react';
import DashboardLayout from "./components/layout/DashboardLayout";
import configureStore from "./redux/store/configureStore";
import {Provider, useDispatch} from "react-redux";
import {BrowserRouter, useRoutes} from 'react-router-dom';
import routes from './components/routes/routes';
import store from "./redux/store/configureStore";
import {theme} from "./theme/myTheme";
import {ThemeProvider} from "@material-ui/core/styles";
import {loadUser} from "./redux/actions/authAction";
import {setHttpReqHeaderWithToken} from "./utils/setHttpReqHeader";
import {Container} from "@material-ui/core";
import {loadTodos} from "./redux/actions/todoItemAction";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

if (localStorage.token) {
    setHttpReqHeaderWithToken(localStorage.token);
}

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.token) {
            loadUser(dispatch).then();
        }
    }, []);

    const routingPath = useRoutes(routes);
    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {routingPath}
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}

export default App;
