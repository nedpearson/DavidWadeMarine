import { PieChart, Download, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { useDrilldown } from '../contexts/DrilldownContext';

export const Analytics = () => {
  const { pushDrilldown } = useDrilldown();
  return (
    <div className="animate-fade-in stagger-1" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '1rem' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PieChart size={28} /> Reporting & Analytics
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Enterprise Scorecards, Profitability, and Variance Analysis</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="glass-panel" style={{ padding: '0.5rem 1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} /> Deep Filters
          </button>
          <button style={{ padding: '0.5rem 1.5rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={18} /> Export Packet
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        
        {/* Sales Margin Reporting */}
        <div 
          className="glass-card" 
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
          onClick={() => pushDrilldown({ type: 'ANALYTICS_LABOR_PROFIT', title: 'Overall Gross Margin' })}
        >
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Overall Gross Profit (MTD)</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: '0 0 0.5rem 0', color: 'var(--color-success)' }}>28.4%</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success)', fontSize: '0.85rem' }}>
            <TrendingUp size={16} /> <span style={{ fontWeight: 600 }}>+2.1%</span> vs last month
          </div>
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Unit Sales Margin</span>
              <span style={{ fontWeight: 600 }}>18.2%</span>
            </div>
            
            {/* Hidden Cost Drill-Down Feature */}
            <div className="animate-fade-in" style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '4px', borderLeft: '2px solid var(--color-danger)', marginBottom: '0.5rem' }}>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-danger)', textTransform: 'uppercase' }}>Margin Compression Drivers (MTD)</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                <span>Flooring Interest Escrow</span><span>-$2,410.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                <span>Inbound Freight Overages</span><span>-$1,280.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                <span>Internal Dealer Prep Labor</span><span>-$4,100.00</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Parts Counter Margin</span>
              <span style={{ fontWeight: 600 }}>42.8%</span>
            </div>
          </div>
        </div>

        {/* Service Efficiency */}
        <div 
          className="glass-card" 
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
          onClick={() => pushDrilldown({ type: 'KPI_SERVICE_UTILIZATION', title: 'Labor Profitability Analysis' })}
        >
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Labor Profitability (MTD)</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: '0 0 0.5rem 0', color: 'var(--color-warning)' }}>-1.2%</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-danger)', fontSize: '0.85rem' }}>
            <TrendingDown size={16} /> <span style={{ fontWeight: 600 }}>Target: +15.0%</span>
          </div>
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Clocked Hours Cost</span>
              <span style={{ fontWeight: 600 }}>$14,210</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Flat-Rate Billed</span>
              <span style={{ fontWeight: 600 }}>$14,028</span>
            </div>
          </div>
        </div>

        {/* Cashflow Engine */}
        <div 
          className="glass-card" 
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
          onClick={() => pushDrilldown({ type: 'ANALYTICS_PARTS_MARGIN', title: 'Operational Cashflow' })}
        >
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Working Capital / Receivables</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: '0 0 0.5rem 0', color: '#fff' }}>$84,200</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-danger)', fontSize: '0.85rem' }}>
            <AlertCircleIcon /> <span style={{ fontWeight: 600 }}>12 Invoices past 30 Days</span>
          </div>
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
            <button style={{ width: '100%', padding: '0.5rem', background: 'transparent', border: '1px dashed var(--color-border)', color: 'var(--color-text-main)', borderRadius: '4px' }}>
              Open Aging Report
            </button>
          </div>
        </div>

      </div>

      <div className="glass-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--color-text-muted)', gap: '1rem' }}>
        <PieChart size={48} style={{ opacity: 0.2 }} />
        <p>Select a specific multidimensional report from the left sidebar to generate grid.</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.75rem' }}>Executive Board</span>
          <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.75rem' }}>Service Tech Performance</span>
          <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.75rem' }}>Campaign ROI</span>
        </div>
      </div>

    </div>
  );
};

const AlertCircleIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
