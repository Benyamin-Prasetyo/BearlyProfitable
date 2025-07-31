import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import StockInsightCard from './StockInsightCard';

interface AIInsightProps {
  title: string;
  description: string;
  confidence: number;
  date: string;
}

const AIInsightCard = ({
  title,
  description,
  confidence,
  date
}: AIInsightProps) => {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  // Function to determine confidence level color
  const getConfidenceColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 70) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  // Function to find and make stock tickers clickable
  const renderDescription = (text: string) => {
    // Regular expression to match stock tickers (e.g., AAPL, MSFT)
    const tickerRegex = /\(([A-Z]{1,5})\)/g;
    const parts = text.split(tickerRegex);

    return parts.map((part, index) => {
      // Even indices are regular text, odd indices are tickers
      if (index % 2 === 1) {
        return (
          <button
            key={index}
            className="text-primary hover:underline font-medium"
            onClick={() => setSelectedStock(part)}
          >
            ({part})
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all hover:scale-[1.01]">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            <Sparkles size={16} className="text-primary mr-2" />
            <h3 className="font-medium">{title}</h3>
          </div>
          <div className="flex items-center">
            <div className={`${getConfidenceColor(confidence)} text-white text-xs font-medium px-2 py-0.5 rounded-full`}>
              {confidence}% confidence
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          {renderDescription(description)}
        </p>
        <div className="text-xs text-muted-foreground">Generated on {date}</div>
      </div>

      {/* Modal for StockInsightCard */}
      {selectedStock && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto">
            <button
              onClick={() => setSelectedStock(null)}
              className="absolute top-2 right-2 z-50 p-2 rounded-full hover:bg-accent"
            >
              ✕
            </button>
            <StockInsightCard symbol={selectedStock} />
          </div>
        </div>
      )}
    </>
  );
};

export default AIInsightCard;