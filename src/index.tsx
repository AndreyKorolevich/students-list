import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import reducers  from './app/store';
import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import App from './App';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container!);
const store = createStore(reducers, compose(applyMiddleware(thunk)))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

