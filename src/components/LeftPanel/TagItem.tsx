import DeleteTagButton from './DeleteTagButton';
import {SingleTag} from '../../model/tag';
import {setFilter} from '../../features/mainPanel/main-panel-slice';
import {setSelectedTag} from '../../features/leftPanel/left-panel-slice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';

import React, {useState} from 'react';

import {ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const TagItem: React.FC<SingleTag> = (props) => {
  const dispatch = useAppDispatch();
  const tag = useAppSelector((state) => state.leftPanel);
  const [deleteButtonState, toggleDeleteButton] = useState(false);
  const [delayHandler, setDelayHandler] = useState(0);

  /**
   * Handles the mouse hovering over the tag.
   * @param {any} event - The mouse enter event.
   */
  function handleMouseEnter(event: any) {
    setDelayHandler(setTimeout(() => {
      toggleDeleteButton(true);
    }, 500));
  }

  /**
   * When mouse leaves, resets the timer for how long mouse hovering over tag.
   */
  function handleMouseLeave() {
    toggleDeleteButton(false);
    clearTimeout(delayHandler);
  }

  /**
   * Handles the click when the tag has been selected.
   */
  function handleClick() {
    dispatch(setFilter(props.id));
    dispatch(setSelectedTag(props.id));
  }

  return (
    <ListItemButton
      // eslint-disable-next-line eqeqeq
      selected={tag.selectedTag == props.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <ListItemIcon>
        <CircleIcon sx={{color: props['attributes']['color']}} />
      </ListItemIcon>
      <ListItemText primary={props['attributes']['title']} />
      {deleteButtonState && props.id != 0 && props.id != -1 &&
        <ListItemIcon>
          <DeleteTagButton {...props}/>
        </ListItemIcon>
      }
    </ListItemButton>
  );
};

export default TagItem;
