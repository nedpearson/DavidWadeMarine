import React, { useState } from 'react';
import { DollarSign, FileCheck, ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react';

const mockReceivables = [
  { id: 'INV-992', customer: 'Robert Fleet Services', amount: '$4,250.00', age: '14 Days', status: 'PENDING' },
  { id: 'INV-981', customer: 'Lakeside Marina rentals', amount: '$12,400.00', age: '32 Days', status: 'OVERDUE' },
];

const mockPayables = [
  { po: 'PO-YAM-042', vendor: 'Yamaha Outboards', amount: '$42,500.00', match: '3-WAY PENDING', due: 'Tomorrow' },
  { po: 'PO-MER-112', vendor: 'Mercury Marine', amount: '$18,200.00', match: 'MATCHED_READY', due: 'In 5 Days' },
];

export const FinanceOperations = () => {
  const [activeTab, setActiveTab] = useState<'RECEIVABLES' | 'PAYABLES'>('RECEIVABLES');

  return (
    <div className="animate-fade-in stagger-1" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '1rem' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={28} /> Operational Finance
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Receivables, 3-Way Payable Matching, and GL Exports</p>
        </div>
        <div className="glass-panel" style={{ display: 'flex', padding: '0.25rem', borderRadius: '8px' }}>
          <button onClick={() => setActiveTab('RECEIVABLES')} style={{ padding: '0.5rem 1.5rem', background: activeTab === 'RECEIVABLES' ? 'var(--color-primary)' : 'transparent', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600 }}>A/R (Inbound)</button>
          <button onClick={() => setActiveTab('PAYABLES')} style={{ padding: '0.5rem 1.5rem', background: activeTab === 'PAYABLES' ? 'var(--color-primary)' : 'transparent', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600 }}>A/P (Outbound)</button>
        </div>
      </header>

      {/* KPI Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Receivables</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: 0, color: 'var(--color-success)' }}>$16,650.00</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '2px solid var(--color-danger)' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Receivables &gt; 30 Days</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: 0, color: 'var(--color-danger)' }}>$12,400.00</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Payables</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: 0, color: 'var(--color-warning)' }}>$60,700.00</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(63, 136, 197, 0.05)' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Deposits / Liabilities</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: 0, color: '#fff' }}>$28,500.00</p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>*Held in Escrow state</span>
        </div>
      </div>

      {/* Operations Ledger */}
      <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', margin: 0 }}>
            {activeTab === 'RECEIVABLES' ? 'Accounts Receivable Ledger' : 'Accounts Payable & PO Matching'}
          </h2>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--color-text-muted)', color: 'var(--color-text-main)', borderRadius: '4px' }}>
            <FileCheck size={16} /> Export GL Mapping (CSV)
          </button>
        </div>

        {activeTab === 'RECEIVABLES' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mockReceivables.map(inv => (
              <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: `3px solid ${inv.status === 'OVERDUE' ? 'var(--color-danger)' : 'var(--color-success)'}` }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{inv.customer}</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Invoice {inv.id} • Aged {inv.age}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{inv.amount}</span>
                  <button style={{ padding: '0.5rem 1rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowDownRight size={16} /> Log Payment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'PAYABLES' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mockPayables.map(po => (
              <div key={po.po} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: `3px solid ${po.match === 'MATCHED_READY' ? 'var(--color-success)' : 'var(--color-warning)'}` }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{po.vendor}</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{po.po} • Due {po.due}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{po.amount}</span>
                    <span style={{ fontSize: '0.75rem', padding: '2px 6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', color: po.match === 'MATCHED_READY' ? 'var(--color-success)' : 'var(--color-warning)' }}>{po.match}</span>
                  </div>
                  <button style={{ padding: '0.5rem 1rem', background: po.match === 'MATCHED_READY' ? 'var(--color-primary)' : 'transparent', border: po.match === 'MATCHED_READY' ? 'none' : '1px solid var(--color-border)', color: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowUpRight size={16} /> {po.match === 'MATCHED_READY' ? 'Issue Payment' : 'Review Match Variance'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
