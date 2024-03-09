import React from 'react';
import App from './App';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import * as ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'; 
import axios from 'axios';
import { store } from './Components/Store/Index';

axios.defaults.baseURL = 'http://localhost:5000';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider>
        <Provider store={store}>
        <App />
        </Provider>
      </ThemeProvider>
  </React.StrictMode>
);
