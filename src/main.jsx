import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './context/Appcontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <GlobalProvider>
  <App />
  </GlobalProvider>
    
  </BrowserRouter>,
)
