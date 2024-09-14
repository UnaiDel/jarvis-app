import React from 'react';
import ReactDOM from 'react-dom/client'; // Usa ReactDOM de client
import './index.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Usa createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
