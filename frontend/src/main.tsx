import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Importa il file CSS con Tailwind

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
