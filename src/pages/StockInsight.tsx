import React from 'react';
import { useParams } from 'react-router-dom';
import StockInsightCard from '../components/ui/StockInsightCard';

const StockInsight = () => {
  const { symbol } = useParams<{ symbol: string }>();

  if (!symbol) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Select a stock from the sidebar to view insights</p>
      </div>
    );
  }

  return <StockInsightCard symbol={symbol} />;
};

export default StockInsight; 