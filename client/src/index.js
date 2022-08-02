import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'
import { LoginProvider } from './context/LoginContext'
axios.defaults.baseURL = 'http://localhost:3001/api';
axios.defaults.withCredentials=true
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <LoginProvider>
      <App />
  </LoginProvider>,
)

