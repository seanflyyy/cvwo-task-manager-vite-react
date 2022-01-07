import { SingleTaskItem } from '../../model/task';
import * as ContainerClass from '../misc/constants';
import React, { useState, useEffect } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import DateFnsUtils from '@date-io/date-fns';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from '../../app/hooks';
import { updateDate } from '../../features/selectedTask/selected-task-slice';
import { updateTask } from '../misc/database';

const DateTimeWidget: React.FC<SingleTaskItem> = (props) => {
    const taskID = props.id;
    const dispatch = useAppDispatch();

    const setDate = (dateTime: string) => {
        dispatch(updateDate(dateTime));
        updateTask(props.id, props.attributes);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                value={props.attributes.due}
                onChange={(newValue) => {
                    if (newValue != null) {
                        setDate(newValue);
                    }
                }}
            />
        </LocalizationProvider>
    );
};

export default DateTimeWidget;
