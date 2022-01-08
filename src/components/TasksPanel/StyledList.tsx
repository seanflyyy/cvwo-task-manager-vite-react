// import SearchBar from '../components/SeachBar';
import * as ContainerClass from '../../misc/constants';
import NewListItem from './ListItem';
import { SingleTaskItem } from '../../model/task';
import { getTasks } from '../../misc/database';
import CreateTaskField from './CreateNewTaskField';
import { Grid, List, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useAppSelector } from '../../app/hooks';

const useStyles = makeStyles(() => ({
    list: {
        width: ContainerClass.centerContainerWidth,
        height: window.innerHeight / 2,
    },
}));


const StyledList: React.FC = () => {
    const classes = useStyles();
    const data = getTasks();
    const filter = useAppSelector((state) => state.mainPanel);


    return (
        <Grid container direction="column" alignItems="center">
            {/* <SearchField onChange={handleChange} /> */}
            <CreateTaskField />
            
            <Paper elevation={3} style={{ maxHeight: 400 }}>
                <List className={classes.list}>
                    {data
                        .filter((task: SingleTaskItem) => {
                            if (filter.filterKeyword === '') {
                                return task;
                            } else if (task['attributes']['title'].toLowerCase().includes(filter.filterKeyword.toLowerCase())) {
                                return task;
                            }
                        })
                        .filter((task: SingleTaskItem) => {
                            if (filter.tagID == null) {
                                return task;
                            } else if (task.attributes.label_id == filter.tagID) {
                                return task; 
                            }
                        })
                        .map((task: SingleTaskItem) => (
                            <NewListItem key={task.id} {...task} />
                        ))}
                </List>
            </Paper>

            <br />
         

            {/* <br />
            <Button variant="contained" color="secondary" component={Link} to="/">
                {'Back to Home'}
            </Button> */}
        </Grid>
    );
};

export default StyledList;
