// import SearchBar from '../components/SeachBar';
import * as ContainerClass from '../../misc/constants';
import NewListItem from './ListItem';
import { SingleTaskItem } from '../../model/task';
import CreateTaskField from './CreateNewTaskField';
import { Divider, Grid, List, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setMainPanelCounter, setTaskList } from '../../features/mainPanel/main-panel-slice';
import axios from 'axios';

const useStyles = makeStyles(() => ({
    list: {
        width: ContainerClass.centerContainerWidth,
        height: '100%',
    },
}));


const StyledList: React.FC = () => {
    const classes = useStyles();
    const mainPanel = useAppSelector((state) => state.mainPanel);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        (async () => {
            await axios
              .get(`${ContainerClass.databaseLink}/labels`)
              .then((resp) => {
                const tasks = resp.data["included"];
                dispatch(setTaskList(tasks));
              })
              .catch((err) => {
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
                            } else if (task['attributes']['title'].toLowerCase().includes(mainPanel.filterKeyword.toLowerCase())) {
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
