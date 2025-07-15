import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from "@react-oauth/google"; // Google OAuth provider


const clientId = "247666347106-5n0n8aq8p80qrb7mj70q239j4vk7kpof.apps.googleusercontent.com"; // Your Google Client ID

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
    <App />  {/* Use App component */}
  </GoogleOAuthProvider>
  </StrictMode>,
)
// src/main.jsx



