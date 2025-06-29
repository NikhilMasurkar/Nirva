import * as React from 'react';
import { Provider } from 'react-redux';
import store, { persistor } from './src/redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import ProvidersHOC from './src/ProvidersHOC';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ProvidersHOC />
      </PersistGate>
    </Provider>
  );
}
