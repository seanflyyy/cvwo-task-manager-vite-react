// import DateTimeWidget from '../RightPanel/formComponents/DateTimePicker';
import { ListItemButton, Checkbox, ListItemIcon, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

export interface SingleTaskItem {
    attributes: TaskContent;
    id: number;
}

interface TaskContent {
    title: string;
    completed: boolean;
    due: string;
    label_id: number;
}

interface HandleTaskSelect {
    setTaskID: React.MouseEventHandler<HTMLDivElement>;
}

export type SingleTaskItemInterface = {
    task: SingleTaskItem;
    onSelect: HandleTaskSelect;
};

const useStyles = makeStyles(() => ({
    checkbox: {
        '&$checked': {
            color: '#F5B369',
        },
    },
    checked: {},
}));

const NewListItem: React.FC<SingleTaskItemInterface> = (props) => {
    const classes = useStyles();

    return (
        <ListItemButton onClick={props.onSelect.setTaskID}>
            <ListItemIcon>
                <Checkbox
                    value={props.task['attributes']['completed']}
                    edge="start"
                    classes={{
                        root: classes.checkbox,
                        checked: classes.checked,
                    }}
                />
            </ListItemIcon>
            <ListItemText primary={props.task['attributes']['title']} />
            {/* <DateTimeWidget {...props} /> */}
            <ListItemText primary={props.task['attributes']['label_id']} />
        </ListItemButton>
    );
};

export default NewListItem;
