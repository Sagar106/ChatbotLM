import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


const App = lazy(() => import("./App"))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense
      fallback={
        <div className='flex h-screen items-center justify-center bg-[#242424] animate-pulse text-gray-400'>
          ToolLM is getting ready...
        </div>
      }
    >
      <App />
    </Suspense>
  </StrictMode>,
)
