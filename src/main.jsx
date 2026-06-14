import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "@digdir/designsystemet-css/index.css"
import "@digdir/designsystemet-css"
import "@digdir/designsystemet-css/theme"

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') return
  const { worker } = await import('./mocks/browser')
  return worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledRequest: 'bypass',
  })
}

enableMocking().then(() => {
  const rootElement = document.getElementById('root')
  if (!rootElement) return
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})