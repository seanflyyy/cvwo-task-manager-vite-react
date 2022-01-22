
import taskSelectedReducer from '../features/selectedTask/selected-task-slice';
import panelOpenReducer from '../features/rightPanel/right-panel-slice';
import mainPanelReducer from '../features/mainPanel/main-panel-slice';
import leftPanelReducer from '../features/leftPanel/left-panel-slice';
import authReducer from '../features/auth/auth-slice';

import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    task: taskSelectedReducer,
    rightPanel: panelOpenReducer,
    mainPanel: mainPanelReducer,
    leftPanel: leftPanelReducer,
    auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(apiSlice.middleware);
  // },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
