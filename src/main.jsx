import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0b0d0e',
          color: '#f5f5f0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#ff1e2d' }}>
            System Encountered an Issue
          </h1>
          <p style={{ color: '#9aa1a0', maxWidth: '420px', marginBottom: '24px', fontSize: '0.95rem', lineHeight: '1.5' }}>
            A temporary display error occurred. Please reload to restore the workspace.
          </p>
          <button
            onClick={() => {
              try { sessionStorage.clear(); } catch (_) {}
              window.location.reload();
            }}
            style={{
              padding: '10px 24px',
              borderRadius: '9999px',
              backgroundColor: '#ff1e2d',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}
          >
            Reload Portfolio
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

