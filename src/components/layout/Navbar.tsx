import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
interface NavbarProps {
  onMenuClick: () => void;
}
const Navbar = ({
  onMenuClick
}: NavbarProps) => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const navigate = useNavigate();
  return <header className="bg-card border-b border-border z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button onClick={onMenuClick} className="md:hidden p-2 rounded-md hover:bg-accent mr-4">
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-primary">BearlyProfitable</span>
            <span className="ml-1 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
              AI
            </span>
          </Link>
        </div>
        <div className="hidden md:flex items-center bg-accent rounded-md px-3 py-1.5 flex-1 max-w-md mx-6">
          <Search size={16} className="text-muted-foreground mr-2" />
          <input type="text" placeholder="Search stocks..." className="bg-transparent border-none outline-none w-full text-sm" onFocus={() => navigate('/')} />
        </div>
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-accent" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center bg-accent rounded-md px-3 py-1.5">
          <Search size={16} className="text-muted-foreground mr-2" />
          <input type="text" placeholder="Search stocks..." className="bg-transparent border-none outline-none w-full text-sm" onFocus={() => navigate('/')} />
        </div>
      </div>
    </header>;
};
export default Navbar;