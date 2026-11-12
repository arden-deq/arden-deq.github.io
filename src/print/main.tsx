import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import './print.css'
import PrintPortfolio from './PrintPortfolio'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrintPortfolio />
  </StrictMode>,
)

// scripts/export-pdf.mjs waits for this flag before printing.
document.fonts.ready.then(() => {
  document.documentElement.dataset.ready = 'true'
})
