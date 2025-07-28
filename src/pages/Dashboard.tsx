import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import PortfolioChart from '../components/charts/PortfolioChart';
import AllocationChart from '../components/charts/AllocationChart';
import StockTable from '../components/ui/StockTable';
import { portfolioSummary } from '../utils/mockData';
const Dashboard = () => {
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Portfolio Dashboard</h1>
        <p className="text-muted-foreground">
          Track your investments and performance
        </p>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Value</p>
          <p className="text-2xl font-bold">
            ${portfolioSummary.totalValue.toLocaleString()}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Today's Change</p>
          <div className={`flex items-center ${portfolioSummary.dayChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <span className="text-2xl font-bold">
              ${Math.abs(portfolioSummary.dayChange).toLocaleString()}
            </span>
            <div className="ml-2 flex items-center">
              {portfolioSummary.dayChange >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
              <span className="ml-1">
                {Math.abs(portfolioSummary.dayChangePercent).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Gain</p>
          <div className={`flex items-center ${portfolioSummary.totalGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <span className="text-2xl font-bold">
              ${Math.abs(portfolioSummary.totalGain).toLocaleString()}
            </span>
            <div className="ml-2 flex items-center">
              {portfolioSummary.totalGain >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
              <span className="ml-1">
                {Math.abs(portfolioSummary.totalGainPercent).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Positions</p>
          <p className="text-2xl font-bold">7 Stocks</p>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Portfolio Performance</h2>
          <PortfolioChart height={300} />
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Asset Allocation</h2>
          <AllocationChart height={300} />
        </div>
      </div>
      {/* Stock Table */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-4">Your Stocks</h2>
        <StockTable />
      </div>
    </div>;
};
export default Dashboard;