import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { FlowProvider } from './state/FlowContext.jsx'
import { C3Provider } from './state/C3Context.jsx'
import './styles/global.css'
import './styles/components.css'

// HashRouter so deep links work on GitHub Pages (static host, no server-side
// routing). v7_startTransition stays OFF — it defers the route swap, which our
// timer-driven navigations (building → discover) don't want.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter future={{ v7_relativeSplatPath: true }}>
      <FlowProvider>
        <C3Provider>
          <App />
        </C3Provider>
      </FlowProvider>
    </HashRouter>
  </React.StrictMode>,
)
