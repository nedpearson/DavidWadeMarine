import { 
  Building2, 
  Wrench, 
  Users, 
  Package, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  ShieldAlert,
  CalendarCheck,
  ServerCrash,
  LayoutDashboard,
  Activity
} from 'lucide-react';
import { useDrilldown } from '../contexts/DrilldownContext';
import { useWidgets } from '../contexts/WidgetContext';
import type { WidgetId } from '../contexts/WidgetContext';

// --- MICRO-WIDGET COMPONENTS ---

import { InteractiveCalendar } from '../components/InteractiveCalendar';

const ServiceProgressWidget = () => {
  const { pushDrilldown } = useDrilldown();
  return (
    <div className="card animate-fade-in stagger-2" style={{ width: '100%', marginBottom: '1rem' }}>
      <div className="card-header">
        <h3 className="card-title"><Activity color="var(--color-accent)" /> Active Job Tracker</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
        
        {/* Job 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'RO_DETAIL', id: 'RO-9941', title: 'RO-9941: Mercury 250 Service' })}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ fontWeight: 600 }}>RO-9941 (Mercury 250 Service)</span>
            <span style={{ color: 'var(--color-success)' }}>80% Billed</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '80%', height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)' }} />
          </div>
        </div>

        {/* Job 2 - Stalled */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', cursor: 'pointer', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }} onClick={() => pushDrilldown({ type: 'RO_DETAIL', id: 'RO-8820', title: 'RO-8820: Yamaha Repower' })}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ fontWeight: 600 }}>RO-8820 (Yamaha Repower)</span>
            <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>STALLED: Waiting on Parts</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '20%', height: '100%', background: 'var(--color-danger)' }} />
          </div>
        </div>

      </div>
    </div>
  );
};

const FinanceKpiWidget = () => {
  const { pushDrilldown } = useDrilldown();
  return (
    <div className="card animate-fade-in stagger-1" style={{ width: '100%', marginBottom: '1rem' }}>
      <div className="card-header">
        <h3 className="card-title"><TrendingUp color="var(--color-success)" /> Global Financial Data</h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div className="kpi-block" onClick={() => pushDrilldown({ type: 'FINANCE_AR_INVOICE', id: 'REV-01', title: 'Topline Revenue Tracker' })}>
          <div className="kpi-label">YTD Revenue</div>
          <div className="kpi-value text-gradient" style={{ '--gradient-start': '#10b981', '--gradient-end': '#3b82f6' } as any}>$4.2M</div>
        </div>
        <div className="kpi-block" style={{ cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'PAYMENT_GATEWAY', id: 'ESCROW', title: 'Payment Processing Hub' })}>
          <div className="kpi-label">Unsettled Escrow</div>
          <div className="kpi-value warning">$142,500</div>
        </div>
        <div className="kpi-block" onClick={() => pushDrilldown({ type: 'BANK_RECONCILIATION', id: 'GL-YTD', title: 'Ledger Audit' })}>
          <div className="kpi-label">Ledger Variance</div>
          <div className="kpi-value success">+$0.00</div>
        </div>
      </div>
    </div>
  );
};

const ServiceKanbanWidget = () => {
  const { pushDrilldown } = useDrilldown();
  return (
    <div className="card animate-fade-in stagger-2" style={{ width: '100%', marginBottom: '1rem' }}>
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 className="card-title"><Wrench color="#3b82f6" /> Active Repair Pipeline</h3>
        <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>24 Open ROs</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
        {['R-9042 (Mercury 250 Service)', 'R-9045 (Yamaha Repower)'].map((ro, i) => (
          <div 
            key={i} 
            className="data-row hover-scale" 
            onClick={() => pushDrilldown({ type: 'RO_DETAIL', id: ro.split(' ')[0], title: ro })}
            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}
          >
            <div style={{ fontWeight: 600 }}>{ro}</div>
            <div style={{ color: 'var(--color-warning)', fontSize: '0.85rem' }}>Waiting on Parts</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EnterpriseTransfersWidget = () => {
  const { pushDrilldown } = useDrilldown();
  return (
    <div className="card animate-fade-in stagger-3" style={{ width: '100%', marginBottom: '1rem' }}>
      <div className="card-header">
        <h3 className="card-title"><Building2 color="#8b5cf6" /> Inter-Store Logistics</h3>
      </div>
      <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '8px', marginTop: '1rem', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'INVENTORY_ITEM', id: 'TRF-01', title: 'Part Transfer Manifest' })}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 600, color: '#c4b5fd' }}>Dallas Hub ➡️ Miami Retail</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>4x Garmin Nav Units (In-Transit)</div>
          </div>
          <Package color="#a78bfa" />
        </div>
      </div>
    </div>
  );
};

