import {useState} from "react";
import {Navigate, Outlet} from 'react-router-dom';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import {useSelector} from "react-redux";
import {AppState} from "../../../store/AppState";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        DashboardLayoutRoot: {
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            height: '100%',
            overflow: 'hidden',
            width: '100%'
        },
        DashboardLayoutWrapper: {
            display: 'flex',
            flex: '1 1 auto',
            overflow: 'hidden',
            paddingTop: 64,
            [theme.breakpoints.up('lg')]: {
                paddingLeft: 256
            }
        },
        DashboardLayoutContainer: {
            display: 'flex',
            flex: '1 1 auto',
            overflow: 'hidden'
        },
        DashboardLayoutContent: {
            flex: '1 1 auto',
            height: '100%',
            overflow: 'auto'
        },
    }),
);


const DashboardLayout = () => {
    const {isAuthed} = useSelector((state: AppState) => state.auth);
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);
    const classes = useStyles();

    if (!isAuthed) {
        console.log(isAuthed)
        return <Navigate to="/login"/>;
    }

    return (
        <div className={classes.DashboardLayoutRoot}>
            <NavBar onMobileNavOpen={() => setMobileNavOpen(true)}/>
            <SideBar
                onMobileClose={() => setMobileNavOpen(false)}
                openMobile={isMobileNavOpen}
            />
            {/*<div className={classes.DashboardLayoutWrapper}>*/}
            {/*    <div className={classes.DashboardLayoutContainer}>*/}
            {/*        <div className={classes.DashboardLayoutContent}>*/}
            {/*            <Outlet/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}
export default DashboardLayout;