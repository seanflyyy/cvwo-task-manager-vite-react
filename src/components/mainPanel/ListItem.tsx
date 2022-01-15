/* eslint-disable eqeqeq */
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {SingleTaskItem} from '../../model/task';
import {SingleTag} from '../../model/tag';
import {
  closeRightPanel,
  openRightPanel,
} from '../../features/rightPanel/right-panel-slice';
import {
  setTask,
  updateCompletedState,
} from '../../features/selectedTask/selected-task-slice';
import * as ContainerClass from '../../misc/constants';

import React, {useState} from 'react';

import CircleIcon from '@mui/icons-material/Circle';

import {Checkbox, ListItemIcon, ListItemText, ListItem} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {updateTask} from '../../misc/database';
import {
  setTaskData,
  setTaskList,
} from '../../features/mainPanel/main-panel-slice';
import axios from 'axios';
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
  const [checked, setChecked] = useState(props.attributes.completed);
  const allTags = useAppSelector(state => state.leftPanel.allTags);
  const mainPanel = useAppSelector(state => state.mainPanel);
  const tagData = allTags.find(
    (tag: SingleTag) => tag.id == props.attributes.label_id
  );

  // const tagData = getLabel(props.attributes.label_id);

  function handleTaskBodyClick() {
    dispatch(openRightPanel());
    dispatch(setTask(props));
  }

  function getTasks() {
    // reloads the task list in the main section
    (async () => {
      await axios
        .get(`${ContainerClass.databaseLink}/labels`)
        .then(resp => {
          const tasks = resp.data['included'];
          if (tasks == mainPanel.data) {
            // recursively call database until the currentList has been updated
            getTasks();
          } else {
            dispatch(setTaskList(tasks));
            console.log('dispatched');
          }
        })
        .catch(err => {
          console.log(err);
        });
    })();
  }

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
        <Checkbox
          onChange={() => {
            setChecked(!checked);
            dispatch(updateCompletedState());
            updateTask(props.id, {
              title: props.attributes.title,
              completed: !props.attributes.completed,
              due: props.attributes.due,
              label_id: props.attributes.label_id,
            });
            getTasks();
            console.log('updating state');
          }}
          checked={checked}
          // checked={props['attributes']['completed']}
          edge="start"
          classes={{
            root: classes.checkbox,
            checked: classes.checked,
          }}
        />
      </ListItemIcon>

      <ListItem button divider onClick={handleTaskBodyClick}>
        <ListItemText
          primary={props.attributes.title}
          secondary={convertDateToString(props.attributes.due)}
        />
        {/* <ListItemText primary={convertDateToString(props["attributes"]["due"])} /> */}

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
