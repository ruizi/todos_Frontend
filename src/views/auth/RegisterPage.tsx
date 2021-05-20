import {Navigate, Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
    Button,
    Card,
    CardContent,
    InputAdornment,
    TextField,
    Typography,
    Grid,
    CardHeader, Divider
} from "@material-ui/core";
import image from "../../assets/imgs/landingBackground.jpeg";
import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AccountCircle} from "@material-ui/icons";
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

import {register} from '../../redux/actions/authAction';
import {AppState} from "../../redux/store/AppState";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        registerSection: {
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
            height: '90%',
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

const RegisterPage = () => {
    const {isAuthed} = useSelector((state: AppState) => state.auth);
    const classes = useStyles();
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [registerStatus, setRegisterStatus] = useState(false);
    const dispatch = useDispatch();

    const submitInput = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        register(userEmail, userName, userPassword, dispatch).then(() => {
            setRegisterStatus(true);
        });
    }
    if (isAuthed) {
        return <Navigate to="/app/homepage"/>;
    }

    if(registerStatus){
        return <Navigate to="/login"/>;
    }

    return (
        <div>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>

            <section className={classes.registerSection}>
                <div className={classes.mainContent}>
                    <div className={classes.innerBox}>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <Card className={classes.inputCard}>
                                <form onSubmit={submitInput}>
                                    <CardHeader title={
                                        <Typography align="center" variant="h3">
                                            Create an Account
                                        </Typography>
                                    }/>
                                    <Divider/>
                                    <CardContent className={classes.cardContent}>
                                        <TextField
                                            className={classes.margin}
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
                                            placeholder="Please input your email address"
                                            value={userEmail}
                                        />
                                        <TextField
                                            className={classes.margin}
                                            label="Username"
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircle/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onChange={(event) => {
                                                setUserName(event.target.value)
                                            }}
                                            placeholder="Please input your username"
                                            value={userName}
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
                                                Register Now
                                            </Button>
                                        </div>
                                        <div className={classes.forgetAndRegister}>
                                            <Typography align="center" variant="h5">
                                                Already have an account?&nbsp;
                                                <Link to="/login" color='textPrimary'>
                                                    Sign In
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

export default RegisterPage;