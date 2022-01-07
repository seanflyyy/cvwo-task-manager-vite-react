import { Checkbox, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAppDispatch } from "../../app/hooks";
import { updateDate, updateTitle } from "../../features/selectedTask/selected-task-slice";
import { SingleTaskItem } from "../../model/task";
import { updateTask } from "../misc/database";

const useStyles = makeStyles(() => ({
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

export const DateTimeField: React.FC<SingleTaskItem> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(updateDate(event.target.value));
  }

  function keyPress(e: any){
    if(e.keyCode == 13){
       updateTask(props.id, props.attributes);
    }
 }

  return (
    <Grid className={classes.firstElement}>
      <Checkbox value={props.attributes.completed} />
      <TextField
        className={classes.textField}
        id="standard-basic"
        value={props.attributes.due}
        onChange={handleChange}
        InputProps={{
          className: classes.text,
        }}
        onKeyDown={keyPress}
        variant="standard"
      />
    </Grid>
  );
};
