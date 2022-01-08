import Button from '@mui/material/Button';
import { useAppDispatch } from '../../../app/hooks';
import { closeRightPanel } from '../../../features/rightPanel/right-panel-slice';
import { SingleTaskItem } from '../../../model/task';
import { updateTask } from '../../misc/database';

const SubmitButton: React.FC<SingleTaskItem> = (props) => {
  const dispatch = useAppDispatch();


  return (
    <Button variant="contained" onClick={() => {
        dispatch(closeRightPanel());
        updateTask(props.id, props.attributes);
    }}>Submit Changes</Button>
  );
}

export default SubmitButton;