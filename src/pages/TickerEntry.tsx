import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { stockList } from '../utils/mockData';
import { useSelectedTickers } from '../components/SelectedTickersContext';
import logoUrl from '../assets/bearlyprofitablelogo.svg';

type Stock = typeof stockList[number];

const TickerEntry = () => {
  const [query, setQuery] = useState('');
  const [selectedTickers, setSelectedTickers] = useState<Stock[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setSelectedTickers: setGlobalSelectedTickers } = useSelectedTickers();

  const filteredTickers = stockList.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(query.toLowerCase()) &&
      !selectedTickers.some((t) => t.symbol === stock.symbol)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setDropdownOpen(true);
  };

  const handleSelectTicker = (ticker: Stock) => {
    setSelectedTickers([...selectedTickers, ticker]);
    setQuery('');
    setDropdownOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleRemoveTicker = (symbol: string) => {
    setSelectedTickers(selectedTickers.filter((t) => t.symbol !== symbol));
  };

  const handleInputFocus = () => {
    setDropdownOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setDropdownOpen(false), 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && selectedTickers.length > 0) {
      setGlobalSelectedTickers(selectedTickers);
      navigate('/portfolio-recommendation');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <img src={logoUrl} alt="BearlyProfitable Logo" className="w-64 h-auto mb-4" />
          <p className="text-muted-foreground text-center">
            Enter your preferred stock codes to get portfolio recommendation
          </p>
        </div>
        <div className="w-full relative">
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedTickers.map((ticker) => (
              <span key={ticker.symbol} className="inline-flex items-center bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold mr-2">
                {ticker.symbol}
                <button
                  className="ml-1 text-xs bg-primary-foreground text-primary rounded-full px-1 hover:bg-muted"
                  onClick={() => handleRemoveTicker(ticker.symbol)}
                  tabIndex={-1}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            ref={inputRef}
            type="text"
            className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
            placeholder="Search or enter stock ticker..."
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
          />
          {dropdownOpen && filteredTickers.length > 0 && (
            <div className="absolute z-10 w-full bg-card border border-border rounded mt-1 max-h-48 overflow-y-auto shadow-lg">
              {filteredTickers.map((stock) => (
                <div
                  key={stock.symbol}
                  className="px-4 py-2 cursor-pointer hover:bg-accent flex items-center"
                  onMouseDown={() => handleSelectTicker(stock)}
                >
                  <img src={stock.logo} alt={stock.symbol} className="w-5 h-5 mr-2 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <span className="font-medium">{stock.symbol}</span>
                  <span className="ml-2 text-muted-foreground text-xs">{stock.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          className="mt-6 w-full bg-primary text-primary-foreground py-2 rounded font-semibold disabled:opacity-50"
          disabled={selectedTickers.length === 0}
          onClick={() => { setGlobalSelectedTickers(selectedTickers); navigate('/portfolio-recommendation'); }}
        >
          Get Recommendation
        </button>
      </div>
    </div>
  );
};

export default TickerEntry; 