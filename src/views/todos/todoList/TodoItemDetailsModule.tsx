import {
    Button,
    Card, CardContent,
    CardHeader, Divider, Grid,
    InputAdornment,
    SvgIcon, TextField, Typography
} from "@material-ui/core";
import React, {Fragment, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {deleteATodoItem, TodoItem, updateATodoItem} from "../../../redux/actions/todoItemAction";
import {KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers";
import {ShortText, Title} from "@material-ui/icons";

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
        }, btnGroup: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }
    }),
);


const TodoItemDetailsModule = ({todoItemDetail, toggleDrawer}: any) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(todoItemDetail.scheduleAt));
    const [updateTodoItem, setUpdateTodoItem] = useState<TodoItem>(todoItemDetail)

    const buildOptions = () => {
        const arr = [];
        const repeatOptions = ['---', 'Once', 'Every day', 'Every week', 'Every month'];
        for (const repeatOption of repeatOptions) {
            arr.push(<option key={repeatOption} value={repeatOption}>{repeatOption}</option>)
        }
        return arr;
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (selectedDate !== null) {
            setUpdateTodoItem({...updateTodoItem, scheduleAt: selectedDate.toISOString()});
        }
    };

    return (
        <Fragment>
            {(
                <Card className={classes.card}>
                    <CardHeader
                        title={
                            <Typography align="center" variant="h3">
                                Todos details
                            </Typography>
                        }
                    />
                    <Divider/>
                    <CardContent>
                        <Grid container>
                            <div className={classes.inputBox}>
                                <Grid container spacing={1}>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <TextField required label="Title" fullWidth InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SvgIcon fontSize="small" color="action"><Title/>
                                                    </SvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                                   onChange={(event) => {
                                                       setUpdateTodoItem({...updateTodoItem, title: event.target.value})
                                                   }}
                                                   placeholder={updateTodoItem.title}
                                                   variant="outlined"
                                                   value={updateTodoItem.title}
                                        />
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <TextField label="SubTitle" fullWidth InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SvgIcon fontSize="small" color="action"><ShortText/>
                                                    </SvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                                   onChange={(event) => {
                                                       setUpdateTodoItem({
                                                           ...updateTodoItem,
                                                           subTitle: event.target.value
                                                       })
                                                   }}
                                                   placeholder="Input the subTitle"
                                                   variant="outlined"
                                                   value={updateTodoItem.subTitle}
                                        />
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                                        <TextField
                                            select
                                            required
                                            margin="normal"
                                            label="Repeat"
                                            value={updateTodoItem.repeatCircle}
                                            // onChange={handleYearChange}
                                            onChange={(event) => {
                                                setUpdateTodoItem({
                                                    ...updateTodoItem,
                                                    repeatCircle: event.target.value
                                                });
                                            }}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            defaultValue="Default Value"
                                            fullWidth
                                        >
                                            {buildOptions()}
                                        </TextField>
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date picker inline"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="Time picker"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Description"
                                            multiline
                                            fullWidth
                                            rows={6}
                                            placeholder="Write a description here"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(event) => {
                                                setUpdateTodoItem({...updateTodoItem, description: event.target.value});
                                            }}
                                            value={updateTodoItem.description}
                                            defaultValue=""
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xl={12} lg={12} sm={12} xs={12}>
                                        <div className={classes.btnGroup}>
                                            <Button variant="contained" color="primary" type="submit"
                                                    value="Submit"
                                                    onClick={() => {
                                                        updateATodoItem(updateTodoItem, dispatch).then();
                                                        toggleDrawer(false);
                                                    }}
                                                    style={{
                                                        textTransform: 'none',
                                                        marginTop: "10px"
                                                    }}>Update</Button>
                                            <Button variant="contained" color="secondary"
                                                    onClick={() => {
                                                        deleteATodoItem(updateTodoItem._id, dispatch).then()
                                                        toggleDrawer(false);
                                                    }}
                                                    style={{
                                                        textTransform: 'none',
                                                        marginTop: "10px"
                                                    }}>Delete</Button>
                                        </div>
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
export default TodoItemDetailsModule;