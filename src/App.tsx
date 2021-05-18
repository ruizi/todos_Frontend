import './App.css';
import React, {useEffect} from 'react';
import DashboardLayout from "./components/layout/homepage/DashboardLayout";
import configureStore from "./store/configureStore";
import {Provider, useDispatch} from "react-redux";
import {BrowserRouter, useRoutes} from 'react-router-dom';
import routes from './components/routes/routes';
import store from "./store/configureStore";
import {theme} from "./theme/myTheme";
import {ThemeProvider} from "@material-ui/core/styles";
import {loadUser} from "./actions/authAction";
import {setHttpReqHeaderWithToken} from "./utils/setHttpReqHeader";

if (localStorage.token) {
    setHttpReqHeaderWithToken(localStorage.token);
}

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("aaa")
        if(localStorage.token){
            loadUser(dispatch).then();
        }
    }, []);

    const routingPath = useRoutes(routes);
    return (
        <ThemeProvider theme={theme}>
            {routingPath}
        </ThemeProvider>
    );
}

export default App;
