import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import componentsSlice from './component/components-slice';
import userSlice from './user/user-slice';
import schoolsSlice from './school/reducer';

const reducer = combineReducers({
  // add all reducers here
  componentsSlice,
  userSlice,
  schoolsSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['components', 'onboarding'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production' ? true : false,
});

export const persistor = persistStore(store);
