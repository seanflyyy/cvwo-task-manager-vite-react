import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {SingleTaskItem} from '../../../model/task';
import * as ContainerClass from '../../../misc/constants';
import {closeRightPanel} from '../../../features/rightPanel/right-panel-slice';
import {setTaskList} from '../../../features/mainPanel/main-panel-slice';
import {deleteTask} from '../../../misc/database';

import axios from 'axios';
import {FiTrash} from 'react-icons/Fi';

import {makeStyles} from '@mui/styles';
import {IconButton} from '@mui/material';
import React from 'react';

const useStyles = makeStyles(() => ({
  deleteTaskButton: {
    position: 'absolute',
    right: '5%',
  },
  trashCan: {
    color: 'red',
  },
}));

const DeleteTaskButton: React.FC<SingleTaskItem> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const mainPanel = useAppSelector((state) => state.mainPanel);

  const getTasks = () => {
    // reloads the task list in the main section
    (async () => {
      await axios
          .get(`${ContainerClass.databaseLink}/labels`)
          .then((resp) => {
            const tasks = resp.data['included'];
            if (tasks.length === mainPanel.data.length) {
            // recursively call database until the currentList has been updated
              getTasks();
            } else {
              dispatch(setTaskList(tasks));
              console.log('dispatched');
            }
          })
          .catch((err) => {
            console.log(err);
          });
    })();
  };
  return (
    <IconButton
      className={classes.deleteTaskButton}
      onClick={() => {
        dispatch(closeRightPanel());
        deleteTask(props.id);
        getTasks();
      }}
    >
      <FiTrash className={classes.trashCan} />
    </IconButton>
  );
};

export default DeleteTaskButton;
