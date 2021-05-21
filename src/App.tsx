import './App.css';
import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useRoutes} from 'react-router-dom';
import routes from './components/routes/routes';
import {theme} from "./theme/myTheme";
import {ThemeProvider} from "@material-ui/core/styles";
import {loadUser} from "./redux/actions/authAction";
import {setHttpReqHeaderWithToken} from "./utils/setHttpReqHeader";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Message from "./components/layout/Message";


if (localStorage.token) {
    setHttpReqHeaderWithToken(localStorage.token);
}

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.token) {
            loadUser(dispatch).then();
        }
    }, [dispatch]);

    const routingPath = useRoutes(routes);
    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Message/>
                {routingPath}
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}

export default App;
