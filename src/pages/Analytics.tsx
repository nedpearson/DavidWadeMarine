import { useState } from 'react';
import { 
  PieChart, Download, DollarSign, 
  Users, Wrench, Package, Briefcase, BarChart3,
  Activity, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { useDrilldown } from '../contexts/DrilldownContext';
import { useGlobalFilter } from '../contexts/FilterContext';

type ReportTab = 'EXECUTIVE' | 'SALES' | 'SERVICE' | 'INVENTORY';

export const Analytics = () => {
  const { pushDrilldown } = useDrilldown();
  const { filters } = useGlobalFilter();
  const [activeTab, setActiveTab] = useState<ReportTab>('EXECUTIVE');

  // Helper calculation to simulate data warping based on global filters
  const filterMultiplier = 
    (filters.dateRange === 'YTD' ? 8.5 : filters.dateRange === 'QTD' ? 3.2 : 1) *
    (filters.locationId === 'ALL' ? 1.5 : 1) *
    (filters.department === 'ALL' ? 1 : 0.4);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="animate-fade-in stagger-1" style={{ height: 'calc(100vh - 170px)', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '1rem' }}>
      
      {/* Module Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={28} /> World Class Reporting
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Multidimensional Scorecards and Variance Logic</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ padding: '0.5rem 1.5rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={18} /> Export Packet PDF
          </button>
        </div>
      </header>

      {/* Primary Reporting Navigation Tabs */}
      <div className="glass-panel" style={{ display: 'flex', padding: '0.5rem', gap: '0.5rem', borderRadius: '8px' }}>
        {[
          { id: 'EXECUTIVE', label: 'Executive Board', icon: Briefcase },
          { id: 'SALES', label: 'Sales & Margin', icon: DollarSign },
          { id: 'SERVICE', label: 'Service Efficiency', icon: Wrench },
          { id: 'INVENTORY', label: 'Inventory Velocity', icon: Package }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ReportTab)}
              style={{
                flex: 1, padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: isActive ? 'rgba(63, 136, 197, 0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(63, 136, 197, 0.4)' : '1px solid transparent',
                borderRadius: '6px', color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: isActive ? 600 : 500, transition: 'all 0.2s ease'
              }}
            >
              <Icon size={18} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Reporting Container */}
      <div className="page-scroll-area glass-panel" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* ========================================================== */}
        {/* EXECUTIVE BOARD VIEW */}
        {/* ========================================================== */}
        {activeTab === 'EXECUTIVE' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              <div className="kpi-block hover-scale" onClick={() => pushDrilldown({ type: 'FINANCE_AR_INVOICE', id: 'REV-GL', title: 'Topline Revenue Extrapolated' })}>
                <div className="kpi-label">Topline Revenue</div>
                <div className="kpi-value text-gradient" style={{ '--gradient-start': '#10b981', '--gradient-end': '#3b82f6' } as any}>{formatCurrency(1425000 * filterMultiplier)}</div>
                <div style={{ color: 'var(--color-success)', fontSize: '0.85rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><ArrowUpRight size={14}/> +14.2% Growth</div>
              </div>
              <div className="kpi-block hover-scale" onClick={() => pushDrilldown({ type: 'BANK_RECONCILIATION', id: 'EBITDA', title: 'EBITDA Analysis' })}>
                <div className="kpi-label">Projected EBITDA</div>
                <div className="kpi-value">{formatCurrency(284000 * filterMultiplier)}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>19.9% Margin</div>
              </div>
              <div className="kpi-block hover-scale" onClick={() => pushDrilldown({ type: 'PAYMENT_GATEWAY', id: 'CASH', title: 'Cashflow Variance' })}>
                <div className="kpi-label">Operating Cashflow</div>
                <div className="kpi-value warning">{formatCurrency(192500 * filterMultiplier)}</div>
                <div style={{ color: 'var(--color-warning)', fontSize: '0.85rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><ArrowDownRight size={14}/> Tight liquidity detected</div>
              </div>
              <div className="kpi-block hover-scale" onClick={() => pushDrilldown({ type: 'HR_PAYROLL_EXCEPTION', id: 'PAY-W', title: 'Total Payroll Overhead' })}>
                <div className="kpi-label">Payroll Overhead</div>
                <div className="kpi-value danger">{formatCurrency(115000 * filterMultiplier)}</div>
                <div style={{ color: 'var(--color-danger)', fontSize: '0.85rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><ArrowUpRight size={14}/> +4% over target</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {/* Departmental Revenue Composition Chart (CSS Driven) */}
              <div className="glass-card" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><PieChart size={18} color="var(--color-primary)"/> Revenue Composition</h3>
                
                {/* Simulated Stacked Bar Chart */}
                <div style={{ width: '100%', height: '32px', display: 'flex', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <div style={{ width: '45%', background: '#3b82f6', height: '100%' }} title="Sales Operations" />
                  <div style={{ width: '35%', background: '#10b981', height: '100%' }} title="Service Labor" />
                  <div style={{ width: '20%', background: '#8b5cf6', height: '100%' }} title="Parts Counter" />
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'FINANCE_AR_INVOICE', id: 'SALES-DEP', title: 'Sales Operations Ledger' })}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '2px' }}/> <span>Sales Operations</span></div>
                    <span style={{ fontWeight: 600 }}>45.0%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'FINANCE_AR_INVOICE', id: 'SRV-DEP', title: 'Service Operations Ledger' })}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '2px' }}/> <span>Service Labor</span></div>
                    <span style={{ fontWeight: 600 }}>35.0%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'FINANCE_AR_INVOICE', id: 'PRT-DEP', title: 'Parts Operations Ledger' })}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: '#8b5cf6', borderRadius: '2px' }}/> <span>Parts Counter</span></div>
                    <span style={{ fontWeight: 600 }}>20.0%</span>
                  </div>
                </div>
              </div>

              {/* Profitability Variance Data-grid */}
              <div className="glass-card" style={{ flex: 1.5, padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={18} color="var(--color-primary)"/> Profitability Variance</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--color-border)', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
                  {[
                    { label: 'Flooring Interest Cost', actual: 12400, budget: 9000 },
                    { label: 'Unapplied Tech Time', actual: 4800, budget: 2000 },
                    { label: 'Marketing Spend ROI', actual: 8500, budget: 15000, positiveVariance: true }
                  ].map((row, i) => {
                    const variance = row.budget - row.actual;
                    const isGood = row.positiveVariance ? variance < 0 : variance > 0;
                    return (
                      <div key={i} className="hover-scale" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--color-bg-panel)', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'BANK_RECONCILIATION', id: `VAR-${i}`, title: `${row.label} Drilldown` })}>
                        <span style={{ fontWeight: 500 }}>{row.label}</span>
                        <div style={{ display: 'flex', gap: '2rem', textAlign: 'right', minWidth: '200px', justifyContent: 'flex-end' }}>
                          <span style={{ color: 'var(--color-text-muted)' }}>{formatCurrency(row.actual * filterMultiplier)}</span>
                          <span style={{ color: isGood ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 600, minWidth: '80px' }}>
                            {isGood ? '+' : ''}{formatCurrency(Math.abs(variance) * filterMultiplier)}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* SALES & MARGIN VIEW */}
        {/* ========================================================== */}
        {activeTab === 'SALES' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              <div className="kpi-block">
                <div className="kpi-label">Front-End Unit Gross</div>
                <div className="kpi-value text-gradient" style={{ '--gradient-start': '#3b82f6', '--gradient-end': '#8b5cf6' } as any}>{formatCurrency(4120 * filterMultiplier)}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Avg per Boat Sold</div>
              </div>
              <div className="kpi-block">
                <div className="kpi-label">Back-End (F&I) Gross</div>
                <div className="kpi-value">{formatCurrency(1950 * filterMultiplier)}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>62% Escrow Penetration</div>
              </div>
              <div className="kpi-block">
                <div className="kpi-label">Total Unit Count Driven</div>
                <div className="kpi-value success">{Math.floor(24 * filterMultiplier)} Units</div>
                <div style={{ color: 'var(--color-success)', fontSize: '0.85rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><ArrowUpRight size={14}/> +3 vs prior period</div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Unit Type Margins (CSS Chart)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { label: 'Outboard Repowers', percent: 85, color: '#3b82f6' },
                  { label: 'New Pontoon Packages', percent: 65, color: '#10b981' },
                  { label: 'Used Fiberglass Trades', percent: 45, color: '#f59e0b' }
                ].map((bar, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'INVENTORY_CAPITAL_VALUE', id: bar.label, title: `${bar.label} Drilldown` })}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span>{bar.label}</span>
                      <span style={{ fontWeight: 600 }}>{bar.percent}% Margin Retained</span>
                    </div>
                    <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${bar.percent}%`, height: '100%', background: bar.color, transition: 'width 1s ease-out' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* SERVICE TRACKER VIEW */}
        {/* ========================================================== */}
        {activeTab === 'SERVICE' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              <div className="kpi-block">
                <div className="kpi-label">Shop Efficiency (Billed vs Clocked)</div>
                <div className="kpi-value text-gradient" style={{ '--gradient-start': '#f59e0b', '--gradient-end': '#ef4444' } as any}>94.2%</div>
                <div style={{ color: 'var(--color-danger)', fontSize: '0.85rem', marginTop: '4px' }}>Under 100% Target - Bleeding Cost</div>
              </div>
              <div className="kpi-block" style={{ cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'HR_PAYROLL_EXCEPTION', id: 'UNAPPLIED', title: 'Unapplied Labor Engine' })}>
                <div className="kpi-label">Unapplied Time Value</div>
                <div className="kpi-value warning">{formatCurrency(4125 * filterMultiplier)}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Lost margin to sweep/prep</div>
              </div>
              <div className="kpi-block">
                <div className="kpi-label">Effective Labor Rate</div>
                <div className="kpi-value">{formatCurrency(145)} / hr</div>
                <div style={{ color: 'var(--color-success)', fontSize: '0.85rem', marginTop: '4px' }}>Optimal threshold maintained</div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={18} color="var(--color-primary)"/> Technician Leaderboard Pivot</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Technician</th>
                    <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Clocked</th>
                    <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Flat-Rate Billed</th>
                    <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Efficiency %</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Mike Robinson', clk: 40, bill: 52, eff: 130, color: 'var(--color-success)' },
                    { name: 'Sarah Larson', clk: 38, bill: 35, eff: 92, color: 'var(--color-warning)' },
                    { name: 'Dave Junior', clk: 42, bill: 28, eff: 66, color: 'var(--color-danger)' },
                  ].map((tech, i) => (
                    <tr key={i} className="table-row-hover" style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'EMPLOYEE_PROFILE', id: `TECH-${i}`, title: tech.name })}>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>{tech.name}</td>
                      <td style={{ padding: '1rem' }}>{(tech.clk * filterMultiplier).toFixed(1)}h</td>
                      <td style={{ padding: '1rem' }}>{(tech.bill * filterMultiplier).toFixed(1)}h</td>
                      <td style={{ padding: '1rem', fontWeight: 700, color: tech.color }}>{tech.eff}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* INVENTORY VELOCITY VIEW */}
        {/* ========================================================== */}
        {activeTab === 'INVENTORY' && (
          <div className="animate-fade-in" style={{ display: 'flex', gap: '1.5rem' }}>
            <div className="glass-card" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Obsolescence Risk Capital</h3>
                <p style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: 0, color: 'var(--color-danger)' }}>{formatCurrency(18200 * filterMultiplier)}</p>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Parts aged &gt; 365 Days without 1 sale</div>
              </div>
              <button onClick={() => pushDrilldown({ type: 'INVENTORY_ITEM', id: 'WRITE-OFF', title: 'Write-off Target Ledger' })} style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid var(--color-danger)', color: 'var(--color-danger)', borderRadius: '8px', cursor: 'pointer' }}>Generate Tax Write-off Matrix Report</button>
            </div>
            
            <div className="glass-card" style={{ flex: 1.5, padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>High-Velocity Backorders (Lost Sales)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--color-danger)', borderRadius: '4px', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'INVENTORY_ITEM', id: 'YAM-10W30', title: 'Yamaha 10W-30 Oil' })}>
                  <div>
                    <div style={{ fontWeight: 600 }}>Yamaha 10W-30 Engine Oil</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Stockout Events: 14</div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--color-danger)' }}>Missing {formatCurrency(840 * filterMultiplier)} Profit</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--color-danger)', borderRadius: '4px', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'INVENTORY_ITEM', id: 'MER-TRIM', title: 'Mercury Trim Relay' })}>
                  <div>
                    <div style={{ fontWeight: 600 }}>Mercury Trim Relay Component</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Stockout Events: 6</div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--color-danger)' }}>Missing {formatCurrency(480 * filterMultiplier)} Profit</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
