import Button from '@mui/material/Button';
import {useAppDispatch} from '../../../app/hooks';
import {closeRightPanel} from '../../../features/rightPanel/right-panel-slice';
import {setTaskData} from '../../../features/mainPanel/main-panel-slice';

import {SingleTaskItem} from '../../../model/task';
import {updateTask} from '../../../misc/database';

const SubmitButton: React.FC<SingleTaskItem> = props => {
  const dispatch = useAppDispatch();

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
