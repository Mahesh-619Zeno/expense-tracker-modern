import { Provider } from "../context/context"; 
export { default as Details } from './Details/Details';
export { default as Main } from './Main/Main';
export { default as Snackbar } from './Snackbar/Snackbar';
export { default as InfoCard } from './InfoCard';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    <App />
  </Provider>
);