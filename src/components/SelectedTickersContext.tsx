import React, { createContext, useContext, useState, ReactNode } from 'react';
import { stockList } from '../utils/mockData';

type Stock = typeof stockList[number];

type SelectedTickersContextType = {
  selectedTickers: Stock[];
  setSelectedTickers: (tickers: Stock[]) => void;
};

const SelectedTickersContext = createContext<SelectedTickersContextType | undefined>(undefined);

export const useSelectedTickers = () => {
  const context = useContext(SelectedTickersContext);
  if (!context) throw new Error('useSelectedTickers must be used within SelectedTickersProvider');
  return context;
};

export const SelectedTickersProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTickers, setSelectedTickers] = useState<Stock[]>([]);
  return (
    <SelectedTickersContext.Provider value={{ selectedTickers, setSelectedTickers }}>
      {children}
    </SelectedTickersContext.Provider>
  );
}; 