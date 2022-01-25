// DUCKS pattern
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// represents shape of state of slice handled by reducer
// type of state
import {SingleTag} from '../../model/tag';

interface leftPanelState {
  selectedTag: SingleTag;
  allTags: SingleTag[];
}

// initial value
const initialState: leftPanelState = {
  selectedTag: {
    id: 0,
    attributes: {
      title: 'string',
      color: '',
      slug: '',
      user_id: 0,
    },
    relationships: {
      tasks: {
        data: [],
      },
    },
  },
  allTags: [],
};

// slice that contains the reducer logic
const leftPanelSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    setSelectedTag(state, action: PayloadAction<SingleTag>) {
      state.selectedTag = action.payload;
    },
    setAllTags(state, action: PayloadAction<SingleTag[]>) {
      state.allTags = action.payload;
    },
  },
});

// in redux, we usually see action creators, a function that
// returns an action object create slice made one of that for us

export const {setSelectedTag, setAllTags} = leftPanelSlice.actions;
export default leftPanelSlice.reducer;
