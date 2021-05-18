import DashboardLayout from "../layout/homepage/DashboardLayout";
import LandingPageLayout from "../layout/landingpage/LandingPageLayout";
import WelcomePage from "../auth/WelcomePage";
import LoginPage from "../auth/LoginPage";
import RegisterPage from "../auth/RegisterPage";
import { Navigate } from 'react-router-dom';

const routes = [
    {
        path: '/',
        element: <LandingPageLayout/>,
        children: [
            {path: '/', element: <WelcomePage/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'register', element: <RegisterPage/>}
        ]
    },
    {
        path: 'app',
        element: <DashboardLayout/>,
        children: [
            {path: '/homepage', element: <WelcomePage/>},
            {path: '*', element: <Navigate to="/404"/>}
        ]
    }

]

export default routes;