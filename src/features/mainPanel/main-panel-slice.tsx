// DUCKS pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SingleTaskItem } from "../../model/task";
// represents shape of state of slice handled by reducer
// type of state

interface MainPanelState {
  tagID: number;
  filterKeyword: string; 
  data: SingleTaskItem[];
}

// initial value
const initialState: MainPanelState = {
  tagID: 0,
  filterKeyword: '',
  data: [],
};

// slice that contains the reducer logic
const mainPanelSlice = createSlice({
  name: "mainPanel",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<number>) {
      state.tagID = action.payload;
      state.filterKeyword = state.filterKeyword; 
    },
    setFilterKeyword(state, action: PayloadAction<string>) {
      state.tagID = state.tagID;
      state.filterKeyword = action.payload;
    },
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

export const { setFilter , setFilterKeyword } = mainPanelSlice.actions;
export default mainPanelSlice.reducer;