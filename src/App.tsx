import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import StockDetail from './pages/StockDetail';
import Forecast from './pages/Forecast';
import AIInsights from './pages/AIInsights';
import TickerEntry from './pages/TickerEntry';
import PortfolioRecommendation from './pages/PortfolioRecommendation';
import StockInsight from './pages/StockInsight';
import { ThemeProvider } from './components/ThemeProvider';
import { SelectedTickersProvider } from './components/SelectedTickersContext';

function AppLayout({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (open: boolean) => void }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {!isLanding && <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {!isLanding && <Navbar onMenuClick={() => setSidebarOpen(true)} />}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<TickerEntry />} />
            <Route path="/portfolio-recommendation" element={<PortfolioRecommendation />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stock/:symbol" element={<StockDetail />} />
            <Route path="/stock-insight" element={<StockInsight />} />
            <Route path="/stock-insight/:symbol" element={<StockInsight />} />
            <Route path="/ai-insights" element={<AIInsights />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <ThemeProvider>
      <SelectedTickersProvider>
        <Router>
          <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </Router>
      </SelectedTickersProvider>
    </ThemeProvider>
  );
}