import * as ContainerClass from "../../misc/constants";
import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { InputBase, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { SingleTag } from "../../model/tag";
import { createTaskOnDatabase } from "../../misc/database";
import { TaskContent } from "../../model/task";
import {
  setMainPanelCounter,
  setTaskList,
} from "../../features/mainPanel/main-panel-slice";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";

const CreateTask = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  justifyContent: "flex-start",
  marginLeft: 0,
  width: "25%",
  [theme.breakpoints.up("sm")]: {
    width: ContainerClass.centerContainerWidth,
  },
}));

const AddIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0),
  marginLeft: theme.spacing(2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  boxSizing: "border-box",
  width: "100%",
  color: "inherit",
  paddingLeft: "60px",
  margin: theme.spacing(0.5, 0, 0.5, 0),
}));

const CreateTaskField: React.FC = () => {
  const [task, setFieldState] = useState("");
  const listOfTags = useAppSelector((state) => state.leftPanel.allTags);
  const [errorState, setErrorState] = useState(false);

  const dispatch = useAppDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFieldState(event.target.value);
  }

  function handleSubmit(event: React.SyntheticEvent) {
    createTask(task);
    event.preventDefault();
  }

  const getTasks = () => {
    // reloads the task list in the main section 
    (async () => {
      await axios
        .get(`${ContainerClass.databaseLink}/labels`)
        .then((resp) => {
          const tasks = resp.data["included"];
          dispatch(setTaskList(tasks));
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  };

  function createTask(task: string) {
    const [taskName = "", dueDateAndTag = ""] = task
      .split(" on ")
      .map((x) => x.trim());
    const [dueDate = "", assignedTag = ""] = dueDateAndTag
      .split(" assign ")
      .map((x) => x.trim());

    const validityCheckOutput = isInputValid(taskName, dueDate, assignedTag);

    if (validityCheckOutput == "Valid") {
      console.log(assignedTag);
      const tagID = listOfTags.find(
        (tag: SingleTag) =>
          tag.attributes.title.toLowerCase() == assignedTag?.toLowerCase()
      )!.id;
      const taskContent: TaskContent = {
        title: taskName,
        completed: false,
        due: dueDate,
        label_id: tagID,
      };

      alert(" A new task was created:" + task);
      setFieldState("");
      createTaskOnDatabase(taskContent);
      getTasks();
    } else {
      alert(validityCheckOutput);
    }

    // console.log(response);
  }

  function isInputValid(
    taskName: string,
    dueDate: string,
    assignedTag: string
  ) {
    if (taskName == "") {
      return "An invalid task name provided. Please ensure that you have provided a valid task name.";
    } else if (!isNaN(Date.parse(dueDate))) {
      return "An invalid date and time has been provided. Please ensure that you have provided a valid date and time.";
    } else if (
      listOfTags.find(
        (x) => x.attributes.title.toLowerCase() == assignedTag.toLowerCase()
      ) == null
    ) {
      return "An invalid tag has been provided. Please ensure that a tag has been created.";
    } else {
      return "Valid";
    }
  }

  return (
    // <Box sx={{ flexGrow: 1, backgroundColor: 'black' }}>
    <Paper elevation={3} component="form" onSubmit={handleSubmit}>
      <CreateTask>
        <AddIconWrapper>
          <AddIcon />
        </AddIconWrapper>
        <StyledInputBase
          type="Create New Task"
          value={task}
          placeholder="<Task Name> on <Due Date And Time> assign <Tag Name>"
          inputProps={{ "aria-label": "Add" }}
          onChange={handleChange}
        />
      </CreateTask>
    </Paper>
    // </Box>
  );
};

export default CreateTaskField;
