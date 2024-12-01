import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import Store from "./redux/Store";
import './style/index.css';
import { initialFetch } from './redux/features/adminSlice.js';
Store.dispatch(initialFetch());

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <App />
    </Provider>
)
