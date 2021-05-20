import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {AppState} from "../../../redux/store/AppState";
import React from "react";
import {Grid, SwipeableDrawer,} from "@material-ui/core";
import TodoListModule from "./TodoListModule";
import AddNewTodoItemModule from "./AddNewTodoItemModule";
import {Navigate, useParams} from "react-router-dom";
import TodoItemDetailsModule from "./TodoItemDetailsModule";
import {TodoGroup} from "../../../redux/reducers/TodoReducer";
import {TodoItem} from "../../../redux/actions/todoItemAction";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pageContent: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
        }, mainComponent: {
            width: '85%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
        }, leftPart: {
            width: '100%',
            height: '90%',
            padding: theme.spacing(1),
        }, rightPart: {
            width: '100%',
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            padding: theme.spacing(1),
        },
        cards: {
            height: '95vh',
        },
        list: {
            width: 500,
        },
        paddingBox: {
            height: '64px',
            backgroundColor: 'black'
        },
        itemDetailBox: {
            padding: theme.spacing(1),
            height: '95vh',
        }
    }),
);

const TodoListLayout = ({groupName}: any | null) => {
    const {todoGroups} = useSelector((state: AppState) => state.todo);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [todoItemDetail, setTodoItemDetail] = React.useState({});
    const params = useParams();

    const classes = useStyles();

    if (groupName === null) {
        groupName = params;
    }

    const todoGroup = todoGroups.filter((todoGroup: TodoGroup) => {
        return todoGroup.groupName === groupName;
    })


    if (todoGroup === null) {
        return <Navigate to="/404"/>;
    }


    const toggleDrawer = (open: boolean, todoItem?: TodoItem) => {
        setOpenDrawer(open)
        if (todoItem !== undefined) {
            setTodoItemDetail(todoItem)
        }
    };

    const showDetails = () => (
        <div className={classes.list} role="presentation"
            //onClick={() => toggleDrawer(false)}
            //onKeyDown={() => toggleDrawer(false)}
        >
            <div className={classes.paddingBox}/>
            <div className={classes.itemDetailBox}>
                <TodoItemDetailsModule todoItemDetail={todoItemDetail} toggleDrawer={toggleDrawer}/>
            </div>
        </div>
    )


    return (
        <div>
            <div className={classes.pageContent}>
                <div className={classes.mainComponent}>
                    <div className={classes.leftPart}>
                        <Grid container spacing={2}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <div className={classes.cards}>
                                    <TodoListModule props={todoGroup[0]} groupName={groupName}
                                                    toggleDrawer={toggleDrawer}/>
                                </div>
                            </Grid>

                        </Grid>
                    </div>
                    <div className={classes.rightPart}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <div>
                                    <AddNewTodoItemModule todoGroup={todoGroup[0]}/>
                                </div>
                            </Grid>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <div>
                                    {/*<TodoItemDetailsModule todoGroup={todoGroup[0]}/>*/}
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                </div>
            </div>
            <div>
                <SwipeableDrawer
                    anchor='right'
                    open={openDrawer}
                    onClose={(event: React.KeyboardEvent | React.MouseEvent) => {
                        if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' ||
                            (event as React.KeyboardEvent).key === 'Shift')
                        ) {
                            return;
                        } else {
                            toggleDrawer(false)
                        }
                    }}
                    onOpen={() => toggleDrawer(true)}
                >
                    {showDetails()}
                </SwipeableDrawer>
            </div>
        </div>

    )
}
export default TodoListLayout;