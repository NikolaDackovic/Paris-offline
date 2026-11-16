import { Component, StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StoreProvider } from './store';
import { PwaProvider } from './pwa';
import { ToastProvider } from './components/ui';
import './styles.css';
import './upgrade.css';

// Zaštita od praznog ekrana: ako se nešto pokvari, prikaži poruku i dugme za povratak.
class ErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="screen" style={{ padding: 24 }}>
          <h1 className="page-title">Ups…</h1>
          <p>Došlo je do greške u prikazu. Vaši podaci su sačuvani.</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => {
              window.location.hash = '#/danas';
              window.location.reload();
            }}
          >
            Vrati se na početak
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PwaProvider>
        <StoreProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </StoreProvider>
      </PwaProvider>
    </ErrorBoundary>
  </StrictMode>
);
