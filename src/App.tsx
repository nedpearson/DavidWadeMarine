import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  Wrench, 
  ShoppingCart, 
  Box, 
  PieChart, 
  Settings as SettingsIcon,
  Bell,
  Search,
  Menu,
  DollarSign
} from 'lucide-react';

import { Dashboard } from './pages/Dashboard';
import { Checkout } from './pages/Checkout';
import { ServiceBoard } from './pages/ServiceBoard';
import { CrmHub } from './pages/CrmHub';
import { Inventory } from './pages/Inventory';
import { Settings } from './pages/Settings';
import { Analytics } from './pages/Analytics';
import { FinanceOperations } from './pages/Finance';
import { EmployeeHub } from './pages/EmployeeHub';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Overview', icon: LayoutDashboard },
    { path: '/crm', label: 'CRM / Customers', icon: Users },
    { path: '/sales', label: 'Sales / Quotes', icon: ShoppingCart },
    { path: '/service', label: 'Service / ROs', icon: Wrench },
    { path: '/inventory', label: 'Parts Operations', icon: Box },
    { path: '/finance', label: 'Operational Finance', icon: DollarSign },
    { path: '/employees', label: 'Employee Hub', icon: Users },
    { path: '/analytics', label: 'Reports', icon: PieChart },
    { path: '/settings', label: 'Dealership Rules', icon: SettingsIcon },
  ];

  const getNavItemStyle = (path: string) => {
    const isActive = location.pathname === path;
    return `
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      margin: 4px 12px;
      border-radius: var(--radius-md);
      color: ${isActive ? 'var(--color-text-main)' : 'var(--color-text-muted)'};
      background: ${isActive ? 'var(--color-primary-hover)' : 'transparent'};
      font-weight: ${isActive ? '600' : '400'};
      transition: all 0.2s ease;
      cursor: pointer;
    `.trim().replace(/\s+/g, ' '); // Inline styled-string approach for quick react scaffolding without emotion/styled-comps
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <nav className="sidebar" style={{ width: isSidebarOpen ? 'var(--sidebar-width)' : '80px', overflowX: 'hidden' }}>
        <div style={{ 
          height: 'var(--header-height)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: isSidebarOpen ? 'flex-start' : 'center',
          padding: isSidebarOpen ? '0 24px' : '0',
          borderBottom: '1px solid var(--color-border)'
        }}>
          {isSidebarOpen ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Building2 style={{ color: 'var(--color-accent)' }} size={28} />
              <h1 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', margin: 0 }}>David Wade<br/><span style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>MARINE PLATFORM</span></h1>
            </div>
          ) : (
            <Building2 style={{ color: 'var(--color-accent)' }} size={28} />
          )}
        </div>
        
        <div style={{ padding: '24px 0', flex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const styleString = getNavItemStyle(item.path);
            
            // Apply raw inline styles via object translation (or use classNames if preferred, but for single-file demo this works perfectly)
            const isActive = location.pathname === item.path;
            
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 20px',
                  margin: '4px 12px',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? '#fff' : 'var(--color-text-muted)',
                  background: isActive ? 'rgba(63, 136, 197, 0.2)' : 'transparent',
                  border: isActive ? '1px solid rgba(63, 136, 197, 0.4)' : '1px solid transparent',
                  fontWeight: isActive ? 500 : 400,
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={20} style={{ color: isActive ? 'var(--color-accent)' : 'inherit' }} />
                {isSidebarOpen && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Header */}
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              style={{ background: 'transparent', color: 'var(--color-text-main)' }}
            >
              <Menu size={24} />
            </button>
            <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '6px 16px', gap: '8px', minWidth: '300px' }}>
              <Search size={16} color="var(--color-text-muted)" />
              <input type="text" placeholder="Search HIN, Customer, or RO #..." style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none' }} />
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <Bell size={20} color="var(--color-text-main)" />
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--color-danger)', width: '8px', height: '8px', borderRadius: '50%' }}></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--color-border)', paddingLeft: '20px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                NW
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Ned Admin</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Store Manager</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Container */}
        <div className="page-scroll-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crm" element={<CrmHub />} />
            <Route path="/sales" element={<Checkout />} />
            <Route path="/service" element={<ServiceBoard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/finance" element={<FinanceOperations />} />
            <Route path="/employees" element={<EmployeeHub />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>Module Loading Infrastructure...</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
