import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { basicStoreConfig } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
const myPersistor = persistStore(basicStoreConfig);

//---- persistor -----///

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={basicStoreConfig}>
    <PersistGate persistor={myPersistor}>
    <App />
    </PersistGate>
  </Provider>
    
);

