import {useAppDispatch} from '../../app/hooks';
import {SingleTaskItem} from '../../model/task';
import {updateDate} from '../../features/selectedTask/selected-task-slice';

import React from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {LocalizationProvider, DateTimePicker} from '@mui/lab';
import TextField from '@mui/material/TextField';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles(() => ({
  div: {
    width: '100%',
  },
}));

const DateTimeWidget: React.FC<SingleTaskItem> = (props) => {
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
          // eslint-disable-next-line eqeqeq
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
