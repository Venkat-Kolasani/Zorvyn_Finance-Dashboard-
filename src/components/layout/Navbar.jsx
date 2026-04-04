import React from 'react';
import { Menu } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { useSidebar } from '../../context/SidebarContext';
import './Navbar.css';

export const Navbar = ({ title }) => {
  const { role, setRole } = useFinanceStore();
  const { toggle } = useSidebar();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button 
          className="mobile-menu-btn" 
          onClick={toggle}
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>
        <h1 className="navbar-title">{title}</h1>
      </div>

      <div className="navbar-right">
        <div className="role-switcher-wrapper">
          <select 
            className={`role-switcher ${role}`}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Switch role"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          {role === 'admin' && <span className="role-indicator-dot"></span>}
        </div>
        
        <div className="user-avatar" title="User VK">
          VK
        </div>
      </div>
    </header>
  );
};
