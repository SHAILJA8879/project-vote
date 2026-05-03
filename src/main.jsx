import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ReactGA from 'react-ga4'
import './index.css'
import App from './App.jsx'

// Initialize Google Analytics (Replace with your Measurement ID)
ReactGA.initialize('G-41MVNEE1YG')

// Send pageview for the initial load
ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="475970663991-s15ae6gm4or4b628bhvmctnbd1rgb9qm.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
