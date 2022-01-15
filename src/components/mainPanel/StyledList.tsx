/* eslint-disable eqeqeq */
import NewListItem from './ListItem';
import CreateTaskField from './CreateNewTaskField';

import * as ContainerClass from '../../misc/constants';
import {SingleTaskItem} from '../../model/task';
import {setTaskList} from '../../features/mainPanel/main-panel-slice';
import {useAppSelector, useAppDispatch} from '../../app/hooks';

import React, {useEffect} from 'react';
import axios from 'axios';

import {Grid, List} from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles(() => ({
  list: {
    width: ContainerClass.centerContainerWidth,
    height: '100%',
  },
}));

const StyledList: React.FC = () => {
  const classes = useStyles();
  const mainPanel = useAppSelector(state => state.mainPanel);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await axios
        .get(`${ContainerClass.databaseLink}/labels`)
        .then(resp => {
          const tasks = resp.data['included'];
          dispatch(setTaskList(tasks));
        })
        .catch(err => {
          console.log(err);
        });
    })();
  }, []);

  return (
    <Grid container direction="column" alignItems="center">
      {/* <SearchField onChange={handleChange} /> */}
      <CreateTaskField />
      <div />
      {/* <Paper elevation={3} > */}
      <List className={classes.list}>
        {mainPanel.data
          .filter((task: SingleTaskItem) => {
            if (mainPanel.filterKeyword === '') {
              return task;
            } else if (
              task['attributes']['title']
                .toLowerCase()
                .includes(mainPanel.filterKeyword.toLowerCase())
            ) {
              return task;
            }
          })
          .filter((task: SingleTaskItem) => {
            if (mainPanel.tagID == 0) {
              return task;
            } else if (task.attributes.label_id == mainPanel.tagID) {
              return task;
            }
          })
          .map((task: SingleTaskItem) => (
            <NewListItem key={task.id} {...task} />
          ))}
      </List>
      {/* </Paper> */}

      <br />

      {/* <br />
            <Button variant="contained" color="secondary" component={Link} to="/">
                {'Back to Home'}
            </Button> */}
    </Grid>
  );
};

export default StyledList;
