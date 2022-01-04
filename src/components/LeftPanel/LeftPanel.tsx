import TagItem, { SingleTag } from './TagItem';
import { getLabels } from '../Misc/database';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import { makeStyles } from '@mui/styles';

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

const LeftPanel: React.FC = () => {
    const classes = useStyles();
    const data = getLabels();

    return (
        <Paper elevation={3} className={classes.list}>
            <List className={classes.list}>
                {data.map((tag: SingleTag) => (
                    <TagItem key={tag.id} {...tag} />
                ))}
            </List>
        </Paper>
    );
};

export default LeftPanel;
