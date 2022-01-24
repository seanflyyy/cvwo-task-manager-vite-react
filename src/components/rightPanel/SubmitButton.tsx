import {useAppDispatch} from '../../app/hooks';
import {closeRightPanel} from '../../features/rightPanel/right-panel-slice';
import {setTaskData} from '../../features/mainPanel/main-panel-slice';
import {SingleTaskItem} from '../../model/task';
import {updateTask} from '../../misc/database';
import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


const SubmitButton: React.FC<SingleTaskItem> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      startIcon={<SendIcon />}
      variant="contained"
      sx={{fontSize: '13px'}}
      onClick={() => {
        updateTask(props.id, props.attributes);
        dispatch(closeRightPanel());
        dispatch(setTaskData(props));
      }}
    >
      Submit
    </Button>
  );
};

export default SubmitButton;
