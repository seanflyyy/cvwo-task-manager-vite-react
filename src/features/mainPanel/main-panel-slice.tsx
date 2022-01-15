// DUCKS pattern
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SingleTaskItem} from '../../model/task';
// represents shape of state of slice handled by reducer
// type of state

interface MainPanelState {
  tagID: number;
  filterKeyword: string;
  data: SingleTaskItem[];
  counter: number;
}

// initial value
const initialState: MainPanelState = {
  tagID: 0,
  filterKeyword: '',
  data: [],
  counter: 0,
};

// slice that contains the reducer logic
const mainPanelSlice = createSlice({
  name: 'mainPanel',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<number>) {
      state.tagID = action.payload;
    },
    setFilterKeyword(state, action: PayloadAction<string>) {
      state.filterKeyword = action.payload;
    },
    setTaskList(state, action: PayloadAction<SingleTaskItem[]>) {
      state.data = action.payload;
    },
    setTaskData(state, action: PayloadAction<SingleTaskItem>) {
      const taskID = action.payload;
      const index = state.data.findIndex(task => taskID.id == task.id);
      state.data[index] = action.payload;
    },
    addToMainPanelTaskList(state, action: PayloadAction<SingleTaskItem>) {
      console.log(state.data);
      const listOfTags = state.data;
      listOfTags.push(action.payload);
      console.log(listOfTags);
    },
    setMainPanelCounter(state, action: PayloadAction<number>) {
      state.counter = state.counter + action.payload;
    },
  },
});

// in redux, we usually see action creators, a function that
// returns an action object create slice made one of that for us

export const {
  setFilter,
  setFilterKeyword,
  setTaskList,
  setTaskData,
  addToMainPanelTaskList,
  setMainPanelCounter,
} = mainPanelSlice.actions;
export default mainPanelSlice.reducer;
