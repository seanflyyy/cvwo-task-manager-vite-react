import DateTimeWidget from '../components/rightPanel/DateTimePicker';
import TaskNameField from '../components/rightPanel/TaskNameField';
import SelectTag from '../components/rightPanel/SelectTag';
import DeleteTaskButton from '../components/rightPanel/DeleteTaskButton';
import SubmitButton from '../components/rightPanel/SubmitButton';
import ClosePanelButton from '../components/rightPanel/ClosePanelButton';

import {SingleTag} from '../model/tag';
import {useAppSelector} from '../app/hooks';

import React from 'react';

import {makeStyles} from '@mui/styles';
import {Paper, List, ListItem, Stack} from '@mui/material';
import {SingleTaskItem} from '../model/task';

const useStyles = makeStyles(() => ({
  grid: {
    height: '100%',
  },

  form: {
    height: '100%',
    width: '22%',
    position: 'fixed',
    top: 0,
    right: 0,
    overflowX: 'hidden',
    flexDirection: 'column',
  },
  textField: {
    paddingLeft: 15,
    width: '70%',
    overflowWrap: 'break-word',
  },
  text: {
    fontWeight: 'bolder',
  },
  firstElement: {
    paddingLeft: 0,
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 10,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonArea: {
    display: 'flex',
    justifyContent: 'center',
  },
  positionTrashCan: {
    paddingLeft: 20,
  },
}));

const RightPanel: React.FC = () => {
  const classes = useStyles();
  const selectedTask: SingleTaskItem = useAppSelector((state) => state.task);
  const auth = useAppSelector((state) => state.auth);
  const tags = useAppSelector((state) => state.leftPanel.allTags).map(
      (tag: SingleTag) => ({
        title: tag.attributes.title,
        color: tag.attributes.color,
        id: tag.id,
        slug: tag.attributes.slug,
        user_id: auth.user.id,
      }),
  );
  const initialValueTag = tags.find(
      // eslint-disable-next-line eqeqeq
      (x) => x.id == selectedTask.attributes.label_id,
  );

  return (
    <Paper elevation={3} component="form" className={classes.form}>
      <List>
        <ListItem>
          <ClosePanelButton />
        </ListItem>
        <br/>
        <ListItem className={classes.listItem} >
          <TaskNameField {...selectedTask} />
        </ListItem>
        <br/>
        <ListItem className={classes.listItem}>
          <DateTimeWidget {...selectedTask} />
        </ListItem>
        <br />
        <ListItem className={classes.listItem}>
          <SelectTag
            {...{
              initialValue: initialValueTag,
              listData: tags,
              taskData: selectedTask,
            }}
          />
        </ListItem>
        <br/>
        <ListItem className={classes.buttonArea}>
          <Stack direction="row" spacing={1.5}>
            <SubmitButton {...selectedTask} />
            <DeleteTaskButton {...selectedTask} />
          </Stack>

        </ListItem>
        {/* <ListItem> */}
      </List>
    </Paper>
  );
};

export default RightPanel;
