import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import "./styles/global.css";
import { ToastProvider } from './context/ToastContext.js';
import './styles/Toast.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <ToastProvider>
      <App />
      </ToastProvider>
    </AppProvider>
  </React.StrictMode>
);
