
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './components/ui/global-styles.css'
import { STORAGE_KEYS } from './utils/localStorage'

// Initialize local storage with empty arrays if they don't exist
const initializeLocalStorage = () => {
  const keys = Object.values(STORAGE_KEYS);
  keys.forEach(key => {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify([]));
    }
  });
};

// Initialize local storage on app start
initializeLocalStorage();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
