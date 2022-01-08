import Button from '@mui/material/Button';
import { SingleTaskItem } from '../../../model/task';
import { updateTask } from '../../misc/database';

const SubmitButton: React.FC<SingleTaskItem> = (props) => {
  return (
    <Button variant="contained" onClick={() => {
        updateTask(props.id, props.attributes);
    }}>Submit Changes</Button>
  );
}

export default SubmitButton;