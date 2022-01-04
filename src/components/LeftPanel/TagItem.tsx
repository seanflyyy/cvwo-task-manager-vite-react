import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { SingleTag } from '../../model/tag';

const TagItem: React.FC<SingleTag> = (props) => {
    return (
        <ListItem>
            <ListItemIcon>
                <CircleIcon sx={{ color: props['attributes']['color'] }} />
            </ListItemIcon>
            <ListItemText primary={props['attributes']['title']} />
        </ListItem>
    );
};

export default TagItem;
