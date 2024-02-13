// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MetaMaskProvider } from './contexts/MetaMaskContext'; // Make sure the path is correct
import './config/firebaseConfig';

const theme = createTheme({
  // theme settings
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MetaMaskProvider> {/* Wrap the App component with MetaMaskProvider */}
          <App />
        </MetaMaskProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
