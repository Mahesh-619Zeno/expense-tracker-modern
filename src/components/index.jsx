import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
import { Provider } from "../context/context"; 
export { default as Details } from './Details/Details';
export { default as Main } from './Main/Main';
export { default as Snackbar } from './Snackbar/Snackbar';
export { default as InfoCard } from './InfoCard';

export const initApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider>
      <App />
    </Provider>
  );
};