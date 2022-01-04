import { getSpecificTask } from '../Misc/database';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Paper } from '@mui/material';

const useStyles = makeStyles(() => ({
    grid: {
        height: '100%',
        // paddingTop: '10vh',
        // paddingBottom: '10vh',
        // display: 'block',code
    },
    list: {
        width: window.outerWidth / 4,
        height: '100%',
        // padding: '20px',
    },
}));

const RightPanel: React.FC<number> = (id) => {
    const classes = useStyles();
    const [selectedTask, setTask] = useState(id);
    let data;

    // export function setTaskToEdit(id: number) {
    //     setTask(id);
    // }

    return (
        <Paper elevation={3} className={classes.list}>
            {/* <TextField id="standard-basic" value={data['id']} variant="standard" /> */}
            {/* <TaskTitle />
            <Button onClick={handleSubmit}>{'Submit'}</Button>
            <Button onClick={handleReset}>{'Reset'}</Button> */}
        </Paper>
    );
};

export default RightPanel;
