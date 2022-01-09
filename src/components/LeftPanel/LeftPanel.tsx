import TagItem from './TagItem';
import { SingleTag } from '../../model/tag';
import { getLabels } from '../../misc/database';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import { makeStyles } from '@mui/styles';
import SearchField from './SearchField';

const useStyles = makeStyles(() => ({
    grid: {
        height: '100%',
        // paddingTop: '10vh',
        // paddingBottom: '10vh',
        // display: 'block',code
    },
    list: {
        height: '100%', 
        width: '22%',
        position: 'fixed',
        // zIndex: 1,
        top: 0,
        left: 0, 
        // backgroundColor: '#232323', 
        overflowX: 'hidden', 
        // display: 'flex',
        flexDirection: 'column' 
        // padding: '20px',
    },
}));



const LeftPanel: React.FC = () => {
    const classes = useStyles();
    const data = getLabels();

    return (
        <Paper elevation={3} className={classes.list}>
            <SearchField />
            <List>
                {data.map((tag: SingleTag) => (
                    <TagItem key={tag.id} {...tag} />
                ))}
            </List>
        </Paper>
    );
};

export default LeftPanel;
