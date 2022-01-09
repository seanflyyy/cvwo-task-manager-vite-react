// DUCKS pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTasks } from "../../misc/database";
import { SingleTaskItem } from "../../model/task";
// represents shape of state of slice handled by reducer
// type of state

interface leftPanelState {
  selectedTag: number; 
}

// initial value
const initialState: leftPanelState = {
  selectedTag: 0,
};

// slice that contains the reducer logic
const leftPanelSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setSelectedTag(state, action: PayloadAction<number>) {
      state.selectedTag = action.payload; 
    },
  },
});



// in redux, we usually see action creators, a function that
// returns an action object create slice made one of that for us

export const { setSelectedTag } = leftPanelSlice.actions;
export default leftPanelSlice.reducer;