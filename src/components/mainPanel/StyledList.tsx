// import SearchBar from '../components/SeachBar';
import * as ContainerClass from '../../misc/constants';
import NewListItem from './ListItem';
import { SingleTaskItem } from '../../model/task';
import { getTasks } from '../../misc/database';
import CreateTaskField from './CreateNewTaskField';
import { Divider, Grid, List, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setTaskList } from '../../features/mainPanel/main-panel-slice';

const useStyles = makeStyles(() => ({
    list: {
        width: ContainerClass.centerContainerWidth,
        height: window.innerHeight / 2,
    },
}));


const StyledList: React.FC = () => {
    const classes = useStyles();
    // const data = getTasks();
    const mainPanel = useAppSelector((state) => state.mainPanel);
    // const dispatch = useAppDispatch();
    const [counter, setCounter] = useState(0);
    

    if (counter == 0) {
        getTasks();
        setCounter(1);
    }


    return (
        <Grid container direction="column" alignItems="center">
            {/* <SearchField onChange={handleChange} /> */}
            <CreateTaskField />
            <br />
            <Paper elevation={3} style={{ maxHeight: 400 }}>
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
