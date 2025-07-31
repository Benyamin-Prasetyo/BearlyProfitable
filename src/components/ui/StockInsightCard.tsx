import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertTriangle } from 'lucide-react';
import { stockList, stockHistoricalData } from '../../utils/mockData';

interface StockInsightCardProps {
  symbol: string;
  data?: typeof stockHistoricalData.AAPL;
  positiveHighlights?: string[];
  negativeHighlights?: string[];
}

const defaultPositiveHighlights = [
  "Strong revenue growth in recent quarter",
  "Expanding market share in key segments",
  "Successful product launch performance"
];

const defaultNegativeHighlights = [
  "Increasing competition in main markets",
  "Supply chain constraints impact",
  "Rising operational costs"
];

const StockInsightCard = ({
  symbol,
  data,
  positiveHighlights = defaultPositiveHighlights,
  negativeHighlights = defaultNegativeHighlights
}: StockInsightCardProps) => {
  const stock = stockList.find(s => s.symbol === symbol) || stockList[0];
  const historicalData = data || stockHistoricalData[stock.symbol as keyof typeof stockHistoricalData] || stockHistoricalData.AAPL;

  // Mock data for the table
  const stockMetrics = {
    volatility: "Medium",
    support: `$${(stock.price * 0.95).toFixed(2)}`,
    resistance: `$${(stock.price * 1.05).toFixed(2)}`,
    sixMonthHigh: `$${(stock.price * 1.15).toFixed(2)}`,
    sixMonthLow: `$${(stock.price * 0.85).toFixed(2)}`
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Header - Logo & Stock Ticker */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={stock.logo} 
            alt={stock.symbol} 
            className="w-10 h-10 mr-3 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div>
            <h2 className="text-xl font-semibold">{stock.name} ({stock.symbol})</h2>
            <p className="text-sm text-muted-foreground">{stock.sector}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-xl font-bold mr-3">
            ${stock.price.toFixed(2)}
          </div>
          <div className={`flex items-center ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stock.change >= 0 ? (
              <ArrowUpRight size={20} className="mr-1" />
            ) : (
              <ArrowDownRight size={20} className="mr-1" />
            )}
            <span className="font-medium">
              {Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historicalData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
              formatter={(value: number) => [`$${value}`, 'Price']}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8, fill: 'hsl(var(--primary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stock Data Table */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-accent/50 rounded-lg">
        <div>
          <p className="text-sm text-muted-foreground">Volatility</p>
          <p className="font-medium">{stockMetrics.volatility}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Support</p>
          <p className="font-medium">{stockMetrics.support}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Resistance</p>
          <p className="font-medium">{stockMetrics.resistance}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">6M High</p>
          <p className="font-medium">{stockMetrics.sixMonthHigh}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">6M Low</p>
          <p className="font-medium">{stockMetrics.sixMonthLow}</p>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Positive Highlights */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-500" size={20} />
            <h3 className="font-medium">Why doing well</h3>
          </div>
          <ul className="space-y-2">
            {positiveHighlights.map((highlight, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Negative Highlights */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            <h3 className="font-medium">Why not doing well</h3>
          </div>
          <ul className="space-y-2">
            {negativeHighlights.map((highlight, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StockInsightCard; 