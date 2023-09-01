import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store/store';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { NotificationProvider } from './components/NotificationProvider';
import { AuthProvider } from './contexts/AuthContext';
import Loader from './components/Loader';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <Suspense fallback={<Loader />}>
          <NotificationProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </NotificationProvider>
        </Suspense>
      </ReduxProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
