/* eslint-disable eqeqeq */
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {SingleTaskItem} from '../../model/task';
import {SingleTag} from '../../model/tag';
import {openRightPanel} from '../../features/rightPanel/right-panel-slice';
import {setTask} from '../../features/selectedTask/selected-task-slice';

import React from 'react';

import CircleIcon from '@mui/icons-material/Circle';

import {ListItemIcon, ListItemText, ListItem} from '@mui/material';

import CustomCheckbox from './CustomCheckbox';

const NewListItem: React.FC<SingleTaskItem> = (props) => {
  const dispatch = useAppDispatch();
  const allTags = useAppSelector((state) => state.leftPanel.allTags);
  const tagData = allTags.find(
      (tag: SingleTag) => tag.id == props.attributes.label_id,
  );

  /**
   * Handle click on the task.
   */
  function handleTaskBodyClick() {
    dispatch(openRightPanel());
    dispatch(setTask(props));
  }

  /**
   * Convert date time to a string with the foramt Wed, 19 Jan 2022, 3:30 PM
   * @param {string} dateTime - the date time from props.attributes.due
   * @return {string}
   */
  function convertDateToString(dateTime: string) {
    // console.log(props.attributes.title);

    const date: Date = new Date(dateTime);
    const dateString = date.toString();
    // console.log(dateString);

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

  /**
   * Convert the time portion of the props.attributes.due into a 12 hour format.
   * @param {any} time = this will be the time in 24 hours format.
   * @return {string}
   */
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
    <ListItem>
      <ListItemIcon>
        <CustomCheckbox {...props} />
      </ListItemIcon>
      <ListItem button divider onClick={handleTaskBodyClick}>
        <ListItemText
          primary={props.attributes.title}
          secondary={convertDateToString(props.attributes.due)}
        />
        <CircleIcon sx={{color: tagData?.attributes.color}} />
      </ListItem>

      {/* {tagData != null ? (
        <CircleIcon sx={{color: tagData!.attributes.color}} />
      ) : (
        <div></div>
      )} */}
    </ListItem>
  );
};

export default NewListItem;
