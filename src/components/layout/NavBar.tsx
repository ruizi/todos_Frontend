import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import {useSelector} from "react-redux";
import {AppState} from "../../store/AppState";
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import React, {Fragment, useState} from "react";
import {Badge, Button, Hidden, Icon, IconButton} from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';

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
        button: {
            color: "inherit",
            textTransform: 'none',
        }
    }),
);

const NavBar = (props: any) => {
    const {loading, isAuth} = useSelector((state: AppState) => state.auth);
    console.log(loading, isAuth)
    const [notifications] = useState([]);
    const classes = useStyles();

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
            <IconButton color="inherit">
                <InputIcon/>
            </IconButton>
        </Fragment>
    );

    const publicLinks = (
        <Fragment>
            <Button className={classes.button}>Register</Button>
            <Button className={classes.button}>Login</Button>
        </Fragment>
    )

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <Icon>
                    <TrackChangesIcon/>
                </Icon>

                <Typography variant="h3" className={classes.title}>
                    &nbsp; My Todos
                </Typography>

                <div style={{flexGrow: 1}}/>
                <Hidden smDown>


                    {isAuth ? privateLinks : publicLinks}


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