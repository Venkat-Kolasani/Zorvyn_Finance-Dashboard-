import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useFinanceStore from './store/useFinanceStore';
import { SidebarProvider } from './context/SidebarContext';
import { Sidebar } from './components/layout';
import './App.css';

// Lazy load pages
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const TransactionsPage = React.lazy(() => import('./pages/TransactionsPage'));
const InsightsPage = React.lazy(() => import('./pages/InsightsPage'));

function App() {
  const darkMode = useFinanceStore((state) => state.darkMode);

  // Apply dark class to document root element for CSS variable theming
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <SidebarProvider>
      <div className="app-root">
        <BrowserRouter>
          <Sidebar />
          
          <Suspense fallback={
            <div className="loading-spinner-container">
              <div className="loading-spinner"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </SidebarProvider>
  );
}

export default App;
