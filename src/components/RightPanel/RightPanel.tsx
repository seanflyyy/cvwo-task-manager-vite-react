import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Paper, Grid, Checkbox, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DateTimeWidget from "./components/DateTimePicker";
import TaskNameField from "./components/TaskNameField";
import SelectTag from "./components/SelectTag";
import { getLabels } from "../../misc/database";
import { SingleTag } from "../../model/tag";
import SubmitButton from "./components/SubmitButton";
import { IoMdClose } from "react-icons/Io";
import { closeRightPanel } from "../../features/rightPanel/right-panel-slice";

const useStyles = makeStyles(() => ({
  grid: {
    height: "100%",
  },
  iconButton: {
    position: 'absolute',
    right: '5%',
  },
  form: {
    height: '100%', 
    width: '22%',
    position: 'fixed',
    // zIndex: 1,
    top: 0,
    right: 0, 
    // backgroundColor: '#232323', 
    overflowX: 'hidden', 
    // display: 'flex',
    flexDirection: 'column' 
    
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

const RightPanel: React.FC = () => {
  const classes = useStyles();
  const selectedTask = useAppSelector((state) => state.task);
  const tags = useAppSelector((state) => state.leftPanel.allTags).map((tag: SingleTag) => ({
    title: tag.attributes.title,
    color: tag.attributes.color,
    id: tag.id,
    slug: tag.attributes.slug,
  }));
  const initialValueTag= tags.find((x) => x.id == selectedTask.attributes.label_id);
  const dispatch = useAppDispatch();

  return (
    <Paper
      elevation={3}
      component="form"
      className={classes.form}>
      <div> 
        <IconButton className={classes.iconButton} onClick={() => {dispatch(closeRightPanel())}}>
          <IoMdClose />
        </IconButton>
      </div>
      <br /> 
      <br /> 
      <TaskNameField {...selectedTask} />
      <br/>
      <DateTimeWidget {...selectedTask} />
      <br/>

      <SelectTag {...{initialValue: initialValueTag, listData: tags, taskData: selectedTask}} />
      <br />
      <br />
      <div> 
        <SubmitButton {...selectedTask} />
      </div> 
      
      
    </Paper>
  );
};

export default RightPanel;
