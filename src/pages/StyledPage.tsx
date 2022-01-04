import StyledList from '../components/StyledList';
import RightPanel from '../components/RightPanel/RightPanel';
import LeftPanel from '../components/LeftPanel/LeftPanel';
import React, { useState } from 'react';
import { Typography, Grid } from '@mui/material';
import Typewriter from 'typewriter-effect';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles(() => ({
    page: {
        backgroundColor: '#D7EAE9',
        minHeight: '100vh',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    box: {
        marginLeft: '20px',
        flexDirection: 'column',
        // justifyContent: 'center',
        // leftmargin: '20px',
        justifyContent: 'center',
    },
    newDiv: {
        top: '50%',
        margin: 'auto',
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const StyledPage: React.FC = () => {
    const classes = useStyles();
    const [selectedTaskID, setTaskID] = useState(0);

    // function generateListData() {

    // }

    function setSelectedTask(id: number) {
        setTaskID(id);
    }

    return (
        // <div className={classes.page}>
        // {/* <div className={classes.box}>
        //     <LeftPanel />
        // </div>
        // <div className={classes.box}>
        //     <StyledList />
        // </div>
        // <div className={classes.box}>
        //     <RightPanel />
        // </div> */}

        //     <br />
        //     <LeftPanel />
        //     <br />
        //     <StyledList />
        //     <br />
        //     <RightPanel />
        //     <br />
        // </div>
        <Grid container direction="column">
            <Typography variant="h5" component="div" gutterBottom>
                <Typewriter
                    options={{
                        cursor: '',
                    }}
                    onInit={(typewriter) => {
                        typewriter.changeDelay(80).typeString('Welcome to your Task Manager!').start();
                    }}
                />
            </Typography>
            <Grid container spacing={2} justifyContent="center" direction="row" paddingTop="20px">
                <Item>
                    <LeftPanel />
                </Item>
                <Item>
                    <StyledList setTaskID={() => setSelectedTask} />
                </Item>
                <Item>
                    <RightPanel {...selectedTaskID} />
                </Item>
            </Grid>
        </Grid>
    );
};

export default StyledPage;
