import React from 'react';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  border: {
    borderBottom: '2px solid lightgray',
    width: '100%',
  },
  content: {
    paddingTop: 10,
    paddingBottom: 10,
    // paddingRight: ,
    // paddingLeft: theme.spacing(2),
    fontWeight: 500,
    fontSize: 22,
    color: 'lightgray',
  },
}));

const DividerForList = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.border} />
      <span className={classes.content}></span>
      <div className={classes.border} />
    </div>
  );
};
export default DividerForList;
