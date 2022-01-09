// DUCKS pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTasks } from "../../misc/database";
import { SingleTaskItem } from "../../model/task";
// represents shape of state of slice handled by reducer
// type of state

interface taskListState {
  data: SingleTaskItem[];
}

// initial value
const initialState: taskListState = {
  data: [],
};

// slice that contains the reducer logic
const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setTaskList(state, action: PayloadAction<SingleTaskItem[]>) {
      state.data = action.payload; 
    },
    setTaskData(state, action: PayloadAction<SingleTaskItem>) {
      const taskID = action.payload;
      const index = state.data.findIndex((task) => action.payload.id == task.id);
      state.data[index] = action.payload;
    },
  },
});



// in redux, we usually see action creators, a function that
// returns an action object create slice made one of that for us

export const { setTaskData } = taskListSlice.actions;
export default taskListSlice.reducer;