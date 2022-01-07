// DUCKS pattern 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SingleTaskItem } from '../../model/task';
// represents shape of state of slice handled by reducer 
// type of state 

interface SelectedTaskState {
    attributes: {
        title: string; 
        completed: boolean;
        due: string; 
        label_id: number;
    }
    id: number; 
    // value: number;
}

// initial value 
const initialState: SelectedTaskState = {
    attributes: {
        title: "empty",
        completed: false,
        due: "not specified",
        label_id: 0,
    },
    id: 0,
}

// slice that contains the reducer logic
const taskSlice = createSlice({
    name: 'taskSelected',
    initialState, 
    reducers: {
        // incremented(state) {
        //     state.value++;
        //     // it's okay to do this because immer warps our state
        //     // updates and tracks all mutations we try to do 
        //     // replays them into safe immutable update when we are done
        // },
        // amountAdded(state, action: PayloadAction<number>) {
        //     state.value+= action.payload;
        // },
        // // decrement
        // // reset
        setTask(state, action:PayloadAction<SingleTaskItem>) {
            state.attributes.completed = action.payload.attributes.completed; 
            state.attributes.due = action.payload.attributes.due; 
            state.attributes.label_id = action.payload.attributes.label_id; 
            state.attributes.title = action.payload.attributes.title; 
            state.id = action.payload.id; 
        }, 
        updateTitle(state, action:PayloadAction<string>) {
            state.attributes.completed = state.attributes.completed; 
            state.attributes.due = state.attributes.due; 
            state.attributes.label_id = state.attributes.label_id ; 
            state.attributes.title = action.payload; 
            state.id =  state.id; 
        },
        updateDate(state, action:PayloadAction<string>) {
            state.attributes.completed = state.attributes.completed; 
            state.attributes.due = action.payload; 
            state.attributes.label_id = state.attributes.label_id ; 
            state.attributes.title = state.attributes.title; 
            state.id =  state.id; 
        },
    }
});

// in redux, we usually see action creators, a function that 
// returns an action object create slice made one of that for us 

export const { setTask, updateTitle, updateDate } = taskSlice.actions;
export default taskSlice.reducer; 


