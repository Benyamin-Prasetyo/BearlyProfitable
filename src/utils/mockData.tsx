import React from 'react';
// Mock data for the stock portfolio application
export const portfolioSummary = {
  totalValue: 145672.34,
  dayChange: 1243.78,
  dayChangePercent: 0.86,
  totalGain: 24567.89,
  totalGainPercent: 20.28
};
export const portfolioAllocation = [{
  name: 'Technology',
  value: 45
}, {
  name: 'Finance',
  value: 20
}, {
  name: 'Healthcare',
  value: 15
}, {
  name: 'Consumer',
  value: 12
}, {
  name: 'Energy',
  value: 8
}];
export const portfolioPerformance = [{
  date: '2023-01',
  value: 100000
}, {
  date: '2023-02',
  value: 104500
}, {
  date: '2023-03',
  value: 102300
}, {
  date: '2023-04',
  value: 107800
}, {
  date: '2023-05',
  value: 111200
}, {
  date: '2023-06',
  value: 115600
}, {
  date: '2023-07',
  value: 120100
}, {
  date: '2023-08',
  value: 118700
}, {
  date: '2023-09',
  value: 125400
}, {
  date: '2023-10',
  value: 131200
}, {
  date: '2023-11',
  value: 138900
}, {
  date: '2023-12',
  value: 142500
}, {
  date: '2024-01',
  value: 145672
}];
export const stockList = [{
  symbol: 'AAPL',
  name: 'Apple Inc.',
  price: 189.84,
  change: 2.35,
  changePercent: 1.25,
  shares: 150,
  value: 28476,
  sector: 'Technology',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
}, {
  symbol: 'MSFT',
  name: 'Microsoft Corporation',
  price: 402.56,
  change: -1.24,
  changePercent: -0.31,
  shares: 80,
  value: 32204.8,
  sector: 'Technology',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'
}, {
  symbol: 'GOOGL',
  name: 'Alphabet Inc.',
  price: 142.89,
  change: 0.75,
  changePercent: 0.53,
  shares: 100,
  value: 14289,
  sector: 'Technology',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
}, {
  symbol: 'AMZN',
  name: 'Amazon.com Inc.',
  price: 157.91,
  change: 3.21,
  changePercent: 2.08,
  shares: 120,
  value: 18949.2,
  sector: 'Consumer',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
}, {
  symbol: 'TSLA',
  name: 'Tesla, Inc.',
  price: 194.77,
  change: -5.32,
  changePercent: -2.66,
  shares: 90,
  value: 17529.3,
  sector: 'Consumer',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png'
}, {
  symbol: 'JPM',
  name: 'JPMorgan Chase & Co.',
  price: 172.55,
  change: 0.42,
  changePercent: 0.24,
  shares: 110,
  value: 18980.5,
  sector: 'Finance',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/J_P_Morgan_Logo_2008_1.svg'
}, {
  symbol: 'JNJ',
  name: 'Johnson & Johnson',
  price: 156.74,
  change: -0.28,
  changePercent: -0.18,
  shares: 95,
  value: 14890.3,
  sector: 'Healthcare',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Johnson_and_Johnson_Logo.svg'
}];
export const stockHistoricalData = {
  AAPL: [{
    date: '2023-07',
    price: 150.33
  }, {
    date: '2023-08',
    price: 165.12
  }, {
    date: '2023-09',
    price: 171.84
  }, {
    date: '2023-10',
    price: 166.77
  }, {
    date: '2023-11',
    price: 175.43
  }, {
    date: '2023-12',
    price: 182.58
  }, {
    date: '2024-01',
    price: 189.84
  }],
  MSFT: [{
    date: '2023-07',
    price: 345.24
  }, {
    date: '2023-08',
    price: 350.98
  }, {
    date: '2023-09',
    price: 365.12
  }, {
    date: '2023-10',
    price: 378.85
  }, {
    date: '2023-11',
    price: 390.27
  }, {
    date: '2023-12',
    price: 395.89
  }, {
    date: '2024-01',
    price: 402.56
  }]
};
export const stockForecast = {
  AAPL: [{
    date: '2024-01',
    actual: 189.84,
    predicted: 189.84
  }, {
    date: '2024-02',
    actual: null,
    predicted: 195.23
  }, {
    date: '2024-03',
    actual: null,
    predicted: 201.45
  }, {
    date: '2024-04',
    actual: null,
    predicted: 205.67
  }, {
    date: '2024-05',
    actual: null,
    predicted: 210.23
  }, {
    date: '2024-06',
    actual: null,
    predicted: 214.56
  }]
};
export const aiInsights = [{
  id: 1,
  title: 'Potential Breakout: AAPL',
  description: 'Technical indicators suggest Apple (AAPL) is approaching a key resistance level with increasing volume. A breakout above $192 could signal a new uptrend.',
  confidence: 87,
  date: '2024-01-15'
}, {
  id: 2,
  title: 'Portfolio Rebalancing Opportunity',
  description: 'Your technology allocation has grown to 45% of your portfolio, exceeding recommended diversification guidelines. Consider rebalancing to reduce sector-specific risk.',
  confidence: 92,
  date: '2024-01-14'
}, {
  id: 3,
  title: 'Volatility Alert: TSLA',
  description: 'Tesla (TSLA) has shown increased volatility following recent earnings. Our analysis indicates potential for significant price movement in the next 7-10 trading days.',
  confidence: 78,
  date: '2024-01-13'
}, {
  id: 4,
  title: 'Dividend Opportunity: JPM',
  description: 'JPMorgan Chase (JPM) is approaching its ex-dividend date. Current yield of 2.4% is historically favorable compared to its 5-year average.',
  confidence: 85,
  date: '2024-01-12'
}];