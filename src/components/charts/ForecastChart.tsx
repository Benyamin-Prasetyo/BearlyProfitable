import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { stockForecast } from '../../utils/mockData';
interface ForecastChartProps {
  symbol: string;
  data?: typeof stockForecast.AAPL;
  height?: number;
}
const ForecastChart = ({
  symbol = 'AAPL',
  data = stockForecast.AAPL,
  height = 300
}: ForecastChartProps) => {
  const currentDate = new Date().toISOString().slice(0, 7);
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
      }} domain={['dataMin - 10', 'dataMax + 10']} />
        <Tooltip contentStyle={{
        backgroundColor: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))',
        color: 'hsl(var(--foreground))'
      }} formatter={(value: number) => [`$${value}`, value === null ? 'Predicted' : 'Price']} />
        <ReferenceLine x={currentDate} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" label={{
        value: 'Today',
        position: 'insideTopRight',
        fill: 'hsl(var(--muted-foreground))'
      }} />
        <Line type="monotone" dataKey="actual" name="Historical" stroke="hsl(var(--primary))" strokeWidth={2} dot={{
        fill: 'hsl(var(--primary))'
      }} />
        <Line type="monotone" dataKey="predicted" name="Forecast" stroke="#4f46e5" strokeWidth={2} strokeDasharray="5 5" dot={{
        fill: '#4f46e5'
      }} />
      </LineChart>
    </ResponsiveContainer>;
};
export default ForecastChart;