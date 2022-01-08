import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { SingleTag } from '../../model/tag';
import { useAppDispatch } from '../../app/hooks';
import { setFilter } from '../../features/mainPanel/main-panel-slice';

const TagItem: React.FC<SingleTag> = (props) => {
    const dispatch = useAppDispatch();

    function handleClick() {
        dispatch(setFilter(props.id));
    }

    return (
        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
                <CircleIcon sx={{ color: props['attributes']['color'] }} />
            </ListItemIcon>
            <ListItemText primary={props['attributes']['title']} />
        </ListItemButton>
    );
};

export default TagItem;
