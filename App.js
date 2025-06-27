import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store, { persistor } from './src/redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import ProvidersHOC from './src/ProvidersHOC';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ProvidersHOC />
      </PersistGate>
    </Provider>
  );
}
