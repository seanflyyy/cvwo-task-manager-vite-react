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
import CreateOrEditTagButton from './CreateOrEditTagButton';
import DividerForList from './DividerForList';

const useStyles = makeStyles(() => ({
  grid: {
    height: '100%',
  },
  leftPanel: {
    height: '100%',
    width: '22%',
    position: 'fixed',
    // zIndex: 1,
    top: 0,
    left: 0,
    flexDirection: 'column',
  },
  list: {
    maxHeight: '88%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
}));

const emptyRelationshipData = {
  tasks: {
    data: [{
      id: '',
      type: '',
    }],
  },
};

const LeftPanel: React.FC = () => {
  const classes = useStyles();
  const leftPanel = useAppSelector((state) => state.leftPanel);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      await axios
          .get(`${ContainerClass.databaseLink}/labels`, {
            headers: {
              'Authorization': `token ${localStorage.getItem('token')}`,
            },
          })
          .then((resp) => {
            const tags = resp.data['data'];
            dispatch(setAllTags(tags));
          })
          .catch((err) => {
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
              attributes: {
                title: 'All Tasks',
                color: 'black',
                slug: 'all-tasks',
                user_id: auth.user.id,
              },
              relationships: emptyRelationshipData,
            }}
          />
          <TagItem
            key={-2}
            {...{
              id: -2,
              attributes: {
                title: 'Incomplete',
                color: 'black',
                slug: 'completed',
                user_id: auth.user.id,
              },
              relationships: emptyRelationshipData,
            }} />
          <TagItem
            key={-1}
            {...{
              id: -1,
              attributes: {
                title: 'Complete',
                color: 'black',
                slug: 'completed',
                user_id: auth.user.id,
              },
              relationships: emptyRelationshipData,
            }} />
          <DividerForList/>
          {/* {leftPanel.allTags == null ?
          <div></div> : */}
          {leftPanel.allTags.map((tag: SingleTag) => (
            <TagItem key={tag.id} {...tag} />
          ))}

        </List>
      </div>
      <CreateOrEditTagButton {...{createOrEdit: 'Create', tagData: null,
        hideButtons: () => {}}}/>
    </Paper>
  );
};

export default LeftPanel;