const WarrantyClaimsWidget = () => {
  const { pushDrilldown } = useDrilldown();
  return (
    <div className="card animate-fade-in" style={{ width: '100%', marginBottom: '1rem' }}>
      <div className="card-header">
        <h3 className="card-title"><ShieldAlert color="#f59e0b" /> OEM B2B Warranty Status</h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'FINANCE_AP_BILL', id: 'YAM-WAR-1', title: 'Yamaha Warranty Credit' })}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Pending Yamaha RGA</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-warning)' }}>$1,250.00</div>
        </div>
        <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'RO_DETAIL', id: 'MERC-4', title: 'Mercury Engine Replacement' })}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Approved by Mercury</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-success)' }}>$8,400.00</div>
        </div>
      </div>
    </div>
  );
};

const CrmLeadsWidget = () => {
  const { pushDrilldown } = useDrilldown();
  return (
    <div className="card animate-fade-in" style={{ width: '100%', marginBottom: '1rem' }}>
      <div className="card-header">
        <h3 className="card-title"><Users color="#10b981" /> Sales Funnel Tracker</h3>
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {['VIP Lead: 2024 Skeeter Wake', 'Cold Lead: Used Pontoon', 'Warm Lead: Repower Quote'].map((lead, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'CUSTOMER_PROFILE', id: `CUST-${i}`, title: lead })}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 0 ? 'var(--color-danger)' : i === 1 ? 'var(--color-text-muted)' : 'var(--color-warning)' }} />
            <div style={{ fontSize: '0.9rem' }}>{lead}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InventoryAlertsWidget = () => {
  const { pushDrilldown } = useDrilldown();
  return (
    <div className="card animate-fade-in" style={{ width: '100%', marginBottom: '1rem' }}>
      <div className="card-header">
        <h3 className="card-title"><ServerCrash color="#ef4444" /> Supply Constraints</h3>
      </div>
      <div 
        onClick={() => pushDrilldown({ type: 'VENDOR_PO', id: 'PO-991', title: 'Emergency Restock Order' })}
        style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', cursor: 'pointer' }}
      >
        <AlertTriangle color="var(--color-danger)" size={24} />
        <div>
          <div style={{ fontWeight: 600, color: '#fca5a5' }}>Critical Stockout: Yamaha 10W-30 Oil</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>0 Quarts remaining. Service jobs currently blocked. Click to draft emergency PO.</div>
        </div>
      </div>
    </div>
  );
};

const PayrollAnomaliesWidget = () => {
  const { pushDrilldown } = useDrilldown();
  return (
    <div className="card animate-fade-in" style={{ width: '100%', marginBottom: '1rem' }}>
      <div className="card-header">
        <h3 className="card-title"><Clock color="#f43f5e" /> HR Payroll Warnings</h3>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer' }} onClick={() => pushDrilldown({ type: 'HR_PAYROLL_EXCEPTION', id: 'HR-22', title: 'Timepunch Anomaly' })}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CalendarCheck size={18} color="var(--color-text-muted)" />
            <span>Tech: Mike R. (Flat Rate Discrepancy)</span>
          </div>
          <div style={{ color: 'var(--color-warning)', fontWeight: 600 }}>Review required</div>
        </div>
      </div>
    </div>
  );
};


// --- MAIN DASHBOARD RENDERER ---

export const Dashboard = () => {
  const { activeWidgets } = useWidgets();

  const renderWidget = (id: WidgetId) => {
    switch (id) {
      case 'DAILY_CALENDAR': return <InteractiveCalendar key={id} />;
      case 'SERVICE_PROGRESS': return <ServiceProgressWidget key={id} />;
      case 'FINANCE_KPI': return <FinanceKpiWidget key={id} />;
      case 'SERVICE_KANBAN': return <ServiceKanbanWidget key={id} />;
      case 'ENTERPRISE_TRANSFERS': return <EnterpriseTransfersWidget key={id} />;
      case 'WARRANTY_CLAIMS': return <WarrantyClaimsWidget key={id} />;
      case 'CRM_LEADS': return <CrmLeadsWidget key={id} />;
      case 'INVENTORY_ALERTS': return <InventoryAlertsWidget key={id} />;
      case 'PAYROLL_ANOMALIES': return <PayrollAnomaliesWidget key={id} />;
      default: return null;
    }
  };

  return (
    <div className="animate-fade-in" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Good Morning.</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>Here is your dynamic command center snapshot.</p>
      </div>
      
      {activeWidgets.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
          <LayoutDashboard size={48} color="var(--color-text-muted)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
          <h3 style={{ color: 'var(--color-text-main)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Your Dashboard is Empty</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>Navigate to Settings &rarr; Dashboard Preferences to enable widgets.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {activeWidgets.map(widget => renderWidget(widget.id))}
        </div>
      )}
    </div>
  );
};
