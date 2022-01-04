import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';

export interface SingleTag {
    id: number;
    attributes: TagContent;
    relationships: {
        tasks: {
            data: Tasks;
        };
    };
}

interface TagContent {
    title: string;
    color: string;
    slug: string;
}

interface Tasks {
    id: string;
    type: string;
}

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
