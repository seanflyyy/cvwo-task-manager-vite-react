// DUCKS pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// represents shape of state of slice handled by reducer
// type of state

interface MainPanelState {
  tagID: number | null;
  filterKeyword: string; 
}

// initial value
const initialState: MainPanelState = {
  tagID: null,
  filterKeyword: '',
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
    }
  },
});

// in redux, we usually see action creators, a function that
// returns an action object create slice made one of that for us

export const { setFilter , setFilterKeyword } = mainPanelSlice.actions;
export default mainPanelSlice.reducer;