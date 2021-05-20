import React, {Fragment} from "react";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {
    Card,
    CardHeader, Checkbox,
    Divider,
    IconButton,
    Typography
} from "@material-ui/core";

import {useDispatch, useSelector} from "react-redux";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {AppState} from "../../../redux/store/AppState";
import {TodoGroup} from "../../../redux/reducers/TodoReducer";
import {deleteAGroup} from "../../../redux/actions/todoGroupsAction";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            height: '95%',
            backgroundColor: 'white'
        }, list: {
            paddingBottom: '0px',
            paddingTop: '0px',
            overflow: 'auto',
            maxHeight: '100%',
        }
    }),
);


const TodoGroupList = ({toggleTodoGroupDetailDrawer}: any) => {
    const classes = useStyles();
    const {todoGroups} = useSelector((state: AppState) => state.todo);

    const dispatch = useDispatch();

    return (
        <Fragment>
            <Card className={classes.card}>
                <CardHeader
                    title={
                        <Typography align="center" variant="h3">
                            TodoGroups
                        </Typography>
                    }
                    // action={
                    //     <div>
                    //         <IconButton color="secondary" onClick={() => {
                    //         }} aria-label="clear">
                    //             <DeleteSweepIcon/>
                    //         </IconButton>
                    //     </div>
                    //
                    // }
                />
                <Divider/>
                {todoGroups.length !== 0 && (
                    <List className={classes.list}>
                        {todoGroups.map((todoGroup: TodoGroup, index: number) => {
                            return (
                                <ListItem divider={index < todoGroups.length} key={todoGroups._id} button
                                          onClick={() => {
                                              toggleTodoGroupDetailDrawer(true, todoGroup)
                                          }}>
                                    <ListItemAvatar>
                                        <Avatar>{index + 1}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={todoGroup.groupName}
                                        secondary={`Contains ${todoGroup.todoList.length} todoItems`}
                                    />
                                    <ListItemSecondaryAction>
                                        <Button variant="contained" color="secondary" style={{textTransform: 'none'}}
                                                onClick={() => deleteAGroup(todoGroup, dispatch)}>
                                            Remove
                                        </Button>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </List>)}
            </Card>
        </Fragment>
    )
}
export default TodoGroupList;