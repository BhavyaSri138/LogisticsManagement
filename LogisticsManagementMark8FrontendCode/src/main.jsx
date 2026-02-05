import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { GoogleOAuthProvider } from '@react-oauth/google'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="621678769-109j701td2vjjrc7cl1lbrf7lneu9qn9.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
