import React from 'react';
import { Box, Package, Truck, AlertTriangle, ArrowRightLeft } from 'lucide-react';

const mockInventory = [
  { sku: 'YAM-69J-13440-03', name: 'Yamaha Oil Filter F150', category: 'Maintenance', vendor: 'Yamaha Outboards', onHand: 14, min: 20, max: 50, cost: '$18.50', status: 'BELOW_MIN' },
  { sku: 'SHOP-RAG', name: 'Shop Towel Roll (Blue)', category: 'Supplies', vendor: 'Uline', onHand: 8, min: 5, max: 20, cost: '$4.20', status: 'HEALTHY' },
  { sku: 'BOS-WH-BGE-15', name: 'Whaler 150 Montauk Badge', category: 'OEM Deck', vendor: 'Boston Whaler', onHand: 0, min: 0, max: 2, cost: '$85.00', status: 'WAITING_ON_PARTS_RO' },
];

export const Inventory = () => {
  return (
    <div className="animate-fade-in stagger-1" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '1rem' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Box size={28} /> Parts & Logistics Engine
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Inventory Health, Vendor Purchasing, and Cycle Counts</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="glass-panel" style={{ padding: '0.5rem 1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowRightLeft size={18} /> Cross-Store Transfer
          </button>
          <button style={{ padding: '0.5rem 1.5rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package size={18} /> Receive Vendor PO
          </button>
        </div>
      </header>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Capital Value (On-Hand)</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: 0 }}>$142,850.50</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '2px solid var(--color-warning)' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Items Below Min</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: 0, color: 'var(--color-warning)' }}>48</p>
            <button style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem' }}>Draft Stock PO</button>
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '2px solid var(--color-danger)' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Service Stalled (Wait on Parts)</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: 0, color: 'var(--color-danger)' }}>7 ROs</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>In Transit (PO ETA)</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Truck size={24} color="var(--color-accent)" />
            <p style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: 0, color: 'var(--color-accent)' }}>12</p>
          </div>
        </div>
      </div>

      {/* Item Master Grid */}
      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 600, margin: 0 }}>Item Master Index</h3>
          <div style={{ width: '1px', height: '20px', background: 'var(--color-border)' }}></div>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Showing 8,421 Parts</span>
          <div style={{ flex: 1 }}></div>
          <select style={{ background: 'var(--color-bg-deep)', color: '#fff', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '6px 12px', outline: 'none' }}>
            <option>All Vendors</option>
            <option>Yamaha Outboards</option>
            <option>Mercury Marine</option>
          </select>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--color-bg-panel)', zIndex: 10, borderBottom: '2px solid var(--color-border)' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>SKU</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Name / Description</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Vendor</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Qty (Bounds)</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>MAC Cost</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Health Status</th>
              </tr>
            </thead>
            <tbody>
              {mockInventory.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s', cursor: 'pointer' }} className="table-row-hover">
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>{item.sku}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <p style={{ margin: 0, fontWeight: 500 }}>{item.name}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{item.category}</span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{item.vendor}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '1.1rem', color: item.onHand === 0 ? 'var(--color-danger)' : item.onHand < item.min ? 'var(--color-warning)' : '#fff' }}>{item.onHand}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>(Min {item.min} / Max {item.max})</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem' }}>{item.cost}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      background: item.status === 'BELOW_MIN' ? 'rgba(245, 158, 11, 0.1)' : item.status === 'WAITING_ON_PARTS_RO' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                      color: item.status === 'BELOW_MIN' ? 'var(--color-warning)' : item.status === 'WAITING_ON_PARTS_RO' ? 'var(--color-danger)' : 'var(--color-success)',
                      fontWeight: 600
                    }}>
                      {item.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
