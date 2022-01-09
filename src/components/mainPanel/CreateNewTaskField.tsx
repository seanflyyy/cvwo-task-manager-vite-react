import * as ContainerClass from '../../misc/constants';
import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { InputBase, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CreateTask = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    justifyContent: 'flex-start',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: ContainerClass.centerContainerWidth,
    },
}));

const AddIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 0),
    marginLeft: theme.spacing(2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    boxSizing: 'border-box',
    width: '100%',
    color: 'inherit',
    paddingLeft: '60px',
    margin: theme.spacing(0.5, 0, 0.5, 0),
}));

// type Props = {
//     onSubmit: (e: React.KeyboardEvent<FormControl>) => void;
// };

const CreateTaskField: React.FC = () => {
    const [task, setFieldState] = useState('');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFieldState(event.target.value);
    }

    function handleSubmit(event: React.SyntheticEvent) {
        alert(' A new task was created:' + task);
        setFieldState('');
        event.preventDefault();
    }

    return (
        // <Box sx={{ flexGrow: 1, backgroundColor: 'black' }}>
        <Paper elevation={3} component="form" onSubmit={handleSubmit}>
            <CreateTask>
                <AddIconWrapper>
                    <AddIcon />
                </AddIconWrapper>
                <StyledInputBase
                    type="Create New Task"
                    value={task}
                    placeholder="Add…"
                    inputProps={{ 'aria-label': 'Add' }}
                    onChange={handleChange}
                />
            </CreateTask>
        </Paper>
        // </Box>
    );
};

export default CreateTaskField;
