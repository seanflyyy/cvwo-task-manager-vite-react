// import DateTimeWidget from '../RightPanel/formComponents/DateTimePicker';
import {
  ListItemButton,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { openRightPanel } from "../../features/rightPanel/right-panel-slice";
import { setTask } from "../../features/selectedTask/selected-task-slice";
import { SingleTaskItem } from "../../model/task";
import { getLabel, getLabels } from "../../misc/database";
import CircleIcon from "@mui/icons-material/Circle";

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
  var tagData = getLabel(props.attributes.label_id);


  function handleClick() {
    dispatch(openRightPanel());
    dispatch(setTask(props));
  }

  function convertDateToString(dateTime: string) {
    const date: Date = new Date(dateTime);
    const dateString = date.toString();
    const listDate: Array<string> = dateString.split(' ');
    const [dayOfWeek, month, dayOfMonth, year, time] = listDate;
    const convertedTime = convertTimeTo12Hours(time);
    const output = dayOfWeek + ', ' + dayOfMonth + ' ' + month + ', ' + convertedTime;
    return output;
  }

  function convertTimeTo12Hours (time: any) {
    var convertedTime = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { 
      convertedTime = convertedTime.slice (1); 

      convertedTime[3] = +convertedTime[0] < 12 ? ' AM' : ' PM'; 
      convertedTime[0] = +convertedTime[0] % 12 || 12; 
    }
    return convertedTime.join (''); // return adjusted time or original string
  }

  return (
      <ListItem button divider onClick={handleClick}>
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
        <ListItemText primary={props["attributes"]["title"]} secondary={convertDateToString(props["attributes"]["due"])} />
          {/* <ListItemText primary={convertDateToString(props["attributes"]["due"])} /> */}
        
        {tagData != null ? (
          <CircleIcon sx={{ color: tagData!.attributes.color }} />
        ) : (
          <div></div>
        )}
      </ListItem>

  );
};

export default NewListItem;
