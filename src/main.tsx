import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LoadingScreen } from './components/LoadingScreen.tsx'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

function Root() {
  const [loading, setLoading] = useState(true)

  if (loading) return <LoadingScreen onDone={() => setLoading(false)} />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
)
