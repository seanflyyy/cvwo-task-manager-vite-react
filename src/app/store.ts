import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counter-slice';
import taskSelectedReducer from '../features/selectedTask/selected-task-slice';
import panelOpenReducer from '../features/rightPanel/right-panel-slice';
import mainPanelReducer from '../features/mainPanel/main-panel-slice';
import leftPanelReducer from '../features/leftPanel/left-panel-slice';

import {apiSlice} from '../features/dogs/dogs-api-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskSelectedReducer,
    rightPanel: panelOpenReducer,
    mainPanel: mainPanelReducer,
    leftPanel: leftPanelReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
