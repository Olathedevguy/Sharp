import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './context/Appcontext.jsx'
import { AIProvider } from './context/AIcontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <GlobalProvider>
    <AIProvider>
  <App />
  </AIProvider>
  </GlobalProvider>
    
  </BrowserRouter>,
)
