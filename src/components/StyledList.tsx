// import SearchBar from '../components/SeachBar';
import * as ContainerClass from './Misc/constants';
import NewListItem, { SingleTaskItem } from './ListItem/ListItem';
import { getTasks } from './Misc/database';
import SearchField from '../components/SearchField';
import CreateTaskField from '../components/CreateNewTaskField';
import { Grid, List, Paper } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    list: {
        width: ContainerClass.centerContainerWidth,
        height: window.innerHeight / 2,
    },
}));

interface HandleTaskSelect {
    setTaskID: React.MouseEventHandler<HTMLDivElement>;
}

const StyledList: React.FC<HandleTaskSelect> = (setTaskID) => {
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
                        .map((task: SingleTaskItem) => {
                            const object = { task: task, onSelect: setTaskID };
                            return <NewListItem key={task.id} {...object} />;
                        })}
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
