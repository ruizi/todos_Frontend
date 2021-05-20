import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import React from "react";
import {Grid, SwipeableDrawer,} from "@material-ui/core";
import {TodoGroup} from "../../../redux/reducers/TodoReducer";
import TodoGroupList from "./TodoGroupList";
import TodoGroupDetails from "./TodoGroupDetails";
import TodoGroupAdd from "./TodoGroupAdd";

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
            height: '90vh',
        }
    }),
);

const TodoGroupsManage = () => {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [todoGroupDetail, setTodoGroupDetail] = React.useState({});
    const classes = useStyles();


    const toggleTodoGroupDetailDrawer = (open: boolean, _todoGroupDetail?: TodoGroup) => {
        setOpenDrawer(open)
        if (_todoGroupDetail !== undefined) {
            setTodoGroupDetail(_todoGroupDetail)
        }

    };

    const showGroupDetails = () => (
        <div className={classes.list} role="presentation">
            <div className={classes.paddingBox}/>
            <div className={classes.itemDetailBox}>
                <TodoGroupDetails todoGroupDetail={todoGroupDetail} toggleTodoGroupDetailDrawer={toggleTodoGroupDetailDrawer}/>
            </div>

        </div>
    );


    return (
        <div>
            <div className={classes.pageContent}>
                <div className={classes.mainComponent}>
                    <div className={classes.leftPart}>
                        <Grid container spacing={2}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <div className={classes.cards}>
                                    <TodoGroupList toggleTodoGroupDetailDrawer={toggleTodoGroupDetailDrawer}/>
                                </div>
                            </Grid>

                        </Grid>
                    </div>
                    <div className={classes.rightPart}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <div>
                                    {/*<AddNewTodoItemModule groupName={groupName}/>*/}
                                    <TodoGroupAdd/>
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
                    onClose={() => toggleTodoGroupDetailDrawer(false)}
                    onOpen={() => toggleTodoGroupDetailDrawer(true)}
                >
                    {showGroupDetails()}
                </SwipeableDrawer>
            </div>
        </div>

    )
}
export default TodoGroupsManage;