// DUCKS pattern
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// represents shape of state of slice handled by reducer
// type of state
interface CounterState {
  value: number;
}

// initial value
const initialState: CounterState = {
  value: 0,
};

// slice that contains the reducer logic
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented(state) {
      state.value++;
      // it's okay to do this because immer warps our state
      // updates and tracks all mutations we try to do
      // replays them into safe immutable update when we are done
    },
    amountAdded(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    // decrement
    // reset
  },
});

// in redux, we usually see action creators, a function that
// returns an action object create slice made one of that for us

export const {incremented, amountAdded} = counterSlice.actions;
export default counterSlice.reducer;
