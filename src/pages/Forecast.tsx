import React, { useState } from 'react';
import { TrendingUp, Info } from 'lucide-react';
import ForecastChart from '../components/charts/ForecastChart';
import { stockList } from '../utils/mockData';
const Forecast = () => {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [forecastPeriod, setForecastPeriod] = useState('6');
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Stock Forecast</h1>
        <p className="text-muted-foreground">AI-powered price predictions</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label htmlFor="stock-select" className="block text-sm font-medium mb-1">
                Select Stock
              </label>
              <select id="stock-select" value={selectedStock} onChange={e => setSelectedStock(e.target.value)} className="w-full sm:w-40 px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                {stockList.map(stock => <option key={stock.symbol} value={stock.symbol}>
                    {stock.symbol} - {stock.name}
                  </option>)}
              </select>
            </div>
            <div>
              <label htmlFor="period-select" className="block text-sm font-medium mb-1">
                Forecast Period
              </label>
              <select id="period-select" value={forecastPeriod} onChange={e => setForecastPeriod(e.target.value)} className="w-full sm:w-40 px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </select>
            </div>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            <TrendingUp size={16} className="mr-2" />
            Generate Forecast
          </button>
        </div>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-medium">
              {selectedStock} Price Forecast
            </h2>
            <div className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
              AI Prediction
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Forecast based on historical data, market trends, and sentiment
            analysis
          </p>
        </div>
        <div className="h-[400px]">
          <ForecastChart symbol={selectedStock} height={400} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Forecast Insights</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={16} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">Upward Trend Detected</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI model predicts a positive trend for {selectedStock}{' '}
                  over the next {forecastPeriod} months with 76% confidence.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={16} className="text-green-500" />
              </div>
              <div>
                <h3 className="font-medium">Support Level Identified</h3>
                <p className="text-sm text-muted-foreground">
                  Strong support level detected at $185.20. Price expected to
                  bounce from this level if tested.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <Info size={16} className="text-yellow-500" />
              </div>
              <div>
                <h3 className="font-medium">Upcoming Catalysts</h3>
                <p className="text-sm text-muted-foreground">
                  Earnings report in 3 weeks and product announcement could
                  impact price trajectory.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Price Targets</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Bullish Case</span>
                <span className="text-green-500 font-medium">$245.30</span>
              </div>
              <div className="w-full bg-accent h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full" style={{
                width: '80%'
              }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                80% upside potential
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Base Case</span>
                <span className="text-blue-500 font-medium">$214.56</span>
              </div>
              <div className="w-full bg-accent h-2 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full" style={{
                width: '55%'
              }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                55% upside potential
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Bearish Case</span>
                <span className="text-red-500 font-medium">$165.20</span>
              </div>
              <div className="w-full bg-accent h-2 rounded-full">
                <div className="bg-red-500 h-2 rounded-full" style={{
                width: '25%'
              }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                25% downside risk
              </p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-accent/50 rounded-md">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> These forecasts are based on AI analysis of
              historical data, market trends, and sentiment. Actual results may
              vary. Always perform your own research before making investment
              decisions.
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default Forecast;