import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Sliders, LayoutGrid, MessageSquare, Zap, Clock, CalendarDays } from 'lucide-react';

const categories = [
  { id: 'modules', label: 'Feature Toggles (Modular)', icon: LayoutGrid },
  { id: 'admin', label: 'Admin & Security', icon: Shield },
  { id: 'sales', label: 'Sales & Tax Rules', icon: Sliders },
  { id: 'comm', label: 'Communication Templates', icon: MessageSquare },
  { id: 'ai', label: 'AI Copilot Configurations', icon: Zap },
  { id: 'time', label: 'Timeclock & Payroll Limits', icon: Clock },
];

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('modules');

  return (
    <div className="animate-fade-in stagger-1" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '1rem' }}>
      
      <header style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SettingsIcon size={28} /> Dealership Rules & Control
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Modular Architecture Toggles, Tax Rates, and AI Constraints</p>
      </header>

      <div style={{ display: 'flex', gap: '2rem', flex: 1, overflow: 'hidden' }}>
        
        {/* Settings Navigation Sidebar */}
        <div className="glass-panel" style={{ width: '280px', flexShrink: 0, padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ padding: '0 1rem 1rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
            <input type="text" placeholder="Search parameters..." style={{ width: '100%', padding: '0.5rem 1rem', background: 'var(--color-bg-deep)', border: '1px solid var(--color-border)', borderRadius: '4px', color: '#fff', outline: 'none' }} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0' }}>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '12px', width: '100%', textAlign: 'left', padding: '12px 20px',
                  background: activeTab === cat.id ? 'rgba(63, 136, 197, 0.1)' : 'transparent',
                  borderLeft: activeTab === cat.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                  color: activeTab === cat.id ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                  fontWeight: activeTab === cat.id ? 600 : 400
                }}
              >
                <cat.icon size={18} color={activeTab === cat.id ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Form Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>
          
          {activeTab === 'modules' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ padding: '1.5rem', background: 'rgba(63, 136, 197, 0.05)', border: '1px solid rgba(63, 136, 197, 0.2)', borderRadius: '8px' }}>
                <h2 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'var(--color-primary)' }}>Modular Feature Engine</h2>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Activating an optional feature below will immediately render all corresponding UI dashboards, reporting columns, and database schemas globally. Disabling them aggressively simplifies the interface for standard users.
                </p>
              </div>

              {/* Service Modules */}
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', color: 'var(--color-text-muted)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Service Operations (Optional modules)</h3>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div style={{ maxWidth: '600px' }}>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Flat-Rate Labor Engine</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                      Calculates Payroll and COGS based on predefined operation hours rather than physical clock time. (Toggles the Efficiency Dashboard on).
                    </p>
                  </div>
                  <Toggle active={true} />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ maxWidth: '600px' }}>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Mobile Water-Test Checklists (QA)</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                      Forces Technicians to successfully pass a digital tablet-based QA checklist before an RO can transition to READY.
                    </p>
                  </div>
                  <Toggle active={true} />
                </div>
              </div>

              {/* CRM / Sales Modules */}
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', color: 'var(--color-text-muted)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>CRM / Enterprise Operations (Optional modules)</h3>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div style={{ maxWidth: '600px' }}>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Multi-Location Inventory Sharing (Enterprise)</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                      Allows the Parts Counter to instantly query available stock levels at sister warehouses and directly initiate cross-docking transfers.
                    </p>
                  </div>
                  <Toggle active={false} />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ maxWidth: '600px' }}>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Customer Loyalty & Reward Tiers</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                      Enables point-accrual systems tied to POS transactions. Mounts the 'VIP Status' columns to the Customer CRM.
                    </p>
                  </div>
                  <Toggle active={false} />
                </div>
              </div>

            </div>
          )}

          {activeTab === 'ai' && (
            <div className="animate-fade-in glass-card" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0', color: 'var(--color-accent)' }}>AI Copilot Strict Constraints</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Define exactly how the localized AI agents operate across the dealership floor. **Note: All state-changing features require Explicit Human Approval.**</p>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ maxWidth: '600px' }}>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Auto-Draft Customer Communications (NBA)</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    Allows the AI to ingest historical texts and active web-leads to propose exact-phrased Next Best Actions for Sales Reps.
                  </p>
                </div>
                <Toggle active={true} />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ maxWidth: '600px' }}>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Payroll Error & Anomaly Detection Layer</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    Executes nightly scans of employee Efficiency vs Flat-Rate vs Scheduled constraints, alerting GM to mathematical implausibilities.
                  </p>
                </div>
                <Toggle active={true} />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

const Toggle = ({ active }: { active: boolean }) => (
  <div style={{ 
    width: '44px', height: '24px', borderRadius: '12px', 
    background: active ? 'var(--color-success)' : 'rgba(255,255,255,0.1)', 
    position: 'relative', cursor: 'pointer', transition: 'background 0.2s', border: '1px solid var(--color-border)' 
  }}>
    <div style={{ 
      width: '18px', height: '18px', borderRadius: '50%', background: '#fff', 
      position: 'absolute', top: '2px', left: active ? '22px' : '2px', transition: 'left 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)' 
    }}></div>
  </div>
);
