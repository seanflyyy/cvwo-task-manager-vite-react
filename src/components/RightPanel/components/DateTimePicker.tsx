import { SingleTaskItem } from '../../../model/task';
import * as ContainerClass from '../../../misc/constants';
import React, { useState, useEffect, useRef } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import DateFnsUtils from '@date-io/date-fns';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from '../../../app/hooks';
import { updateDate } from '../../../features/selectedTask/selected-task-slice';
import { updateTask } from '../../../misc/database';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/material';
import { BsCalendarEvent } from 'react-icons/bs';

const useStyles = makeStyles(() => ({
    div: {
      width: "100%",
    },
  }));

const DateTimeWidget: React.FC<SingleTaskItem> = (props) => {
    const taskID = props.id;
    const dispatch = useAppDispatch();
    const classes = useStyles(); 

    
    const setDate = (dateTime: string) => {
        dateTime = dateTime.toString();
        dispatch(updateDate(dateTime));
    };

    return (
        // <Stack spacing={5} direction="row">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    className={classes.div}
                    renderInput={(props) => <TextField {...props} />}
                    value={props.attributes.due}
                    onChange={(newValue) => {
                        if (newValue != null) {
                            setDate(newValue);
                        }
                    }}
                />
            </LocalizationProvider>
        // </Stack>
    );
};

export default DateTimeWidget;
