// import DateTimeWidget from '../RightPanel/formComponents/DateTimePicker';
import {
  ListItemButton,
  Checkbox,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { openRightPanel } from "../../features/rightPanel/right-panel-slice";
import { setTask } from "../../features/selectedTask/selected-task-slice";
import { SingleTaskItem } from "../../model/task";

interface HandleTaskSelect {
  setTaskID: React.MouseEventHandler<HTMLDivElement>;
}

const useStyles = makeStyles(() => ({
  checkbox: {
    "&$checked": {
      color: "#F5B369",
    },
  },
  checked: {},
}));

const NewListItem: React.FC<SingleTaskItem> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  function handleClick() {
    console.log(props);
    dispatch(openRightPanel());
    dispatch(setTask(props));
  }

  return (
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <Checkbox
          value={props["attributes"]["completed"]}
          edge="start"
          classes={{
            root: classes.checkbox,
            checked: classes.checked,
          }}
        />
      </ListItemIcon>
      <ListItemText primary={props["attributes"]["title"]} />
      <ListItemText primary={props["attributes"]["label_id"]} />
    </ListItemButton>
  );
};

export default NewListItem;
