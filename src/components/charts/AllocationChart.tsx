import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from 'recharts';
import { portfolioAllocation } from '../../utils/mockData';
interface AllocationChartProps {
  data?: typeof portfolioAllocation;
  height?: number;
}
// Modern color palette with better contrast for dark mode
const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981', '#14b8a6', '#0ea5e9'];
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  return <g>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="hsl(var(--foreground))" fontSize={12}>
        {`${payload.name}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="hsl(var(--muted-foreground))" fontSize={12}>
        {`${value}% (${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>;
};
const AllocationChart = ({
  data = portfolioAllocation,
  height = 300
}: AllocationChartProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  return <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={data} cx="50%" cy="50%" innerRadius={height > 350 ? 70 : 50} outerRadius={height > 350 ? 90 : 70} fill="#8884d8" dataKey="value" onMouseEnter={onPieEnter} paddingAngle={2}>
            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="hsl(var(--background))" strokeWidth={2} />)}
          </Pie>
          <Tooltip formatter={value => [`${value}%`, 'Allocation']} contentStyle={{
          backgroundColor: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))',
          color: 'hsl(var(--foreground))',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          padding: '8px 12px'
        }} itemStyle={{
          color: 'hsl(var(--foreground))'
        }} />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" formatter={value => <span style={{
          color: 'hsl(var(--foreground))',
          fontSize: '12px'
        }}>
                {value}
              </span>} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">Total</p>
          <p className="text-2xl font-bold">100%</p>
        </div>
      </div>
    </div>;
};
export default AllocationChart;