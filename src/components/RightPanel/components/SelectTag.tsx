import {SingleTaskItem} from '../../../model/task';
import {useAppDispatch} from '../../../app/hooks';
import {updateTag} from '../../../features/selectedTask/selected-task-slice';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircleIcon from '@mui/icons-material/Circle';
import Box from '@mui/material/Box';
import {ListItemIcon, ListItemText} from '@mui/material';

interface ComboTag {
  title: string;
  color: string;
  id: number;
  slug: string;
}

export interface ListProps {
  initialValue: ComboTag | undefined;
  listData: Array<ComboTag>;
  taskData: SingleTaskItem;
}

const SelectTag: React.FC<ListProps> = props => {
  const dispatch = useAppDispatch();
  const setTag = (tagID: number) => {
    dispatch(updateTag(tagID));
  };

  return (
    <div>
      <div>
        {'Task Tag:'} {props.initialValue?.title}
      </div>
      <Autocomplete
        disablePortal
        id="controllable-states-demo"
        onChange={(
          e: React.SyntheticEvent<Element, Event>,
          newValue: ComboTag | null
        ) => {
          // eslint-disable-next-line eqeqeq
          if (newValue != null) {
            setTag(newValue.id);
          }
        }}
        options={props.listData}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{width: 192}}
        getOptionLabel={option => option.title}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{'& > img': {mr: 2, flexShrink: 0}}}
            {...props}
          >
            {/* <ListItem> */}
            <ListItemIcon>
              <CircleIcon sx={{color: option.color}} />
            </ListItemIcon>
            <ListItemText primary={option.title} />
            {/* </ListItem> */}
          </Box>
        )}
        renderInput={params => <TextField {...params} label="Assigned Tag" />}
      />
    </div>
  );
};

export default SelectTag;
