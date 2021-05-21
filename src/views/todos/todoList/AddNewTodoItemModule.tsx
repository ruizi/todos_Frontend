import {
    Button,
    Card, CardContent,
    CardHeader, Divider, Grid,
    InputAdornment,
    SvgIcon, TextField, Typography
} from "@material-ui/core";
import React, {Fragment, useEffect, useState} from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {addATodoItem} from "../../../redux/actions/todoItemAction";
import {useDispatch} from "react-redux";
import {ShortText, Title} from "@material-ui/icons";


const useStyles = makeStyles(() =>
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


const AddNewTodoItemModule = ({todoGroup}: any) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    let initialInputBox = {
        title: '',
        subTitle: '',
        repeatCircle: '---',
        scheduleAt: new Date().toISOString(),
        description: '',
        groupId: '',
    }

    const [newTodoItem, setNewTodoItem] = useState(initialInputBox);

    const resetInputBox = () => {
        setNewTodoItem({...initialInputBox,groupId: todoGroup._id})
    }

    useEffect(() => {
        if (todoGroup !== undefined) {
            setNewTodoItem({...newTodoItem, groupId: todoGroup._id})
        }
    }, [setNewTodoItem])

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
            setNewTodoItem({...newTodoItem, scheduleAt: selectedDate.toISOString()});
        }
    };

    return (
        <Fragment>
            <Card className={classes.card}>
                <CardHeader
                    title={
                        <Typography align="center" variant="h3">
                            New TodoItem
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
                                        <TextField required label="Title" fullWidth InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SvgIcon fontSize="small" color="action"><Title/>
                                                    </SvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                                   onChange={(event) => {
                                                       setNewTodoItem({...newTodoItem, title: event.target.value});
                                                   }}
                                                   placeholder="Please input todo title"
                                                   variant="outlined"
                                                   value={newTodoItem.title}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <div>
                                        <TextField label="SubTitle" fullWidth InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SvgIcon fontSize="small" color="action"><ShortText/>
                                                    </SvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                                   onChange={(event) => {
                                                       setNewTodoItem({
                                                           ...newTodoItem,
                                                           subTitle: event.target.value
                                                       });
                                                   }}
                                                   placeholder="Input the subTitle"
                                                   variant="outlined"
                                                   value={newTodoItem.subTitle}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                                    <TextField
                                        select
                                        required
                                        margin="normal"
                                        label="Repeat"
                                        value={newTodoItem.repeatCircle}
                                        // onChange={handleYearChange}
                                        onChange={(event) => {
                                            setNewTodoItem({...newTodoItem, repeatCircle: event.target.value});
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
                                            setNewTodoItem({...newTodoItem, description: event.target.value});
                                        }}
                                        value={newTodoItem.description}
                                        defaultValue=""
                                        variant="outlined"
                                    /></Grid>
                                <Grid item xl={12} lg={12} sm={12} xs={12}>
                                    <div className={classes.btnGroup}>
                                        <Button variant="contained" color="primary" type="submit"
                                                onClick={() => {
                                                    addATodoItem(newTodoItem, dispatch).then();
                                                    resetInputBox();
                                                }}
                                                value="Submit"
                                                style={{
                                                    textTransform: 'none',
                                                    marginTop: "10px"
                                                }}>Add New</Button>
                                        <Button variant="contained" color="inherit" type="reset"
                                                onClick={() => {resetInputBox();}}
                                                style={{
                                                    textTransform: 'none',
                                                    marginTop: "10px"
                                                }}>Clear Form</Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </CardContent>
            </Card>
        </Fragment>
    )
};

export default AddNewTodoItemModule;