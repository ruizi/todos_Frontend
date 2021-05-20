import {useState} from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import {Outlet} from "react-router-dom";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        LandingLayoutRoot: {
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            height: '100%',
            overflow: 'hidden',
            width: '100%',
            minWidth: '339px', padding: '0px'
        },
        LandingLayoutWrapper: {
            display: 'flex',
            flex: '1 1 auto',
            overflow: 'hidden',
            //paddingTop: 64,
        },
        LandingLayoutContainer: {
            display: 'flex',
            flex: '1 1 auto',
            overflow: 'hidden'
        },
        LandingLayoutContent: {
            flex: '1 1 auto',
            height: '100%',
            overflow: 'auto'
        },
    }),
);

const LandingPageLayout = () => {
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);
    const classes = useStyles();
    return (
        <div className={classes.LandingLayoutRoot}>
            <NavBar onMobileNavOpen={() => setMobileNavOpen(true)}/>
            <div className={classes.LandingLayoutWrapper}>
                <div className={classes.LandingLayoutContainer}>
                    <div className={classes.LandingLayoutContent}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LandingPageLayout;