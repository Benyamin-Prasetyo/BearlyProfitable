import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { X, LayoutDashboard, LineChart, TrendingUp, Sparkles, Settings, HelpCircle, PanelLeft } from 'lucide-react';
import { useSelectedTickers } from '../SelectedTickersContext';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({
  open,
  setOpen
}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTickers } = useSelectedTickers();

  const navItems = [
    {
      name: 'Portfolio Composition',
      icon: <LayoutDashboard size={18} />,
      path: '/portfolio-recommendation',
    },
    {
      name: 'Stock Insight',
      icon: <LineChart size={18} />,
      path: '/stock-insight',
      dropdown: true,
    },
  ];

  const handleStockClick = (symbol: string) => {
    navigate(`/stock-insight/${symbol}`);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 bg-card border-r border-border transform transition-all duration-300 ease-in-out md:translate-x-0 md:static md:z-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'w-16' : 'w-64'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span
            className={`font-bold text-xl transition-opacity duration-200 ${
              collapsed ? 'md:opacity-0' : 'opacity-100'
            }`}
          >
            {!collapsed && 'BearlyProfitable'}
          </span>
          <div className="flex items-center">
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-md hover:bg-accent md:hidden"
            >
              <X size={18} />
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-md hover:bg-accent hidden md:flex"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <PanelLeft size={18} className={collapsed ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.name}>
              <button
                className={`w-full flex items-center px-3 py-2 rounded hover:bg-accent transition-colors ${
                  location.pathname.startsWith(item.path) ? 'bg-accent' : ''
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span className={`ml-3 ${collapsed ? 'hidden' : ''}`}>
                  {item.name}
                </span>
                {item.dropdown && !collapsed && (
                  <span className="ml-auto">▼</span>
                )}
              </button>
              {/* Dropdown for Stock Insight */}
              {item.dropdown &&
                !collapsed &&
                location.pathname.startsWith('/stock-insight') && (
                  <div className="ml-8 mt-1 space-y-1">
                    {selectedTickers.map((stock) => (
                      <button
                        key={stock.symbol}
                        onClick={() => handleStockClick(stock.symbol)}
                        className={`block w-full text-left px-2 py-1 rounded hover:bg-muted ${
                          location.pathname === `/stock-insight/${stock.symbol}`
                            ? 'bg-muted'
                            : ''
                        }`}
                      >
                        {stock.symbol}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;