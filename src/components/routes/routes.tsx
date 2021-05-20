import DashboardLayout from "../layout/DashboardLayout";
import LandingPageLayout from "../layout/LandingPageLayout";
import WelcomePage from "../../views/auth/WelcomePage";
import LoginPage from "../../views/auth/LoginPage";
import RegisterPage from "../../views/auth/RegisterPage";
import {Navigate} from 'react-router-dom';

import TodoGroupsManage from "../../views/todos/todoGroup/TodoGroupsManage";
import UserAccount from "../../views/account/UserAccount";
import PageNotFound from "../../views/utilpages/PageNotFound";
import UserSettings from "../../views/account/UserSettings";
import HelpPage from "../../views/utilpages/HelpPage";
import TodoListLayout from "../../views/todos/todoList/TodoListLayout";

const routes = [
    {
        path: '/',
        element: <LandingPageLayout/>,
        children: [
            {path: '/', element: <WelcomePage/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'register', element: <RegisterPage/>},
            {path: '*', element: <PageNotFound/>}
        ]
    },
    {
        path: 'app',
        element: <DashboardLayout/>,
        children: [
            {path: '/homepage/', element: <TodoListLayout groupName={"Today"}/>},
            {path: '/homepage/group/today', element: <TodoListLayout groupName={"Today"}/>},
            {path: '/homepage/group/important', element: <TodoListLayout groupName={"Important"}/>},
            {path: "/homepage/group/:name", element: <TodoListLayout groupName={""}/>},
            {path: '/homepage/group/add', element: <TodoGroupsManage/>},
            {path: '/homepage/user/account', element: <UserAccount/>},
            {path: '/homepage/user/settings', element: <UserSettings/>},
            {path: '/homepage/help', element: <HelpPage/>},
            {path: '*', element: <Navigate to="/404"/>}
        ]
    }

]

export default routes;