// DUCKS pattern
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SingleTaskItem} from '../../model/task';
// represents shape of state of slice handled by reducer
// type of state

interface SelectedTaskState {
  attributes: {
    title: string;
    completed: boolean;
    due: string;
    label_id: number;
    user_id: number,
  };
  id: number;
  // value: number;
}

// initial value
const initialState: SelectedTaskState = {
  attributes: {
    title: 'empty',
    completed: false,
    due: 'not specified',
    label_id: 0,
    user_id: -1,
  },
  id: 0,
};

// slice that contains the reducer logic
const taskSlice = createSlice({
  name: 'taskSelected',
  initialState,
  reducers: {
    setTask(state, action: PayloadAction<SingleTaskItem>) {
      state.attributes.completed = action.payload.attributes.completed;
      state.attributes.due = action.payload.attributes.due;
      state.attributes.label_id = action.payload.attributes.label_id;
      state.attributes.title = action.payload.attributes.title;
      state.attributes.user_id = action.payload.attributes.user_id;
      state.id = action.payload.id;
    },
    updateTitle(state, action: PayloadAction<string>) {
      state.attributes.title = action.payload;
    },
    updateDate(state, action: PayloadAction<string>) {
      state.attributes.due = action.payload;
    },
    updateTag(state, action: PayloadAction<number>) {
      state.attributes.label_id = action.payload;
    },
    updateCompletedState(state) {
      state.attributes.completed = !state.attributes.completed;
    },
  },
});

// in redux, we usually see action creators, a function that
// returns an action object create slice made one of that for us

export const {
  setTask,
  updateTitle,
  updateDate,
  updateTag,
  updateCompletedState,
} = taskSlice.actions;
export default taskSlice.reducer;
