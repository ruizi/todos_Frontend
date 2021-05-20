import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/store/AppState";
import {Link, NavLink as RouterLink} from "react-router-dom";
import PropTypes from 'prop-types';
import React, {Fragment, useState} from "react";
import {Badge, Button, Hidden, IconButton} from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import {logout} from "../../redux/actions/authAction";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
            display: "flex",
            // [theme.breakpoints.down("md")]: {
            //     display: "flex",
            //     color: 'red'
            // }
        },
        appBar: {
            backgroundColor: 'black',
            boxShadow: "none",
            position: 'absolute',
            width: '100%',
            paddingTop: "0px",
            display: "block",
            zIndex: theme.zIndex.drawer + 1,
        },
        toolBar:{
            paddingLeft: "5px",
        },
        button: {
            color: "inherit",
            textTransform: 'none',
        }
    }),
);

const NavBar = (props: any) => {
    const {loading, isAuthed} = useSelector((state: AppState) => state.auth);
    const [notifications] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();

    const privateLinks = (
        <Fragment>
            <IconButton color="inherit">
                <Badge
                    badgeContent={notifications.length}
                    color="primary"
                    variant="dot"
                >
                    <NotificationsIcon/>
                </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => {
                logout(dispatch)
            }}>
                <InputIcon/>
            </IconButton>
        </Fragment>
    );

    const publicLinks = (
        <Fragment>
            <Button component={RouterLink} className={classes.button} to="/register"><Typography
                variant="h5">Sign Up</Typography></Button>
            <Button component={RouterLink} className={classes.button} to="/login"><Typography
                variant="h5">Sign In</Typography></Button>
        </Fragment>
    )

    return (
        <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                {/*<Icon >*/}
                {/*    <TrackChangesIcon/>*/}
                {/*</Icon>*/}
                <IconButton component={Link} to="/" color="inherit">
                    <TrackChangesIcon/>
                </IconButton>


                <Typography variant="h3" className={classes.title}>
                    &nbsp;&nbsp; My Todos
                </Typography>


                <div style={{flexGrow: 1}}/>
                <Hidden smDown>
                    {isAuthed ? privateLinks : publicLinks}
                </Hidden>
                <Hidden mdUp>
                    <IconButton
                        color="inherit"
                        onClick={props.onMobileNavOpen}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    )
}

NavBar.propTypes = {
    onMobileNavOpen: PropTypes.func
};

export default NavBar;