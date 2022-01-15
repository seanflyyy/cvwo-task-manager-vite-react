// DUCKS pattern
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SingleTaskItem} from '../../model/task';
// represents shape of state of slice handled by reducer
// type of state

interface PanelsState {
  rightPanel: boolean;
}

// initial value
const initialState: PanelsState = {
  rightPanel: false,
};

// slice that contains the reducer logic
const panelSlice = createSlice({
  name: 'panelOpen',
  initialState,
  reducers: {
    closeRightPanel(state) {
      state.rightPanel = false;
    },
    openRightPanel(state) {
      state.rightPanel = true;
    },
  },
});

// in redux, we usually see action creators, a function that
// returns an action object create slice made one of that for us

export const {closeRightPanel, openRightPanel} = panelSlice.actions;
export default panelSlice.reducer;

1;
