import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { inject } from '@vercel/analytics'
import App from './App.jsx'
import Privacy from './Privacy.jsx'

inject()

const isPrivacy = window.location.pathname === '/privacy'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isPrivacy ? <Privacy /> : <App />}
  </StrictMode>
)
