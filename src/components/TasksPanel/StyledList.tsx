// import SearchBar from '../components/SeachBar';
import * as ContainerClass from '../misc/constants';
import NewListItem from './ListItem';
import { SingleTaskItem } from '../../model/task';
import { getTasks } from '../misc/database';
import SearchField from '../SearchField';
import CreateTaskField from '../CreateNewTaskField';
import { Grid, List, Paper } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    list: {
        width: ContainerClass.centerContainerWidth,
        height: window.innerHeight / 2,
    },
}));


const StyledList: React.FC = () => {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const data = getTasks();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // do the rest here
        console.log(e.nativeEvent.target);
        setQuery(e.target.value);
    };

    return (
        <Grid container direction="column" alignItems="center">
            <SearchField onChange={handleChange} />

            <br />
            <Paper elevation={3} style={{ maxHeight: 400 }}>
                <List className={classes.list}>
                    {data
                        .filter((task: SingleTaskItem) => {
                            if (query === '') {
                                return task;
                            } else if (task['attributes']['title'].toLowerCase().includes(query.toLowerCase())) {
                                return task;
                            }
                        })
                        .map((task: SingleTaskItem) => (
                            <NewListItem key={task.id} {...task} />
                        ))}
                </List>
            </Paper>

            <br />
            <CreateTaskField />

            {/* <br />
            <Button variant="contained" color="secondary" component={Link} to="/">
                {'Back to Home'}
            </Button> */}
        </Grid>
    );
};

export default StyledList;
