import React from 'react';
import { Sparkles, Brain, AlertCircle, PieChart, Lightbulb } from 'lucide-react';
import AIInsightCard from '../components/ui/AIInsightCard';
import { aiInsights, portfolioSummary, stockList } from '../utils/mockData';
const AIInsights = () => {
  return <div className="space-y-6">
      <div>
        <div className="flex items-center mb-1">
          <h1 className="text-2xl font-bold mr-2">AI Insights</h1>
          <div className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full flex items-center">
            <Sparkles size={12} className="mr-1" />
            AI Powered
          </div>
        </div>
        <p className="text-muted-foreground">
          Smart analysis and recommendations for your portfolio
        </p>
      </div>
      {/* AI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all">
          <div className="flex items-center mb-2">
            <Brain size={18} className="text-primary mr-2" />
            <p className="text-sm text-muted-foreground">AI Analysis</p>
          </div>
          <p className="text-xl font-bold">24 insights</p>
          <p className="text-sm text-muted-foreground mt-1">
            Generated this month
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all">
          <div className="flex items-center mb-2">
            <AlertCircle size={18} className="text-yellow-500 mr-2" />
            <p className="text-sm text-muted-foreground">Risk Assessment</p>
          </div>
          <p className="text-xl font-bold">Medium</p>
          <p className="text-sm text-muted-foreground mt-1">
            Portfolio volatility
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all">
          <div className="flex items-center mb-2">
            <PieChart size={18} className="text-blue-500 mr-2" />
            <p className="text-sm text-muted-foreground">Diversification</p>
          </div>
          <p className="text-xl font-bold">72/100</p>
          <p className="text-sm text-muted-foreground mt-1">
            Needs improvement
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all">
          <div className="flex items-center mb-2">
            <Lightbulb size={18} className="text-green-500 mr-2" />
            <p className="text-sm text-muted-foreground">Opportunities</p>
          </div>
          <p className="text-xl font-bold">3 new</p>
          <p className="text-sm text-muted-foreground mt-1">
            Investment opportunities
          </p>
        </div>
      </div>
      {/* AI Insights */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-4">Latest Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiInsights.map(insight => <AIInsightCard key={insight.id} title={insight.title} description={insight.description} confidence={insight.confidence} date={insight.date} />)}
        </div>
      </div>
      {/* Portfolio Recommendations */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-4">Portfolio Recommendations</h2>
        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg hover:shadow-md transition-all hover:border-primary/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                  <PieChart size={16} className="text-blue-500" />
                </div>
                <h3 className="font-medium">Rebalance Recommendation</h3>
              </div>
              <div className="bg-blue-500/20 text-blue-500 text-xs px-2 py-0.5 rounded-full">
                92% confidence
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Your technology allocation is currently at 45%, which exceeds our
              recommended threshold of 35%. Consider reducing exposure to
              maintain a balanced portfolio.
            </p>
            <div className="bg-accent/50 p-3 rounded-md">
              <p className="text-sm font-medium mb-1">Suggested Actions:</p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>Reduce AAPL position by 15-20 shares</li>
                <li>Reduce MSFT position by 8-10 shares</li>
                <li>
                  Consider adding exposure to underrepresented sectors like
                  Energy
                </li>
              </ul>
            </div>
          </div>
          <div className="p-4 border border-border rounded-lg hover:shadow-md transition-all hover:border-primary/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                  <Lightbulb size={16} className="text-green-500" />
                </div>
                <h3 className="font-medium">Opportunity Alert</h3>
              </div>
              <div className="bg-green-500/20 text-green-500 text-xs px-2 py-0.5 rounded-full">
                85% confidence
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Based on technical analysis and recent news, our AI model has
              identified a potential buying opportunity in the Energy sector.
            </p>
            <div className="bg-accent/50 p-3 rounded-md">
              <p className="text-sm font-medium mb-1">Suggested Actions:</p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>
                  Consider allocating 5-7% of portfolio to clean energy stocks
                </li>
                <li>Research renewable energy ETFs for diversified exposure</li>
                <li>
                  Monitor oil price movements which have shown increased
                  volatility
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default AIInsights;