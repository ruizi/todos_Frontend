import {
    Divider,
    Drawer,
    List,
    Avatar,
    Box,
    Hidden,
    Typography, ListItemIcon, ListItemText, ListItem
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Link, Link as RouterLink, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    AlertCircle as AlertCircleIcon,
    BarChart as BarChartIcon,
    Settings as SettingsIcon,
    ShoppingBag as ShoppingBagIcon,
    User as UserIcon,
    Users as UsersIcon
} from 'react-feather';
import {useEffect} from "react";
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {theme} from "../../theme/myTheme";


const user = {
    avatar: 'https://www.gravatar.com/avatar/bedec6b05b6a464242c0520c19e2875d?s=200&r=pg&d=mm',
    jobTitle: 'Full-Stack Developer',
    name: 'Rui Cai'
};

const items = [
    {
        href: '/app/dashboard',
        icon: BarChartIcon,
        title: 'Today'
    },
    {
        href: '/app/customers',
        icon: UsersIcon,
        title: 'Important'
    },
    {
        href: '/app/products',
        icon: ShoppingBagIcon,
        title: 'Testing'
    },
    {
        href: '/app/account',
        icon: UserIcon,
        title: 'Account'
    },
    {
        href: '/app/settings',
        icon: SettingsIcon,
        title: 'Settings'
    },
    {
        href: '/404',
        icon: AlertCircleIcon,
        title: 'Error'
    }
];


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
    const classes = useStyles();
    const location = useLocation();
    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);

    const {onMobileClose, openMobile} = props;

    const content = (
        <div>
            <div className={classes.toolbar}/>
            <Box className={classes.profileBox}>
                <Avatar className={classes.Avatar} src={user.avatar}/>
                <Typography variant="h5" color="textPrimary">{user.name}</Typography>
                <Typography color="textSecondary" variant="body2">{user.jobTitle}</Typography>
            </Box>
            <Divider/>
            <List>
                {items.map((item) => (
                    <ListItem button key={item.title} component={Link} to={item.href}>
                        <ListItemIcon>{item.icon !== null ? <item.icon size="20"/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={item.title}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );


    return (
        <div>
            <nav className={classes.drawer} aria-label="mailbox folders">
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
            </nav>
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