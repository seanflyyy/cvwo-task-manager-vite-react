import {ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import {SingleTag} from '../../model/tag';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {setFilter} from '../../features/mainPanel/main-panel-slice';
import {setSelectedTag} from '../../features/leftPanel/left-panel-slice';

const TagItem: React.FC<SingleTag> = props => {
  const dispatch = useAppDispatch();
  const tag = useAppSelector(state => state.leftPanel);

  function handleClick() {
    dispatch(setFilter(props.id));
    dispatch(setSelectedTag(props.id));
  }

  return (
    <ListItemButton
      // eslint-disable-next-line eqeqeq
      selected={tag.selectedTag == props.id}
      onClick={handleClick}
    >
      <ListItemIcon>
        <CircleIcon sx={{color: props['attributes']['color']}} />
      </ListItemIcon>
      <ListItemText primary={props['attributes']['title']} />
    </ListItemButton>
  );
};

export default TagItem;
