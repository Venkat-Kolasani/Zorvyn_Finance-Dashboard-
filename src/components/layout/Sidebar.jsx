import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, TrendingUp, Moon, Sun } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { useSidebar } from '../../context/SidebarContext';
import { Badge } from '../ui';
import './Sidebar.css';

export const Sidebar = () => {
  const role = useFinanceStore((state) => state.role);
  const darkMode = useFinanceStore((state) => state.darkMode);
  const toggleDarkMode = useFinanceStore((state) => state.toggleDarkMode);
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={close}></div>
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo-text">Finance</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={close}
            end
          >
            <LayoutDashboard size={20} className="sidebar-icon" />
            <span>Overview</span>
          </NavLink>
          
          <NavLink 
            to="/transactions" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={close}
          >
            <ArrowLeftRight size={20} className="sidebar-icon" />
            <span>Transactions</span>
          </NavLink>
          
          <NavLink 
            to="/insights" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={close}
          >
            <TrendingUp size={20} className="sidebar-icon" />
            <span>Insights</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-role-badge">
            <Badge variant={role === 'admin' ? 'default' : 'secondary'}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Badge>
          </div>
          
          <button 
            className="sidebar-theme-toggle" 
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>
    </>
  );
};
