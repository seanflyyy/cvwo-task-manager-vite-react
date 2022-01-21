import {useAppDispatch} from '../../../app/hooks';
import {closeRightPanel} from '../../../features/rightPanel/right-panel-slice';

import {IoMdClose} from 'react-icons/Io';

import {makeStyles} from '@mui/styles';
import {IconButton} from '@mui/material';

import React from 'react';

const useStyles = makeStyles(() => ({
  closePanelButton: {
    position: 'absolute',
    right: '5%',
  },
}));

const ClosePanelButton: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  return (
    <IconButton
      className={classes.closePanelButton}
      onClick={() => {
        dispatch(closeRightPanel());
      }}
    >
      <IoMdClose />
    </IconButton>
  );
};

export default ClosePanelButton;
