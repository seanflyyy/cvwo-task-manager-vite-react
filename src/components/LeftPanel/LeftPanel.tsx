import TagItem from './TagItem';
import SearchField from './SearchField';

import * as ContainerClass from '../../misc/constants';
import {setAllTags} from '../../features/leftPanel/left-panel-slice';
import {SingleTag} from '../../model/tag';
import {useAppDispatch, useAppSelector} from '../../app/hooks';

import React, {useEffect} from 'react';
import axios from 'axios';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import {makeStyles} from '@mui/styles';
import CreateTaskButton from './CreateTagButton';

const useStyles = makeStyles(() => ({
  grid: {
    height: '100%',
    // paddingTop: '10vh',
    // paddingBottom: '10vh',
    // display: 'block',code
  },
  leftPanel: {
    height: '100%',
    width: '22%',
    position: 'fixed',
    // zIndex: 1,
    top: 0,
    left: 0,
    // backgroundColor: '#232323',
    // display: 'flex',
    flexDirection: 'column',
    // padding: '20px',
  },
  list: {
    maxHeight: '88%',
    display: 'flex',
    flexDirection: 'column', 
    overflow: 'auto',
  }
}));

const LeftPanel: React.FC = () => {
  const classes = useStyles();
  const leftPanel = useAppSelector(state => state.leftPanel);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await axios
        .get(`${ContainerClass.databaseLink}/labels`)
        .then(resp => {
          const tags = resp.data['data'];
          dispatch(setAllTags(tags));
        })
        .catch(err => {
          console.log(err);
        });
    })();
  }, []);

  return (
    <Paper elevation={3} className={classes.leftPanel}>
      <SearchField />
      <div className={classes.list}> 
        <List >
          <TagItem
            key={0}
            {...{
              id: 0,
              attributes: {title: 'All Tasks', color: 'grey', slug: 'all-tasks'},
            }}
          />
          <TagItem
            key={-1}
            {...{
              id: -1,
              attributes: {title: 'Completed', color: 'black', slug: 'completed'},
            }}
          />
          {leftPanel.allTags.map((tag: SingleTag) => (
            <TagItem key={tag.id} {...tag} />
          ))}

        </List>
      </div> 
      <CreateTaskButton />
    </Paper>
  );
};

export default LeftPanel;
