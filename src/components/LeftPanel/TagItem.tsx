import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { SingleTag } from '../../model/tag';
import { styled, alpha } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setFilter } from '../../features/mainPanel/main-panel-slice';
import { setSelectedTag } from '../../features/leftPanel/left-panel-slice';
import styles from '../../misc/app.module.css';

const TagItem: React.FC<SingleTag> = (props) => {
    const dispatch = useAppDispatch();
    const tag = useAppSelector((state) => state.leftPanel);


    function handleClick() {
        dispatch(setFilter(props.id));
        dispatch(setSelectedTag(props.id));
    }

    return (
        <ListItemButton className={styles.MuiSelected} selected={tag.selectedTag == props.id} onClick={handleClick}>
            <ListItemIcon>
                <CircleIcon sx={{ color: props['attributes']['color'] }} />
            </ListItemIcon>
            <ListItemText primary={props['attributes']['title']} />
        </ListItemButton>
    );
};

export default TagItem;
