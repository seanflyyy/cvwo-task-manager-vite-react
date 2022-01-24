import {useAppDispatch} from '../../app/hooks';
import {updateTitle} from '../../features/selectedTask/selected-task-slice';
import {SingleTaskItem} from '../../model/task';

import {Stack, TextField} from '@mui/material';
import {makeStyles} from '@mui/styles';
import CustomCheckbox from '../middlePanel/CustomCheckbox';
import React from 'react';

const useStyles = makeStyles(() => ({
  textField: {
    paddingLeft: 10,
    width: 190,
    overflowWrap: 'break-word',
  },
  firstElement: {
    paddingLeft: 0,
    paddingTop: 20,
    paddingRight: 10,
    // paddingBottom: 10,
  },
}));

const TaskNameField: React.FC<SingleTaskItem> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  /**
   * Updates task name field on the backend when data in field is changed.
   * @param {React.ChangeEvent<HTMLInputElement>} event - change event handler
   */
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(updateTitle(event.target.value));
  }

  return (
    <Stack spacing={0} direction="row">
      {/* <Checkbox chcked={props.attributes.completed} /> */}
      <CustomCheckbox {...props} />
      <TextField
        variant="standard"
        className={classes.textField}
        multiline
        value={props.attributes.title}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default TaskNameField;
