import React from 'react';
import { useLocation } from 'react-router-dom';
import { stockList } from '../utils/mockData';
import { useSelectedTickers } from '../components/SelectedTickersContext';
import ForecastChart from '../components/charts/ForecastChart';
import { TrendingUp, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { addWeeks, format, startOfWeek, subWeeks } from 'date-fns';

type Stock = typeof stockList[number];

function getSelectedStocks(selectedSymbols: string[]): Stock[] {
  return stockList.filter(stock => selectedSymbols.includes(stock.symbol));
}

function generateChartData() {
  // 20 weeks historical (weekly, Mondays)
  const today = startOfWeek(new Date(), { weekStartsOn: 1 });
  const historical = [];
  let base = 100;
  for (let i = 20; i > 0; i--) {
    const date = subWeeks(today, i);
    // Simulate price ratio with some random walk
    base = base * (1 + (Math.random() - 0.5) * 0.04);
    historical.push({ date: format(date, 'yyyy-MM-dd'), ratio: parseFloat(base.toFixed(2)), type: 'historical' });
  }
  
  // Get the last historical value as starting point for estimates
  const lastValue = base;
  
  // Generate 3 estimates: high, median, low (more spread out like the reference)
  const highEstimate = lastValue * 1.25; // 25% higher
  const medianEstimate = lastValue * 1.05; // 5% higher  
  const lowEstimate = lastValue * 0.85; // 15% lower
  
  // 5 future points (1/4 of 20) - only need the last point for estimates
  const futureDate = addWeeks(today, 5);
  
  return {
    historical: [...historical],
    estimates: [
      { date: format(futureDate, 'yyyy-MM-dd'), ratio: parseFloat(highEstimate.toFixed(2)), type: 'high' },
      { date: format(futureDate, 'yyyy-MM-dd'), ratio: parseFloat(medianEstimate.toFixed(2)), type: 'median' },
      { date: format(futureDate, 'yyyy-MM-dd'), ratio: parseFloat(lowEstimate.toFixed(2)), type: 'low' }
    ],
    todayDate: format(today, 'yyyy-MM-dd'),
    lastValue: parseFloat(lastValue.toFixed(2))
  };
}

const chartDataObj = generateChartData();
const allRatios = [...chartDataObj.historical.map(d => d.ratio), ...chartDataObj.estimates.map(d => d.ratio)];
const min = Math.min(...allRatios);
const max = Math.max(...allRatios);
const yMin = Math.floor((min * 0.8) / 10) * 10;
const yMax = Math.ceil((max * 1.2) / 10) * 10;

// Create lines for estimates - only from today to forecast date
const lastHistoricalPoint = chartDataObj.historical[chartDataObj.historical.length - 1];
const highEstimatePoint = chartDataObj.estimates.find(e => e.type === 'high');
const medianEstimatePoint = chartDataObj.estimates.find(e => e.type === 'median');
const lowEstimatePoint = chartDataObj.estimates.find(e => e.type === 'low');
const highLine = [
  { date: lastHistoricalPoint.date, ratio: lastHistoricalPoint.ratio },
  highEstimatePoint ? { date: highEstimatePoint.date, ratio: highEstimatePoint.ratio } : { date: lastHistoricalPoint.date, ratio: lastHistoricalPoint.ratio }
];
const medianLine = [
  { date: lastHistoricalPoint.date, ratio: lastHistoricalPoint.ratio },
  medianEstimatePoint ? { date: medianEstimatePoint.date, ratio: medianEstimatePoint.ratio } : { date: lastHistoricalPoint.date, ratio: lastHistoricalPoint.ratio }
];
const lowLine = [
  { date: lastHistoricalPoint.date, ratio: lastHistoricalPoint.ratio },
  lowEstimatePoint ? { date: lowEstimatePoint.date, ratio: lowEstimatePoint.ratio } : { date: lastHistoricalPoint.date, ratio: lastHistoricalPoint.ratio }
];

const PortfolioRecommendation = () => {
  const location = useLocation();
  const { selectedTickers } = useSelectedTickers();
  const stocks = getSelectedStocks(selectedTickers.map((t: any) => t.symbol));
  const split = stocks.length > 0 ? 100 / stocks.length : 0;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Portfolio Recommendation</h1>
      <h2 className="text-lg font-semibold mb-2">Suggested Portfolio Composition</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stocks.map(stock => (
          <div key={stock.symbol} className="bg-card p-4 rounded shadow flex items-center">
            <img src={stock.logo} alt={stock.symbol} className="w-10 h-10 mr-4 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div>
              <div className="font-bold">{stock.symbol} - {stock.name}</div>
              <div className="text-muted-foreground">{split.toFixed(2)}%</div>
            </div>
          </div>
        ))}
      </div>
      {/* Forecast and AI Insights moved from Forecast page */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Estimated Growth & Volatility</h2>
        <div className="bg-card p-6 rounded shadow mb-4 flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-2/3 h-[400px]">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="date" type="category" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} domain={[yMin, yMax]} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} formatter={(value: number) => [`${value.toFixed(2)}`, 'Price Ratio']} />
                {/* Historical line only */}
                <Line type="monotone" dataKey="ratio" data={chartDataObj.historical} stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/3 mt-6 md:mt-0 md:ml-8">
            <h3 className="text-lg font-medium mb-4">Price Targets</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Bullish Case</span>
                  <span className="text-green-500 font-medium">${(chartDataObj.estimates[0].ratio * 2).toFixed(2)}</span>
                </div>
                <div className="w-full bg-accent h-2 rounded-full">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">80% upside potential</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Base Case</span>
                  <span className="text-blue-500 font-medium">${(chartDataObj.estimates[1].ratio * 2).toFixed(2)}</span>
                </div>
                <div className="w-full bg-accent h-2 rounded-full">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">55% upside potential</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Bearish Case</span>
                  <span className="text-red-500 font-medium">${(chartDataObj.estimates[2].ratio * 2).toFixed(2)}</span>
                </div>
                <div className="w-full bg-accent h-2 rounded-full">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">25% downside risk</p>
              </div>
              <div className="mt-4 p-3 bg-background/50 rounded-md text-xs text-muted-foreground">
                <p>Note: These forecasts are based on AI analysis of historical data, market trends, and sentiment. Actual results may vary. Always perform your own research before making investment decisions.</p>
              </div>
            </div>
          </div>
        </div>
        <table className="w-full bg-card rounded shadow mb-8">
          <thead>
            <tr>
              <th className="p-2 text-left">Metric</th>
              <th className="p-2 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-2">Sharpe Ratio</td><td className="p-2">1.23</td></tr>
            <tr><td className="p-2">Volatility</td><td className="p-2">12.5%</td></tr>
            <tr><td className="p-2">Expected Return</td><td className="p-2">8.7%</td></tr>
          </tbody>
        </table>
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
                  Our AI model predicts a positive trend for the portfolio over the next 6 months with 76% confidence.
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
                  Strong support level detected at $185.20. Portfolio value expected to bounce from this level if tested.
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
                  Earnings season and macroeconomic events could impact portfolio performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioRecommendation; 