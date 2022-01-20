/* eslint-disable eqeqeq */

import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {SingleTag} from '../../model/tag';
import {TaskContent} from '../../model/task';
import {setTaskList} from '../../features/mainPanel/main-panel-slice';
import * as ContainerClass from '../../misc/constants';
import {createTaskOnDatabase} from '../../misc/database';

import React, {useState} from 'react';
import axios from 'axios';

import AddIcon from '@mui/icons-material/Add';
import {styled, alpha} from '@mui/material/styles';
import {InputBase, Paper} from '@mui/material';

const CreateTask = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  justifyContent: 'flex-start',
  marginLeft: 0,
  width: '25%',
  [theme.breakpoints.up('sm')]: {
    width: ContainerClass.centerContainerWidth,
  },
}));

const AddIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 0),
  marginLeft: theme.spacing(2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  boxSizing: 'border-box',
  width: '100%',
  color: 'inherit',
  paddingLeft: '60px',
  margin: theme.spacing(0.5, 0, 0.5, 0),
}));

const CreateTaskField: React.FC = () => {
  const [task, setFieldState] = useState('');
  const listOfTags = useAppSelector(state => state.leftPanel.allTags);
  const mainPanel = useAppSelector(state => state.mainPanel);
  const dispatch = useAppDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFieldState(event.target.value);
  }

  function handleSubmit(event: React.SyntheticEvent) {
    createTask(task);
    event.preventDefault();
  }

  function getTasks() {
    // reloads the task list in the main section
    (async () => {
      await axios
        .get(`${ContainerClass.databaseLink}/labels`)
        .then(resp => {
          const tasks = resp.data['included'];
          if (tasks.length == mainPanel.data.length) {
            // recursively call database until the currentList has been updated
            getTasks();
          } else {
            dispatch(setTaskList(tasks));
            console.log('Created task');
          }
        })
        .catch(err => {
          console.log(err);
        });
    })();
  }

  function createTask(task: string) {
    const [taskName = '', dueDateAndTag = ''] = task
      .split(' on ')
      .map(x => x.trim());
    const [dueDate = '', assignedTag = ''] = dueDateAndTag
      .split(' assign ')
      .map(x => x.trim());

    const adjustedDay =
      convertDayToDate(dueDate.split(' at ')[0]) + dueDate.split(' at ')[1];
    const validityCheckOutput = isInputValid(
      taskName,
      adjustedDay,
      assignedTag
    );

    if (validityCheckOutput == 'Valid') {
      const tagID = listOfTags.find(
        (tag: SingleTag) =>
          tag.attributes.title.toLowerCase() == assignedTag?.toLowerCase()
      )!.id;

      const taskContent: TaskContent = {
        title: taskName,
        completed: false,
        due: adjustedDay + ContainerClass.timezoneOffset,
        label_id: tagID,
      };

      setFieldState('');
      createTaskOnDatabase(taskContent);
      getTasks();
    } else {
      // alert('date\nerror');
      alert(
        validityCheckOutput +
          '\n\n' +
          'Please ensure that your input is of the appropriate format.' +
          '\n\n' +
          'Example formats are: ' +
          '\n' +
          '-Event on 1 January at 8am assign General' +
          '\n' +
          '-Event on 1 January 2021 at 8am assign General' +
          '\n' +
          '-Event on Monday at 8am assign General' +
          '\n' +
          '-Event on mon at 8am assign General' +
          '\n' +
          '-Event on 01/01 at 8am assign General'
      );
    }
  }
  function convertDayToDate(date: string) {
    function getDateFromToday(numDays: number) {
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + numDays);
      return futureDate.toString();
    }

    const daysOfWeek = [
      getDateFromToday(0),
      getDateFromToday(1),
      getDateFromToday(2),
      getDateFromToday(3),
      getDateFromToday(4),
      getDateFromToday(5),
      getDateFromToday(6),
    ].map((day: string) => {
      const dayOfWeek = day.split(' ')[0].toLowerCase();
      const fullDate = day.split(' ').slice(1, 4).join(' ');
      return {[dayOfWeek]: fullDate};
    });

    const dateDesired = daysOfWeek.find((item: Object) =>
      date.toLowerCase().includes(Object.keys(item)[0])
    );

    return typeof dateDesired == 'undefined'
      ? date
      : Object.values(dateDesired)[0];
  }

  function isInputValid(
    taskName: string,
    dueDate: string,
    assignedTag: string
  ) {
    if (taskName == '') {
      console.log(taskName);
      return 'An invalid task name provided. Please ensure that you have provided a valid task name.';
    } else if (!isNaN(Date.parse(dueDate))) {
      const errorMessage =
        'An invalid date and time has been provided.\r\nPlease ensure that you have provided a valid date and time.';
      return errorMessage;
    } else if (
      listOfTags.find(
        x => x.attributes.title.toLowerCase() == assignedTag.toLowerCase()
      ) == null
    ) {
      return 'An invalid tag has been provided. Please ensure that a tag has been created.';
    } else {
      return 'Valid';
    }
  }

  return (
    // <Box sx={{ flexGrow: 1, backgroundColor: 'black' }}>
    <Paper elevation={3} component="form" onSubmit={handleSubmit}>
      <CreateTask>
        <AddIconWrapper>
          <AddIcon />
        </AddIconWrapper>
        <StyledInputBase
          type="Create New Task"
          value={task}
          placeholder="<Task Name> on <Due Date And Time> assign <Tag Name>"
          inputProps={{'aria-label': 'Add'}}
          onChange={handleChange}
        />
      </CreateTask>
    </Paper>
    // </Box>
  );
};

export default CreateTaskField;
