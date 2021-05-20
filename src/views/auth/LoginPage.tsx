import {Navigate,Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
    Box,
    Button,
    Card,
    CardContent,
    InputAdornment,
    SvgIcon,
    TextField,
    Typography,
    Grid,
    CardHeader, Divider
} from "@material-ui/core";
import image from "../../assets/imgs/landingBackground.jpeg";
import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
//import { Redirect } from "react-router-dom";

import {login} from '../../redux/actions/authAction';
import {AppState} from "../../redux/store/AppState";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loginSection: {
            position: 'relative',
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
            height: '100vh',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        mainContent: {
            //backgroundColor: 'white',
            width: '80%',
            height: '50%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
        },
        innerBox: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
        },
        inputCard: {
            height: '80%',
            //backgroundColor: 'transparent',
            opacity: 0.96,
        },
        cardContent: {
            width: '80%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        margin: {
            margin: theme.spacing(1),
            marginTop: '20px',
        },
        forgetAndRegister: {
            margin: theme.spacing(1),
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }
    }),
);

const LoginPage = () => {
    const {isAuthed} = useSelector((state: AppState) => state.auth);
    const classes = useStyles();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const dispatch = useDispatch();

    const submitInput = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log(userEmail, userPassword);
        await login(userEmail, userPassword, dispatch);
    }
    if (isAuthed) {
        return <Navigate to="/app/homepage"/>;
    }

    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>

            <section className={classes.loginSection}>
                <div className={classes.mainContent}>
                    <div className={classes.innerBox}>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <Card className={classes.inputCard}>
                                <form onSubmit={submitInput}>
                                    <CardHeader title={
                                        <Typography align="center" variant="h3">
                                            Welcome back!
                                        </Typography>
                                    }/>
                                    <Divider/>
                                    <CardContent className={classes.cardContent}>
                                        <TextField
                                            className={classes.margin}
                                            // id="input-with-icon-textfield"
                                            label="Email"
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AlternateEmailIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onChange={(event) => {
                                                setUserEmail(event.target.value)
                                            }}
                                            placeholder="Please input your username"
                                            value={userEmail}
                                        />
                                        <TextField
                                            className={classes.margin}
                                            label="Password"
                                            type='password'
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockRoundedIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onChange={(event) => {
                                                setUserPassword(event.target.value)
                                            }}
                                            placeholder="Please input your password"
                                            value={userPassword}
                                        />
                                        <div className={classes.margin}>
                                            <Button variant="contained" color="primary" style={{width: '100%'}}
                                                    type="submit"
                                                    value="Submit">
                                                Login In Now
                                            </Button>
                                        </div>
                                        <div className={classes.forgetAndRegister}>
                                            <Typography align="center" variant="h5">
                                                Don't have an account?&nbsp;
                                                <Link to="/register" color='primary'>
                                                    Sign up
                                                </Link>
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </form>
                            </Card>
                        </Grid>
                    </div>
                </div>
            </section>


        </div>
    );
}

export default LoginPage;