import './App.css';
import React from 'react';
import DashboardLayout from "./components/layout/DashboardLayout";
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";
import {BrowserRouter, useRoutes} from 'react-router-dom';
import routes from './routes';

const App = () => {
    const routingPath = useRoutes(routes);
    return (
        <Provider store={configureStore()}>
            {routingPath}
        </Provider>
    );
}

export default App;
