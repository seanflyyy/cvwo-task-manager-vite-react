import StyledList from '../components/mainPanel/StyledList';
import RightPanel from '../components/rightPanel/RightPanel';
import LeftPanel from '../components/leftPanel/LeftPanel';
import {useAppSelector} from '../app/hooks';

import React from 'react';
import Typewriter from 'typewriter-effect';

import {Typography, Grid} from '@mui/material';

import {useHistory} from 'react-router-dom';

const StyledPage: React.FC = () => {
  const rightPanelOpen = useAppSelector((state) => state.rightPanel);

  return (
    <Grid container direction="column">
      <LeftPanel />
      <Typography variant="h5" component="div" gutterBottom>
        <Typewriter
          options={{
            cursor: '',
          }}
          onInit={(typewriter) => {
            typewriter
                .changeDelay(80)
                .typeString('Welcome to your Task Manager!')
                .start();
          }}
        />
      </Typography>
      <br />
      <StyledList />

      {rightPanelOpen.rightPanel && <RightPanel />}
    </Grid>
  );
};

export default StyledPage;
