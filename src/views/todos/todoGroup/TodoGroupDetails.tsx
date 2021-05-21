import {
    Avatar, Button,
    Card, CardContent,
    CardHeader, Checkbox, Divider, Grid,
    IconButton, InputAdornment, ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText, SvgIcon, TextField, Typography
} from "@material-ui/core";
import React, {Fragment, useState} from "react";
import SearchIcon from '@material-ui/icons/Search';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import {showDetails} from "../../../redux/actions/todoItemAction";
import {TodoGroup} from "../../../redux/reducers/TodoReducer";
import {Link} from "react-router-dom";
import {BubbleChart, ChatRounded, Fingerprint} from "@material-ui/icons";
import {updateAGroup} from "../../../redux/actions/todoGroupsAction";
import {useDispatch} from "react-redux";


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
            minHeight: '100%',
            backgroundColor: 'white'
        }, list: {
            paddingBottom: '0px',
            paddingTop: '0px',
            overflow: 'auto',
            maxHeight: '100%',
        }
    }),
);


const TodoGroupDetails = ({todoGroupDetail, toggleTodoGroupDetailDrawer}: any) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [updatedTodoGroup, setUpdatedTodoGroup] = useState<TodoGroup>(todoGroupDetail);

    return (
        <Fragment>
            {updatedTodoGroup !== null && (
                <Card className={classes.card}>
                    <CardHeader
                        title={
                            <Typography align="center" variant="h4">
                                TodoGroup details
                            </Typography>
                        }
                        action={
                            <div>
                                <Button variant="contained" color="primary" type="submit"
                                        value="Submit"
                                        onClick={() => {
                                            updateAGroup(updatedTodoGroup, dispatch).then();
                                            toggleTodoGroupDetailDrawer(false);
                                        }}
                                        style={{
                                            textTransform: 'none',
                                            marginTop: "10px"
                                        }}>Update</Button>
                            </div>
                        }
                    />
                    <Divider/>
                    <CardContent>
                        <Grid container>
                            <div className={classes.inputBox}>
                                <Grid container spacing={1}>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <TextField required label="Group ID" fullWidth InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SvgIcon fontSize="small" color="action"><Fingerprint/>
                                                    </SvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                                   placeholder={updatedTodoGroup._id}
                                                   variant="outlined"
                                                   disabled
                                                   value={updatedTodoGroup._id}
                                        />
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <TextField required label="GroupName" fullWidth InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SvgIcon fontSize="small" color="action"><BubbleChart/>
                                                    </SvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                                   onChange={(event) => {
                                                       setUpdatedTodoGroup({
                                                           ...updatedTodoGroup,
                                                           groupName: event.target.value
                                                       })
                                                   }}
                                                   placeholder={updatedTodoGroup.groupName}
                                                   variant="outlined"
                                                   value={updatedTodoGroup.groupName}
                                        />
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        {updatedTodoGroup.todoList.length !== 0 && (
                                            <List className={classes.list}>
                                                {updatedTodoGroup.todoList.map((todoItem, index) => {
                                                    return (
                                                        <ListItem divider={index < updatedTodoGroup.todoList.length}
                                                                  key={todoItem._id}
                                                                  button
                                                                  component={Link}
                                                                  to={`/app/homepage/group/${updatedTodoGroup._id}`}>
                                                            <ListItemAvatar>
                                                                <Avatar>{index + 1}</Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={todoItem.title}
                                                                secondary={todoItem.subTitle}
                                                                style={todoItem.isFinished ? {textDecorationLine: 'line-through'} : {}}
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <Checkbox
                                                                    edge="end"
                                                                    disabled
                                                                    // onChange={handleToggle(todoItem._id, index)}
                                                                    checked={todoItem.isFinished}
                                                                />
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    )
                                                })}
                                            </List>
                                        )}
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </Fragment>
    )
}
export default TodoGroupDetails;