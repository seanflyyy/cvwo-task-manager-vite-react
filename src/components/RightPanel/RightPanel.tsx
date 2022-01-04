import { getSpecificTask } from '../misc/database';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const useStyles = makeStyles(() => ({
    grid: {
        height: '100%',
    },
    list: {
        width: window.outerWidth / 4,
        height: '100%',
    },
}));

const RightPanel: React.FC = () => {
    const classes = useStyles();
    const selectedTask = useAppSelector((state) => state.task);
    const dispatch = useAppDispatch();
    

    return (
        <Paper elevation={3} className={classes.list}>
            <TextField id="standard-basic" value={selectedTask.attributes.title} variant="standard" />
            {/* <TaskTitle />
            <Button onClick={handleSubmit}>{'Submit'}</Button>
            <Button onClick={handleReset}>{'Reset'}</Button> */}
        </Paper>
    );
};

export default RightPanel;
