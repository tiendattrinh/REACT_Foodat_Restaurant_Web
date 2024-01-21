// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import App from './App.jsx';
import './index.css';
import { store, persistor } from './pages/redux/stores/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>,
);
