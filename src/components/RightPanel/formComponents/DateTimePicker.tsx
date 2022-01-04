import { SingleTaskItem } from '../../ListItem/ListItem';
import * as ContainerClass from '../../Misc/constants';
import React, { useState, useEffect } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import DateFnsUtils from '@date-io/date-fns';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const DateTimeWidget: React.FC<SingleTaskItem> = (props) => {
    const taskID = props['id'];
    const taskDueDate = props['attributes']['due'];
    const [date, setDate] = useState<string | null>(taskDueDate);

    const setDateBackend = (dateTime: string | null) => {
        useEffect(() => {
            (async () => {
                axios.patch(`${ContainerClass.databaseLink}/tasks/${taskID}`, { due: dateTime }).then((res) => {
                    console.log(res);
                    console.log(res.data);
                });
            })();
        }, []);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={date}
                onChange={(newValue) => {
                    setDate(newValue);
                    setDateBackend(newValue);
                }}
            />
        </LocalizationProvider>
    );
};

export default DateTimeWidget;
