import {
    Divider,
    Drawer,
    List,
    Avatar,
    Box,
    Hidden,
    Typography, ListItemIcon, ListItemText, ListItem
} from "@material-ui/core";
import React, {Fragment, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Link, Link as RouterLink, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    AlertCircle as AlertCircleIcon,
    Settings as SettingsIcon,
    User as UserIcon,
    Calendar as CalendarIcon,
    Command as CommandIcon,
    Database as DataBaseIcon,
    LogOut as LogOutIcon,
    Layers as LayersIcon
} from 'react-feather';
import {useEffect} from "react";
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import {theme} from "../../theme/myTheme";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/store/AppState";
import {AuthInfo} from "../../redux/reducers/AuthReducer";
import {logout} from "../../redux/actions/authAction";

const functionItems = [
    {
        href: '/app/homepage/group/add',
        icon: LayersIcon,
        title: 'Add Group +'
    }
]

const systemItems = [
    {
        href: '/app/homepage/user/account',
        icon: UserIcon,
        title: 'Account'
    },
    {
        href: '/app/homepage/user/settings',
        icon: SettingsIcon,
        title: 'Settings'
    },
    {
        href: '/logout',
        icon: LogOutIcon,
        title: 'Log out'
    },
    {
        href: '/app/homepage/help',
        icon: AlertCircleIcon,
        title: 'Help'
    }
]


const drawerWidth = 256;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            anchor: "left",
            variant: "temporary",
        },
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        drawBox: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        },
        profileBox: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            p: 2
        },
        Avatar: {
            cursor: 'pointer',
            width: 81,
            height: 81
        },
        toolbar: theme.mixins.toolbar,
        sideBarButtons: {},
        menuBox: {
            p: 2
        },
        paperProps: {
            width: 256,
            top: 64,
            height: 'calc(100% - 64px)'
        }
    }),
);


const SideBar = (props: any) => {
    const authInfo: AuthInfo = useSelector((state: AppState) => state.auth);
    const {todoGroups} = useSelector((state: AppState) => state.todo);
    const {isAuthed, userInfo} = authInfo;
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);

    console.log(todoGroups)

    const user = {
        avatar: 'https:' + userInfo.profile.avatar,
        jobTitle: 'Full-Stack Developer',
        name: userInfo.profile.username,
        //todoGroup: userInfo.profile.todoGroup
    };

    const todoGroupItems: Array<any> = [];

    if (todoGroups !== null) {
        for (const todoGroup of todoGroups) {
            let groupBtn = {
                href: '/app/homepage/group/' + todoGroup.groupName.toLowerCase(),
                icon: todoGroup.groupName === 'Today' ? CalendarIcon : (todoGroup.groupName === 'Important' ? CommandIcon : DataBaseIcon),
                title: todoGroup.groupName
            }
            todoGroupItems.push(groupBtn);
        }
    }

    const {onMobileClose, openMobile} = props;

    const authContent = (
        <Fragment>
            <Box className={classes.profileBox}>
                <Avatar className={classes.Avatar} src={user.avatar}/>
                <Typography variant="h5" color="textPrimary">{user.name}</Typography>
                <Typography color="textSecondary" variant="body2">{user.jobTitle}</Typography>
            </Box>
            <Divider/>
            <List className={classes.sideBarButtons}>
                {todoGroupItems.map((item) => (
                    <ListItem button key={item.title} component={Link} to={item.href}>
                        <ListItemIcon>{item.icon !== null ? <item.icon size="20"/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={item.title}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List className={classes.sideBarButtons}>
                {functionItems.map((item) => (
                    <ListItem button key={item.title} component={Link} to={item.href}>
                        <ListItemIcon>{item.icon !== null ? <item.icon size="20"/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={item.title}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {systemItems.map((item) => {
                    if (item.title === 'Log out') {
                        return (
                            <ListItem button key={item.title} onClick={() => logout(dispatch)}>
                                <ListItemIcon>{item.icon !== null ? <item.icon size="20"/> : <MailIcon/>}</ListItemIcon>
                                <ListItemText primary={item.title}/>
                            </ListItem>
                        )

                    } else {
                        return (
                            <ListItem button key={item.title} component={Link} to={item.href}>
                                <ListItemIcon>{item.icon !== null ? <item.icon size="20"/> : <MailIcon/>}</ListItemIcon>
                                <ListItemText primary={item.title}/>
                            </ListItem>
                        );
                    }

                })}
            </List>
        </Fragment>
    )

    const unAuthContent = (
        <Fragment>
            <List>
                {['Sign In', 'Sign Up', 'help'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </Fragment>
    )

    const content = (
        <div>
            <div className={classes.toolbar}/>
            <div style={{marginTop: '5px'}}>
                {isAuthed ? (
                    authContent
                ) : (
                    unAuthContent
                )}
            </div>
        </div>
    );


    return (
        <div>
            <Hidden mdUp implementation="css">
                <Drawer variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        onClose={onMobileClose}
                        open={openMobile}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    variant="permanent"
                    anchor='left'
                    open
                >
                    {content}
                </Drawer>
            </Hidden>
        </div>
    );
}

SideBar.protoType = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
}

SideBar.defaultProps = {
    onMobileClose: () => {
    },
    openMobile: false
};

export default SideBar;