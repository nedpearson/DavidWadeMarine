import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { 
  Wrench, AlertTriangle, TrendingUp, DollarSign, Clock, PackageCheck
} from 'lucide-react';
import { useDrilldown } from '../contexts/DrilldownContext';

const laborData = [
  { name: 'Mon', billed: 42, clocked: 38 },
  { name: 'Tue', billed: 56, clocked: 40 },
  { name: 'Wed', billed: 61, clocked: 41 },
  { name: 'Thu', billed: 45, clocked: 39 },
  { name: 'Fri', billed: 50, clocked: 40 },
];

const revenueData = [
  { time: '8AM', sales: 1200 },
  { time: '10AM', sales: 4500 },
  { time: '12PM', sales: 8900 },
  { time: '2PM', sales: 15400 },
  { time: '4PM', sales: 28900 },
  { time: 'Now', sales: 34250 },
];

export const Dashboard = () => {
  const { pushDrilldown } = useDrilldown();
  return (
    <div className="animate-fade-in stagger-1" style={{ paddingBottom: '2rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '0.25rem' }}>Executive Command Center</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>David Wade Marine Real-Time Pulse</p>
        </div>
        <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)', boxShadow: '0 0 8px var(--color-success)' }}></div>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Systems Normal</span>
          </div>
          <select style={{ background: 'transparent', color: '#fff', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '4px 8px', outline: 'none' }}>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </header>

      {/* Primary KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Service Capacity Widget */}
        <div 
          className="glass-card" 
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
          onClick={() => pushDrilldown({ type: 'KPI_SERVICE_UTILIZATION', title: 'Service Utilization' })}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Service Utilization</h3>
            <Wrench size={20} color="var(--color-info)" />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-text-main)', lineHeight: 1 }}>85%<span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginLeft: '8px', fontWeight: 400 }}>Shop Load</span></p>
            <div style={{ marginTop: '0.75rem', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: 'var(--color-info)' }}></div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>12 of 15 Bays active.</p>
          </div>
        </div>

        {/* Bottleneck Widget */}
        <div 
          className="glass-card" 
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '2px solid var(--color-danger)', cursor: 'pointer' }}
          onClick={() => pushDrilldown({ type: 'KPI_WAITING_ON_PARTS', title: 'Waiting On Parts' })}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Waiting On Parts</h3>
            <AlertTriangle size={20} color="var(--color-danger)" />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-danger)', lineHeight: 1 }}>7<span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginLeft: '8px', fontWeight: 400 }}>Repair Orders</span></p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={12} color="var(--color-danger)" /> +2 since yesterday
            </p>
          </div>
        </div>

        {/* Commerce Widget */}
        <div 
          className="glass-card" 
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
          onClick={() => pushDrilldown({ type: 'KPI_POS_REVENUE', title: 'POS & Sales Revenue' })}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>POS & Sales Revenue</h3>
            <DollarSign size={20} color="var(--color-success)" />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-success)', lineHeight: 1 }}>$34.2k</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Includes $18k Boat Deposit.</p>
          </div>
        </div>

        {/* Inventory Widget */}
        <div 
          className="glass-card" 
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
          onClick={() => pushDrilldown({ type: 'KPI_READY_PICKUPS', title: 'Ready Pickups' })}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Ready Pickups</h3>
            <PackageCheck size={20} color="var(--color-accent)" />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-accent)', lineHeight: 1 }}>3<span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginLeft: '8px', fontWeight: 400 }}>Boats</span></p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>QA Water-tested & Washed.</p>
          </div>
        </div>
      </div>

      {/* Chart Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Flat Rate vs Clocked Labor Chart */}
        <div className="glass-card stagger-2" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>Technician Proficiency</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Billed Flat-Rate vs Actual Clocked Hours</p>
            </div>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={laborData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-muted)" axisLine={false} tickLine={false} />
                <YAxis stroke="var(--color-text-muted)" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(5, 10, 20, 0.95)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="billed" name="Billed (Flat-Rate)" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clocked" name="Clocked (Actual)" fill="var(--color-text-muted)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Revenue Trend */}
        <div className="glass-card stagger-2" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>Intraday Revenue</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Live Register Velocity</p>
          </div>
          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="time" stroke="var(--color-text-muted)" axisLine={false} tickLine={false} style={{ fontSize: '12px' }} />
                <YAxis stroke="transparent" tick={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(5, 10, 20, 0.95)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                  labelStyle={{ display: 'none' }}
                />
                <Line type="monotone" dataKey="sales" name="Volume" stroke="var(--color-success)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-success)', strokeWidth: 2, stroke: 'var(--color-bg-deep)' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', borderLeft: '3px solid var(--color-success)' }}>
            <p style={{ fontSize: '0.875rem', margin: 0 }}>Tracking <strong>18% ahead</strong> of historic Wednesday averages.</p>
          </div>
        </div>

      </div>

      {/* Live Transaction Feed / Pipeline */}
      <div className="glass-card stagger-3" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} color="var(--color-primary)" /> Live Operations Pipeline
          </h3>
          <button style={{ background: 'transparent', color: 'var(--color-primary)', fontSize: '0.875rem' }}>View Master Log &rarr;</button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--color-warning)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}><strong>RO #2934</strong> Status Halted <span style={{ padding: '2px 6px', background: 'rgba(245, 158, 11, 0.2)', color: 'var(--color-warning)', borderRadius: '4px', fontSize: '0.75rem', marginLeft: '8px' }}>WAITING ON PARTS</span></p>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Tech: Mike T. • Part #Yam-112 Impeller required.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>4 mins ago</span>
              <button style={{ padding: '6px 16px', background: 'var(--color-primary)', color: '#fff', borderRadius: '4px', fontSize: '0.75rem', border: 'none' }}>Draft PO</button>
            </div>
          </div>

          <div style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--color-success)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}><strong>Checkout Complete</strong> - Invoice #8849</p>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Cashier: Sarah • 4 items • $215.40 • Split Tender</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>12 mins ago</span>
              <button style={{ padding: '6px 16px', border: '1px solid var(--color-border)', background: 'transparent', color: '#fff', borderRadius: '4px', fontSize: '0.75rem' }}>View Receipt</button>
            </div>
          </div>

          <div style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--color-info)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}><strong>New Web Lead</strong> - 2024 SeaRay SPX 190</p>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Auto-assigned to: Sales Round Robin (Dave). Target Score: 85/100.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>18 mins ago</span>
              <button style={{ padding: '6px 16px', border: '1px solid var(--color-border)', background: 'transparent', color: '#fff', borderRadius: '4px', fontSize: '0.75rem' }}>View CRM Profile</button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
