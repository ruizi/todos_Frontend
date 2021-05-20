import {useSelector} from "react-redux";
import {AppState} from "../../redux/store/AppState";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {NavLink as RouterLink} from 'react-router-dom';
import image from "../../assets/imgs/landingBackground.jpeg";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        landingSection: {
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
            height: '100%',
        },
        inner: {
            color: '#fff',
            height: '100%',
            width: '100%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
        },
        title: {
            fontSize: '4rem',
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '1rem',
        },
        subTitle: {
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: 'white',
        },
        buttons: {
            '& > *': {
                margin: theme.spacing(1),
            },

        }
    }),
);


const WelcomePage = () => {
    const classes = useStyles();
    return (
        <section className={classes.landingSection}>
            <div className={classes.mainContent}>
                <div className={classes.inner}>
                    <h1 className={classes.title}>Welcome to Todos</h1>
                    <p className={classes.subTitle}>
                        Let's start managing our daily routine with this fully new way!
                    </p>
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={RouterLink} to="/register">
                            Sign Up
                        </Button>
                        <Button variant="contained" color="primary" component={RouterLink} to="/login">
                            Sign In
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WelcomePage;