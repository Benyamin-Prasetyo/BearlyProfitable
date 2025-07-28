import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertTriangle, DollarSign, BarChart3 } from 'lucide-react';
import { stockList, stockHistoricalData, portfolioSummary } from '../utils/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const StockDetail = () => {
  const {
    symbol
  } = useParams<{
    symbol: string;
  }>();
  const stock = stockList.find(s => s.symbol === symbol) || stockList[0];
  const historicalData = stockHistoricalData[stock.symbol as keyof typeof stockHistoricalData] || stockHistoricalData.AAPL;
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <img src={stock.logo} alt={stock.symbol} className="w-10 h-10 mr-3 object-contain" onError={e => {
          ;
          (e.target as HTMLImageElement).style.display = 'none';
        }} />
          <div>
            <h1 className="text-2xl font-bold">
              {stock.name} ({stock.symbol})
            </h1>
            <p className="text-muted-foreground">{stock.sector}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-2xl font-bold mr-3">
            ${stock.price.toFixed(2)}
          </div>
          <div className={`flex items-center ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stock.change >= 0 ? <ArrowUpRight size={24} className="mr-1" /> : <ArrowDownRight size={24} className="mr-1" />}
            <span className="font-medium">
              {Math.abs(stock.change).toFixed(2)} (
              {Math.abs(stock.changePercent).toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
      {/* Stock Chart */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-4">Price History</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={historicalData} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="date" tick={{
            fill: 'hsl(var(--muted-foreground))'
          }} />
            <YAxis tick={{
            fill: 'hsl(var(--muted-foreground))'
          }} domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
            color: 'hsl(var(--foreground))'
          }} formatter={(value: number) => [`$${value}`, 'Price']} />
            <Line type="monotone" dataKey="price" stroke={stock.change >= 0 ? '#10b981' : '#ef4444'} strokeWidth={2} dot={false} activeDot={{
            r: 8
          }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Position Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center mb-2">
            <DollarSign size={16} className="text-muted-foreground mr-2" />
            <p className="text-sm text-muted-foreground">Your Position</p>
          </div>
          <p className="text-xl font-bold">{stock.shares} shares</p>
          <p className="text-sm text-muted-foreground mt-1">
            ${stock.value.toLocaleString()} total value
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center mb-2">
            <TrendingUp size={16} className="text-muted-foreground mr-2" />
            <p className="text-sm text-muted-foreground">Average Cost</p>
          </div>
          <p className="text-xl font-bold">
            ${(stock.value / stock.shares - stock.change).toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Per share</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center mb-2">
            <BarChart3 size={16} className="text-muted-foreground mr-2" />
            <p className="text-sm text-muted-foreground">52-Week Range</p>
          </div>
          <p className="text-xl font-bold">
            ${(stock.price * 0.8).toFixed(2)} - $
            {(stock.price * 1.2).toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Current: ${stock.price.toFixed(2)}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center mb-2">
            <AlertTriangle size={16} className="text-muted-foreground mr-2" />
            <p className="text-sm text-muted-foreground">Portfolio %</p>
          </div>
          <p className="text-xl font-bold">
            {(stock.value / portfolioSummary.totalValue * 100).toFixed(2)}%
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Of total portfolio
          </p>
        </div>
      </div>
      {/* Technical Analysis Placeholder */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-4">Technical Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">RSI (14)</p>
            <p className="text-xl font-bold">56.78</p>
            <p className="text-xs text-muted-foreground mt-1">Neutral</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">MACD</p>
            <p className="text-xl font-bold text-green-500">Bullish</p>
            <p className="text-xs text-muted-foreground mt-1">Signal: 0.87</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">
              Moving Averages
            </p>
            <p className="text-xl font-bold">Above 50-day</p>
            <p className="text-xs text-muted-foreground mt-1">Below 200-day</p>
          </div>
        </div>
      </div>
    </div>;
};
export default StockDetail;