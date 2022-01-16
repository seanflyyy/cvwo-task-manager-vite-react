import {useAppDispatch} from '../../../app/hooks';
import {updateTitle} from '../../../features/selectedTask/selected-task-slice';
import {SingleTaskItem} from '../../../model/task';

import {Stack, TextField} from '@mui/material';
import {makeStyles} from '@mui/styles';
import CustomCheckbox from '../../mainPanel/CustomCheckbox';

const useStyles = makeStyles(() => ({
  textField: {
    paddingLeft: 15,
    width: '70%',
    overflowWrap: 'break-word',
  },
  text: {
    fontWeight: 'bolder',
  },
  firstElement: {
    paddingLeft: 0,
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 10,
  },
}));

const TaskNameField: React.FC<SingleTaskItem> = props => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(updateTitle(event.target.value));
  }

  return (
    <Stack spacing={0.5} direction="row">
      {/* <Checkbox chcked={props.attributes.completed} /> */}
      <CustomCheckbox {...props} />
      <TextField
        className={classes.textField}
        id="outlined-multiline-flexible"
        multiline
        value={props.attributes.title}
        onChange={handleChange}
        InputProps={{
          className: classes.text,
        }}
        // onKeyDown={keyPress}
        variant="standard"
      />
    </Stack>
  );
};

export default TaskNameField;
