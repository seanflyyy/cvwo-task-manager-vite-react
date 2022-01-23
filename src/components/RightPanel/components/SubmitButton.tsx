import {useAppDispatch} from '../../../app/hooks';
import {closeRightPanel} from '../../../features/rightPanel/right-panel-slice';
import {setTaskData} from '../../../features/mainPanel/main-panel-slice';
import {SingleTaskItem} from '../../../model/task';
import {updateTask} from '../../../misc/database';
import React from 'react';
import Button from '@mui/material/Button';

const SubmitButton: React.FC<SingleTaskItem> = (props) => {
  const dispatch = useAppDispatch();

  console.log(props.attributes);

  return (
    <Button
      variant="contained"
      onClick={() => {
        updateTask(props.id, props.attributes);
        dispatch(closeRightPanel());
        dispatch(setTaskData(props));
      }}
    >
      Submit Changes
    </Button>
  );
};

export default SubmitButton;
