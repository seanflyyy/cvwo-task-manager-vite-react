import DeleteTagButton from './DeleteTagButton';
import {SingleTag} from '../../model/tag';
import {setFilter} from '../../features/mainPanel/main-panel-slice';
import {setSelectedTag} from '../../features/leftPanel/left-panel-slice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';

import React, {useState} from 'react';

import {ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreateOrEditTagButton from './CreateOrEditTagButton';

const TagItem: React.FC<SingleTag> = (props) => {
  const dispatch = useAppDispatch();
  const tag = useAppSelector((state) => state.leftPanel);
  const [deleteButtonState, toggleDeleteButton] = useState(false);
  // const [delayHandler, setDelayHandler] = useState(0);

  /**
   * Handles the mouse hovering over the tag.
   * @param {any} event - The mouse enter event.
   */
  function handleMouseEnter(event: any) {
    toggleDeleteButton(true);
  }

  /**
   * When mouse leaves, resets the timer for how long mouse hovering over tag.
   */
  function handleMouseLeave() {
    toggleDeleteButton(false);
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
        {props.id == 0 ?
          <AllInclusiveIcon sx={{color: props.attributes.color}} /> :
          props.id == -1 ?
          <CheckCircleIcon sx={{color: props.attributes.color}} /> :
          props.id == -2 ?
          <RadioButtonUncheckedIcon sx={{color: props.attributes.color}} /> :
          <CircleIcon sx={{color: props['attributes']['color']}} />}
      </ListItemIcon>
      <ListItemText primary={props['attributes']['title']} />
      {deleteButtonState && props.id != 0 && props.id != -1 && props.id != -2 &&
        <ListItemIcon>
          <CreateOrEditTagButton {...{createOrEdit: 'Edit', tagData: props,
            hideButtons: handleMouseLeave}}/>
          <DeleteTagButton {...{tagData: props,
            hideButtons: handleMouseLeave}}/>
        </ListItemIcon>
      }
      {/* </ListItem> */}


    </ListItemButton>
  );
};

export default TagItem;
