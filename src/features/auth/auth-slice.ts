// DUCKS pattern
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// represents shape of state of slice handled by reducer
// type of state
interface UserInterface {
    email: string,
    created_at: string,
    id: number,
    password_digest: string,
    updated_at: string,
}

interface authState {
  loggedInStatus: string,
  user: UserInterface,
}

// initial value
const initialState: authState = {
  loggedInStatus: 'NOT_LOGGED_IN',
  user: {
    email: '',
    created_at: '',
    id: 0,
    password_digest: '',
    updated_at: '',
  },
};

// slice that contains the reducer logic
const authSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    handleLogin(state, action: PayloadAction<UserInterface>) {
      state.loggedInStatus = 'LOGGED_IN';
      state.user = action.payload;
    },
  },
});

// in redux, we usually see action creators, a function that
// returns an action object create slice made one of that for us

export const {handleLogin} = authSlice.actions;
export default authSlice.reducer;
