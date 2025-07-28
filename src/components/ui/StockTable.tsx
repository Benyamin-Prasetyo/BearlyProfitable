import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { stockList } from '../../utils/mockData';
interface StockTableProps {
  stocks?: typeof stockList;
}
const StockTable = ({
  stocks = stockList
}: StockTableProps) => {
  return <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">
              Symbol
            </th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">
              Name
            </th>
            <th className="text-right px-4 py-3 text-muted-foreground font-medium">
              Price
            </th>
            <th className="text-right px-4 py-3 text-muted-foreground font-medium">
              Change
            </th>
            <th className="text-right px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">
              Shares
            </th>
            <th className="text-right px-4 py-3 text-muted-foreground font-medium">
              Value
            </th>
            <th className="text-right px-4 py-3 text-muted-foreground font-medium hidden lg:table-cell">
              Sector
            </th>
            <th className="text-center px-4 py-3 text-muted-foreground font-medium">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => <tr key={stock.symbol} className="border-b border-border hover:bg-accent/50 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <img src={stock.logo} alt={stock.symbol} className="w-6 h-6 mr-2 object-contain" onError={e => {
                ;
                (e.target as HTMLImageElement).style.display = 'none';
              }} />
                  <span className="font-medium">{stock.symbol}</span>
                </div>
              </td>
              <td className="px-4 py-3">{stock.name}</td>
              <td className="px-4 py-3 text-right">
                ${stock.price.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-right">
                <div className={`flex items-center justify-end ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change >= 0 ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                  <span>
                    {Math.abs(stock.change).toFixed(2)} (
                    {Math.abs(stock.changePercent).toFixed(2)}%)
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-right hidden md:table-cell">
                {stock.shares}
              </td>
              <td className="px-4 py-3 text-right">
                ${stock.value.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right hidden lg:table-cell">
                {stock.sector}
              </td>
              <td className="px-4 py-3 text-center">
                <Link to={`/stock/${stock.symbol}`} className="inline-flex items-center justify-center p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink size={16} />
                </Link>
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>;
};
export default StockTable;