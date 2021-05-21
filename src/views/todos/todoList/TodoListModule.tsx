import React, {Fragment} from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {
    Card,
    CardHeader, Checkbox,
    Divider,
    Typography
} from "@material-ui/core";
import {showDetails, TodoItem, updateATodoItem} from "../../../redux/actions/todoItemAction";
import {useDispatch} from "react-redux";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            height: '90vh',
            backgroundColor: 'white'
        }, list: {
            paddingBottom: '0px',
            paddingTop: '0px',
            overflow: 'auto',
            maxHeight: '90%',
        }
    }),
);


const TodoListModule = ({todoGroup, toggleDrawer}: any) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([-1]);
    let todoList: Array<TodoItem> = [];
    const dispatch = useDispatch();

    if (todoGroup) {
        todoList = todoGroup[0].todoList;
    }

    const handleToggle = async (todoItem: TodoItem, value: number) => {
        // const currentIndex = value;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        todoItem.isFinished = !todoItem.isFinished;
        await updateATodoItem(todoItem, dispatch)
    };


    return (
        <Fragment>
            <Card className={classes.card}>
                <CardHeader
                    title={
                        <Typography align="center" variant="h3" style={{textTransform: 'capitalize'}}>
                            {todoGroup[0].groupName}
                        </Typography>
                    }
                />
                <Divider/>
                {todoList.length !== 0 && (
                    <List className={classes.list}>
                        {todoList.map((todoItem, index) => {
                            return (
                                <ListItem divider={index < todoList.length} key={todoItem._id}
                                          button
                                          onClick={() => {
                                              showDetails(todoItem, dispatch);
                                              toggleDrawer(true, todoItem);
                                          }}>

                                    <ListItemAvatar>
                                        <Avatar>{index + 1}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={todoItem.title}
                                        secondary={todoItem.subTitle ? todoItem.subTitle : '---'}
                                        style={todoItem.isFinished ? {textDecorationLine: 'line-through'} : {}}
                                    />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            edge="end"
                                            // onChange={handleToggle(todoItem._id, index)}
                                            onChange={() => {
                                                handleToggle(todoItem, index).then();
                                            }}
                                            checked={todoItem.isFinished}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </List>)}
            </Card>
        </Fragment>
    )
}
export default TodoListModule;