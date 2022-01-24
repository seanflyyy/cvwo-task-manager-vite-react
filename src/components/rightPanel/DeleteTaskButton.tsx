import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {SingleTaskItem} from '../../model/task';
import * as ContainerClass from '../../misc/constants';
import {closeRightPanel} from '../../features/rightPanel/right-panel-slice';
import {setTaskList} from '../../features/mainPanel/main-panel-slice';
import {deleteTask} from '../../misc/database';

import axios from 'axios';

import DeleteIcon from '@mui/icons-material/Delete';

import React from 'react';
import {Button} from '@mui/material';


const DeleteTaskButton: React.FC<SingleTaskItem> = (props) => {
  const dispatch = useAppDispatch();
  const mainPanel = useAppSelector((state) => state.mainPanel);

  const getTasks = () => {
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
    <Button variant="outlined"
      color="error"
      sx={{fontSize: '13px'}}
      endIcon={<DeleteIcon />}
      onClick={() => {
        dispatch(closeRightPanel());
        deleteTask(props.id);
        getTasks();
      }}
    >
        Delete
    </Button>
  );
};

export default DeleteTaskButton;
