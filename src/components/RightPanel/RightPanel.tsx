import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Paper, Grid, Checkbox } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DateTimeWidget from "./DateTimePicker";
import { TaskNameField } from "./TaskNameField";
import { DateTimeField } from "./DateTimeField";

const useStyles = makeStyles(() => ({
  grid: {
    height: "100%",
  },
  list: {
    width: window.outerWidth / 4,
    height: "100%",
  },
  textField: {
    paddingLeft: 15,
    width: "70%",
    overflowWrap: "break-word",
  },
  text: {
    fontWeight: "bolder",
  },
  firstElement: {
    paddingLeft: 0,
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 10,
  },
}));

// const styles = theme => ({
//     multilineColor:{
//         color:'red'
//     }
// });
const RightPanel: React.FC = () => {
  const classes = useStyles();
  const selectedTask = useAppSelector((state) => state.task);
//   const dispatch = useAppDispatch();



  return (
    <Paper
      elevation={3}
      component="form"
      className={classes.list}>
      <TaskNameField {...selectedTask} />
      <DateTimeWidget {...selectedTask} />
    </Paper>
  );
};

export default RightPanel;
