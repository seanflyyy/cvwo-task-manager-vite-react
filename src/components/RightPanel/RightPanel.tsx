import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Paper, Grid, Checkbox } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DateTimeWidget from "./DateTimePicker";
import TaskNameField from "./TaskNameField";
import SelectTag from "./SelectTag";
import { getLabels } from "../misc/database";
import { SingleTag } from "../../model/tag";

const useStyles = makeStyles(() => ({
  grid: {
    height: "100%",
  },
  list: {
    width: window.outerWidth / 4,
    height: "100%",
    alignItems: "center",
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
  const tags = getLabels().map((tag: SingleTag) => ({
    title: tag.attributes.title,
    color: tag.attributes.color,
    id: tag.id,
    slug: tag.attributes.slug,
  }));
  const initialValueTag= tags.find((x) => x.id == selectedTask.attributes.label_id);



  return (
    <Paper
      elevation={3}
      component="form"
      className={classes.list}>
      <TaskNameField {...selectedTask} />
      <DateTimeWidget {...selectedTask} />
      <SelectTag {...{initialValue: initialValueTag, listData: tags, taskData: selectedTask}} />
    </Paper>
  );
};

export default RightPanel;
