import {
    Button,
    Card, CardContent,
    CardHeader, Divider, Grid,
    InputAdornment,
    SvgIcon, TextField, Typography
} from "@material-ui/core";
import React, {Fragment, useState} from "react";
import {BubbleChart, Face} from "@material-ui/icons";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/store/AppState";
import {AuthInfo} from "../../../redux/reducers/AuthReducer";
import {addAGroup} from "../../../redux/actions/todoGroupsAction";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputBox: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            textAlign: 'center',
            padding: '6px',
        }, card: {
            height: '95%',
            backgroundColor: 'white'
        }
    }),
);


const TodoGroupAdd = () => {
    const authInfo: AuthInfo = useSelector((state: AppState) => state.auth);
    const userName = authInfo.userInfo.profile.username;
    const classes = useStyles();
    const dispatch = useDispatch();

    const [newTodoGroupName, setNewTodoGroupName] = useState('');

    return (
        <Fragment>
            <Card className={classes.card}>
                <CardHeader
                    title={
                        <Typography align="center" variant="h4">
                            New TodoGroup
                        </Typography>
                    }
                />
                <Divider/>
                <CardContent>
                    <Grid container>
                        <div className={classes.inputBox}>
                            <Grid container spacing={1}>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <div>
                                        <TextField required label="GroupName" fullWidth InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SvgIcon fontSize="small" color="action"><BubbleChart/>
                                                    </SvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                                   onChange={(event) => {
                                                       setNewTodoGroupName(event.target.value);
                                                   }}
                                                   placeholder="Please input group name"
                                                   variant="outlined"
                                                   value={newTodoGroupName}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <div>
                                        <TextField label="Owner" fullWidth InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SvgIcon fontSize="small" color="action"><Face/>
                                                    </SvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                                   disabled
                                                   placeholder={userName}
                                                   variant="outlined"
                                                   value={userName}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xl={12} lg={12} sm={12} xs={12}>
                                    <div style={{float: 'right'}}>
                                        <Button variant="contained" color="primary" type="submit"
                                                value="Submit"
                                                onClick={() => {
                                                    addAGroup(newTodoGroupName, dispatch).then();
                                                }}
                                                style={{
                                                    textTransform: 'none',
                                                    float: 'left',
                                                }}>Add New</Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </CardContent>
            </Card>
        </Fragment>
    )
}
export default TodoGroupAdd;