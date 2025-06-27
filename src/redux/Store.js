import { createStore } from '@reduxjs/toolkit';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import rootReducer from './Reducers/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const networkTransform = createTransform(
  (inboundState, key) => {
    const actionQueue = [];

    inboundState.actionQueue.forEach(action => {
      if (typeof action === 'function') {
        actionQueue.push({
          function: action.meta.name,
          args: action.meta.args,
        });
      } else if (typeof action === 'object') {
        actionQueue.push(action);
      }
    });

    return {
      ...inboundState,
      actionQueue,
    };
  },
  (outboundState, key) => {
    const actionQueue = [];

    outboundState.actionQueue.forEach(action => {
      actionQueue.push(action);
    });

    return { ...outboundState, actionQueue };
  },
  { whitelist: ['network'] },
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [networkTransform],
  whitelist: [],
};

const reducerPersist = persistReducer(persistConfig, rootReducer);

const store = createStore(reducerPersist);
export const persistor = persistStore(store);
export default store;
