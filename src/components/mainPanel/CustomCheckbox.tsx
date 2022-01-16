import * as ContainerClass from '../../misc/constants';
import {updateTask} from '../../misc/database';
import {SingleTaskItem} from '../../model/task';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {setTaskList} from '../../features/mainPanel/main-panel-slice';

import axios from 'axios';

import {Checkbox} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {updateCompletedState} from '../../features/selectedTask/selected-task-slice';

const useStyles = makeStyles(() => ({
  checkbox: {
    '&$checked': {
      color: '#F5B369',
    },
  },
  checked: {},
}));

const CustomCheckbox: React.FC<SingleTaskItem> = props => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const mainPanel = useAppSelector(state => state.mainPanel);
  const selectedTask: SingleTaskItem = useAppSelector(state => state.task);

  function getTasks(taskID: number) {
    // reloads the task list in the main section
    (async () => {
      await axios
        .get(`${ContainerClass.databaseLink}/labels`)
        .then(resp => {
          const tasks = resp.data['included'];
          // eslint-disable-next-line eqeqeq

          if (
            tasks.find((task: SingleTaskItem) => task.id === taskID).attributes
              .completed ===
            mainPanel.data.find((task: SingleTaskItem) => task.id === taskID)
              ?.attributes.completed
          ) {
            console.log('getting tasks again');
            // recursively call database until the currentList has been updated
            getTasks(taskID);
          } else {
            dispatch(setTaskList(tasks));
            console.log('dispatched');
          }
        })
        .catch(err => {
          console.log(err);
        });
    })();
  }

  return (
    <Checkbox
      onChange={() => {
        // setChecked(!checked);
        if (props.id === selectedTask.id) {
          dispatch(updateCompletedState());
        }
        updateTask(props.id, {
          title: props.attributes.title,
          completed: !props.attributes.completed,
          due: props.attributes.due,
          label_id: props.attributes.label_id,
        });
        getTasks(props.id);
      }}
      checked={props.attributes.completed}
      edge="start"
      classes={{
        root: classes.checkbox,
        checked: classes.checked,
      }}
    />
  );
};

export default CustomCheckbox;
