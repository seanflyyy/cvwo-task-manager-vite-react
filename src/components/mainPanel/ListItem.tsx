/* eslint-disable eqeqeq */
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {SingleTaskItem} from '../../model/task';
import {SingleTag} from '../../model/tag';
import {openRightPanel} from '../../features/rightPanel/right-panel-slice';
import {setTask} from '../../features/selectedTask/selected-task-slice';

import React from 'react';

import CircleIcon from '@mui/icons-material/Circle';

import {Checkbox, ListItemIcon, ListItemText, ListItem} from '@mui/material';
import {makeStyles} from '@mui/styles';
const useStyles = makeStyles(() => ({
  checkbox: {
    '&$checked': {
      color: '#F5B369',
    },
  },
  checked: {},
}));

const NewListItem: React.FC<SingleTaskItem> = props => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  // const tagData = getLabel(props.attributes.label_id);
  const allTags = useAppSelector(state => state.leftPanel.allTags);
  const tagData = allTags.find(
    (tag: SingleTag) => tag.id == props.attributes.label_id
  );

  function handleClick() {
    dispatch(openRightPanel());
    dispatch(setTask(props));
  }

  function convertDateToString(dateTime: string) {
    const date: Date = new Date(dateTime);
    const dateString = date.toString();
    const listDate: Array<string> = dateString.split(' ');
    const [dayOfWeek, month, dayOfMonth, year, time] = listDate;
    const convertedTime = convertTimeTo12Hours(time);
    const output =
      dayOfWeek +
      ', ' +
      dayOfMonth +
      ' ' +
      month +
      ' ' +
      year +
      ', ' +
      convertedTime;
    return output;
  }

  function convertTimeTo12Hours(time: any) {
    let convertedTime = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      convertedTime = convertedTime.slice(1);

      convertedTime[3] = +convertedTime[0] < 12 ? ' AM' : ' PM';
      convertedTime[0] = +convertedTime[0] % 12 || 12;
    }
    return convertedTime.join(''); // return adjusted time or original string
  }

  return (
    <ListItem button divider onClick={handleClick}>
      <ListItemIcon>
        <Checkbox
          value={props['attributes']['completed']}
          edge="start"
          classes={{
            root: classes.checkbox,
            checked: classes.checked,
          }}
        />
      </ListItemIcon>
      <ListItemText
        primary={props['attributes']['title']}
        secondary={convertDateToString(props['attributes']['due'])}
      />
      {/* <ListItemText primary={convertDateToString(props["attributes"]["due"])} /> */}

      <CircleIcon sx={{color: tagData?.attributes.color}} />
      {/* {tagData != null ? (
        <CircleIcon sx={{color: tagData!.attributes.color}} />
      ) : (
        <div></div>
      )} */}
    </ListItem>
  );
};

export default NewListItem;
