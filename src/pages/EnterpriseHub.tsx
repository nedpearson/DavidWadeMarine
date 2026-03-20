import { useState } from 'react';
import { Globe, Building2, TrendingUp, Truck, PackageCheck, RefreshCw } from 'lucide-react';
import { useDrilldown } from '../contexts/DrilldownContext';

const mockLocations = [
  { id: 'LOC-1', name: 'Dallas HQ (Flagship)', revenue: '$2.4M', inventory: '$850K', status: 'ONLINE' },
  { id: 'LOC-2', name: 'Austin Marina', revenue: '$1.1M', inventory: '$420K', status: 'ONLINE' },
  { id: 'LOC-3', name: 'Houston Coastal', revenue: '$3.5M', inventory: '$1.2M', status: 'WARNING' },
];

const mockTransfers = [
  { id: 'TRX-992', from: 'Dallas HQ', to: 'Austin Marina', items: '3x Yamaha F150', status: 'IN_TRANSIT', eta: 'Tomorrow 2:00 PM' },
  { id: 'TRX-993', from: 'Houston Coastal', to: 'Dallas HQ', items: '12x Propellers', status: 'PACKING', eta: 'N/A' },
];

export const EnterpriseHub = () => {
  const [activeLocation, setActiveLocation] = useState('ALL_LOCATIONS');
  const { pushDrilldown } = useDrilldown();

  return (
    <div className="animate-fade-in stagger-1" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '1rem' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={28} /> Enterprise Command Center
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Unified Multi-Tenant Executive Rollups, Cross-Store Transfers, and Warehouse Ordering</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <select 
            value={activeLocation}
            onChange={(e) => setActiveLocation(e.target.value)}
            style={{ 
              padding: '0.75rem 1.5rem', 
              background: 'var(--color-bg-deep)', 
              border: '1px solid var(--color-border)', 
              color: '#fff', 
              borderRadius: '8px', 
              fontSize: '1rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="ALL_LOCATIONS">🌍 Enterprise View (All Locations)</option>
            {mockLocations.map(loc => (
              <option key={loc.id} value={loc.id}>🏢 {loc.name}</option>
            ))}
          </select>
          <button style={{ padding: '0.75rem 1.5rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={18} /> Sync Data Warehouses
          </button>
        </div>
      </header>

      {/* Global Executive Rollup */}
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <div className="glass-card" style={{ flex: 1, padding: '1.5rem', borderTop: '3px solid var(--color-success)' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Global YTD Revenue</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: '0.5rem 0 0 0', color: 'var(--color-success)' }}>$7,000,000</p>
          <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} color="var(--color-success)" /> +14.2% YoY Growth
          </div>
        </div>
        
        <div className="glass-card" style={{ flex: 1, padding: '1.5rem', borderTop: '3px solid var(--color-primary)' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Consolidated Active Capital</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: '0.5rem 0 0 0', color: 'var(--color-primary)' }}>$2,470,000</p>
          <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Total value of tracked inventory across 3 warehouses.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        
        {/* Left: Location Performance Matrix */}
        <div className="glass-panel" style={{ flex: '1.5', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><Building2 size={20} /> Regional Subsidiaries</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {mockLocations.map((loc) => (
              <div 
                key={loc.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '1.5rem',
                  borderBottom: '1px solid rgba(255,255,255,0.03)' 
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem 0' }}>{loc.name}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Tenant ID: {loc.id}</span>
                </div>
                <div style={{ display: 'flex', gap: '2rem', textAlign: 'right' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>YTD Rev</span>
                    <span style={{ fontWeight: 600 }}>{loc.revenue}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>On-Hand</span>
                    <span style={{ fontWeight: 600 }}>{loc.inventory}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Logistics & Replenishment Engine */}
        <div className="glass-panel" style={{ flex: '1', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Truck size={20} color="var(--color-accent)" /> 
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Cross-Store Logistics</h2>
          </div>
          
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button style={{ width: '100%', padding: '1rem', background: 'rgba(63, 136, 197, 0.1)', border: '1px solid var(--color-primary)', color: 'var(--color-primary)', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <PackageCheck size={18} /> Initiate Inter-Store Transfer
            </button>
            <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Transfers</h3>
            
            {mockTransfers.map((trx, i) => (
              <div 
                key={i} 
                className="glass-card" 
                onClick={() => pushDrilldown({ type: 'INVENTORY_DETAIL', id: trx.id, title: `Logistics: ${trx.id}` })}
                style={{ cursor: 'pointer', padding: '1rem', borderLeft: `3px solid ${trx.status === 'IN_TRANSIT' ? 'var(--color-warning)' : 'var(--color-primary)'}` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>{trx.id}</span>
                  <span style={{ fontSize: '0.75rem', padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>{trx.status.replace('_', ' ')}</span>
                </div>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{trx.items}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{trx.from} → {trx.to}</span>
                  <span style={{ fontSize: '0.75rem', color: trx.status === 'IN_TRANSIT' ? 'var(--color-warning)' : 'var(--color-text-muted)' }}>{trx.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
