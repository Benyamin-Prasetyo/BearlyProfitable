import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { portfolioPerformance } from '../../utils/mockData';
interface PortfolioChartProps {
  data?: typeof portfolioPerformance;
  height?: number;
}
const PortfolioChart = ({
  data = portfolioPerformance,
  height = 300
}: PortfolioChartProps) => {
  return <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{
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
      }} tickFormatter={value => `$${(value / 1000).toFixed(0)}k`} />
        <Tooltip contentStyle={{
        backgroundColor: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))',
        color: 'hsl(var(--foreground))',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
      }} formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']} labelFormatter={label => `Date: ${label}`} />
        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} activeDot={{
        r: 8,
        fill: 'hsl(var(--primary))'
      }} />
      </LineChart>
    </ResponsiveContainer>;
};
export default PortfolioChart;