import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../reducres';
const store = configureStore({
  reducer: {
    data: rootReducer,
  },
});

export type rootState = ReturnType<typeof store.getState>;
export default store;
