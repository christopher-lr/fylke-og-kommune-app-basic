import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "@digdir/designsystemet-css/index.css";
import "@digdir/designsystemet-css";
import "@digdir/designsystemet-css/theme";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
