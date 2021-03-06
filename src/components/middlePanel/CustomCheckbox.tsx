import * as ContainerClass from '../../misc/constants';
import {updateTask} from '../../misc/database';
import {SingleTaskItem} from '../../model/task';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {setTaskList} from '../../features/mainPanel/main-panel-slice';
import {updateCompletedState} from
  '../../features/selectedTask/selected-task-slice';
import axios from 'axios';

import {Checkbox} from '@mui/material';
import {makeStyles} from '@mui/styles';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import React from 'react';

const useStyles = makeStyles(() => ({
  checkbox: {
    '&$checked': {
      color: '#F5B369',
    },
  },
  checked: {},
}));

const CustomCheckbox: React.FC<SingleTaskItem> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const mainPanel = useAppSelector((state) => state.mainPanel);
  const auth = useAppSelector((state) => state.auth);
  const selectedTask: SingleTaskItem = useAppSelector((state) => state.task);

  /**
   * Get tasks form the backend and recursively calls getTasks
   * until data has been updated.
   * @param {number} taskID - task ID that should be compared with.
   */
  function getTasks(taskID: number) {
    // reloads the task list in the main section
    (async () => {
      await axios
          .get(`${ContainerClass.databaseLink}/labels`, {
            headers: {
              'Authorization': `token ${localStorage.getItem('token')}`,
            },
          })
          .then((resp) => {
            const tasks = resp.data['included'];
            // eslint-disable-next-line eqeqeq

            const taskOnBackend = tasks.find((task: SingleTaskItem) =>
              task.id === taskID).attributes.completed;
            const taskOnFrontend = mainPanel.data.find((task: SingleTaskItem) =>
              task.id === taskID)?.attributes.completed;
            if (taskOnBackend === taskOnFrontend) {
              getTasks(taskID);
            } else {
              dispatch(setTaskList(tasks));
            }
          })
          .catch((err) => {
            console.log(err);
          });
    })();
  }

  return (
    <Checkbox
      icon={<RadioButtonUncheckedIcon/>}
      checkedIcon={<CheckCircleIcon/>}
      onChange={() => {
        if (props.id === selectedTask.id) {
          dispatch(updateCompletedState());
        }
        updateTask(props.id, {
          title: props.attributes.title,
          completed: !props.attributes.completed,
          due: props.attributes.due,
          label_id: props.attributes.label_id,
          user_id: auth.user.id,
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
