import { useDrilldown } from '../contexts/DrilldownContext';
import type { DrilldownView } from '../contexts/DrilldownContext';
import { ArrowRight, Activity, Package, Users, Tag, Wrench } from 'lucide-react';

export const resolveDrilldownView = (view: DrilldownView) => {
  const { pushDrilldown } = useDrilldown();

  // Route the rendering based on drilldown `type`
  switch (view.type) {
    // ---------------------------------------------------------
    // DASHBOARD & SERVICE KPIS
    // ---------------------------------------------------------
    case 'KPI_SERVICE_UTILIZATION':
      return (
        <div className="animate-fade-in">
          <p style={{ color: 'var(--color-text-muted)' }}>Drilling down into Service Utilization (Level 2). Here are the 12 active bays.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            {['Bay 1: 2022 Yamaha 252 (Mike T.)', 'Bay 2: 2018 SeaRay 190 (Alex H.)', 'Bay 3: Diagnostics Queue'].map((bay, i) => (
              <div 
                key={i} 
                className="glass-card" 
                style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                onClick={() => pushDrilldown({ type: 'RO_DETAIL', id: `RO-BAY-${i}`, title: bay })}
              >
                <span style={{ fontWeight: 600 }}>{bay}</span>
                <ArrowRight size={18} color="var(--color-primary)" />
              </div>
            ))}
          </div>
        </div>
      );

    case 'KPI_WAITING_ON_PARTS':
      return (
        <div className="animate-fade-in">
          <p style={{ color: 'var(--color-text-muted)' }}>Drilling down into Bottleneck Widget: Waiting on Parts (Level 2).</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '3px solid var(--color-danger)', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'RO_DETAIL', id: 'RO-2934', title: 'RO-2934 (Mike T.)' })}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>RO-2934</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Blocked by: YAM-112 Impeller</span>
              </div>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '3px solid var(--color-danger)', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'RO_DETAIL', id: 'RO-2936', title: 'RO-2936 (Alex H.)' })}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>RO-2936</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Blocked by: SeaRay Hull Patch Kit</span>
              </div>
            </div>
          </div>
        </div>
      );

    // ---------------------------------------------------------
    // MASTER DETAIL VIEWS
    // ---------------------------------------------------------
    case 'RO_DETAIL':
      return (
        <div className="animate-fade-in">
          <p style={{ color: 'var(--color-text-muted)' }}>Repair Order Breakdown (Level 3). Details for {view.title}.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            
            <div className="glass-card" style={{ padding: '1.5rem', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'CUSTOMER_PROFILE', id: 'CUST-100', title: 'Customer Profile: David O.' })}>
              <h4 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 0.5rem 0' }}>
                <Users size={16} /> Customer Data
              </h4>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>David O.</p>
              <button style={{ marginTop: '1rem', background: 'transparent', color: 'var(--color-accent)', border: 'none', padding: 0 }}>View Profile &rarr;</button>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'PART_REQUIREMENTS', id: 'PARTS-RO1', title: 'Required Parts' })}>
              <h4 style={{ color: 'var(--color-warning)', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 0.5rem 0' }}>
                <Package size={16} /> Parts Needed
              </h4>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>2 Items</p>
              <button style={{ marginTop: '1rem', background: 'transparent', color: 'var(--color-accent)', border: 'none', padding: 0 }}>View Pull Sheet &rarr;</button>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'TECH_TIMELOGS', id: 'TECH-LOGS', title: 'Technician Labor Logs' })}>
              <h4 style={{ color: 'var(--color-info)', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 0.5rem 0' }}>
                <Wrench size={16} /> Labor Dispatched
              </h4>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>4.5 Hrs Allocated</p>
              <button style={{ marginTop: '1rem', background: 'transparent', color: 'var(--color-accent)', border: 'none', padding: 0 }}>View Punches &rarr;</button>
            </div>

          </div>
        </div>
      );

    case 'CUSTOMER_PROFILE':
      return (
        <div className="animate-fade-in glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', margin: '0 0 1rem 0' }}>{view.title}</h3>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', margin: '0 0 2rem 0' }}>
            This customer has purchased 2 boats and completed 14 service appointments over the last 5 years. (Level 4/5 Deep Nav achieved).
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Outstanding Balance</span>
              <span style={{ fontWeight: 600, color: 'var(--color-danger)' }}>$1,420.00</span>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Average Response Time</span>
              <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>2.4 Hours</span>
            </div>
          </div>
          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid var(--color-success)' }}>
            <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>VIP Tier Reached - 10% Discount Applied Globally</span>
          </div>
        </div>
      );
      
    case 'PART_REQUIREMENTS':
      return (
        <div className="animate-fade-in glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', margin: '0 0 1rem 0' }}>Part Allocation & Pull Sheet</h3>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}>SKU</th>
                <th style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}>Qty</th>
                <th style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}>Status</th>
                <th style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>YAM-112 Impeller</td>
                <td style={{ padding: '1rem 0.5rem' }}>1</td>
                <td style={{ padding: '1rem 0.5rem', color: 'var(--color-danger)' }}>Out of Stock</td>
                <td style={{ padding: '1rem 0.5rem' }}>
                  <button onClick={() => pushDrilldown({ type: 'VENDOR_PO', id: 'PO-DRAFT', title: 'Yamaha Emergency PO Drafting' })} style={{ padding: '4px 12px', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: '4px', fontSize: '0.75rem' }}>Draft PO &rarr;</button>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>YML-LUBE-G</td>
                <td style={{ padding: '1rem 0.5rem' }}>2</td>
                <td style={{ padding: '1rem 0.5rem', color: 'var(--color-success)' }}>Allocated</td>
                <td style={{ padding: '1rem 0.5rem', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                  Located in Bin C-4
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case 'TECH_TIMELOGS':
      return (
        <div className="animate-fade-in glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Flat-Rate vs Actual Punches</h3>
          <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.5rem 0' }}>Mike T. logged 2 separate sessions on this RO.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid var(--color-primary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Oct 14th - Initial Diag</span>
              <span style={{ fontWeight: 600 }}>1.2 Hrs Clocked</span>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid var(--color-primary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Oct 15th - Teardown</span>
              <span style={{ fontWeight: 600 }}>0.8 Hrs Clocked</span>
            </div>
          </div>
        </div>
      );

    case 'VENDOR_PO':
      return (
        <div className="animate-fade-in glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--color-accent)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}><Tag size={20} color="var(--color-accent)" /> Dealer-to-Vendor Gateway</h3>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>You are about to transmit a B2B Purchase Order dynamically via EDI.</p>
          <div style={{ background: 'var(--color-bg-deep)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Order Manifest: Yamaha Outboards USA</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px dashed var(--color-border)', paddingBottom: '0.5rem' }}>
              <span>1x YAM-112 Impeller (Overnight Air)</span>
              <span style={{ fontWeight: 600 }}>$14.20 MAC</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Estimated Delivery</span>
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Tomorrow, 10:30 AM</span>
            </div>
          </div>
          <button style={{ marginTop: '2rem', width: '100%', padding: '1rem', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '1.1rem' }}>
            Transmit Drop-Ship PO
          </button>
        </div>
      );

    // Fallback for an unhandled drilldown
    default:
      return (
        <div className="animate-fade-in glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <Activity size={48} color="var(--color-text-muted)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
          <h3 style={{ margin: '0 0 1rem 0' }}>Dynamic Data Resolver Engine</h3>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', margin: '1rem auto' }}>
            Drilling down into <strong>{view.type}</strong> for ID <strong>{view.id}</strong>. 
            (Connect this endpoint to the backend SQL query engine to pull robust L2/L3 data).
          </p>
          <pre style={{ textAlign: 'left', background: 'var(--color-bg-deep)', padding: '1rem', borderRadius: '4px', marginTop: '2rem', overflowX: 'auto', fontSize: '0.85rem' }}>
            {JSON.stringify(view, null, 2)}
          </pre>
        </div>
      );
  }
};
