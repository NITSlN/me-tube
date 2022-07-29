import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'
import { LoginProvider } from './context/LoginContext'
axios.defaults.baseURL = 'https://me-tube-backend.herokuapp.com/api';
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <LoginProvider>
      <App />
  </LoginProvider>,
)
