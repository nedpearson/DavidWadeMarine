import { Users, Clock, AlertOctagon, CheckCircle, BrainCircuit } from 'lucide-react';
import { useDrilldown } from '../contexts/DrilldownContext';

const mockPayrollExceptions = [
  { id: 'TCL-99', employee: 'Mike Technician', anomaly: '300% Flat-Rate Variance', reason: 'Clocked 14h vs 35h Generated Billed', status: 'REQUIRES_GM_OVERRIDE' },
  { id: 'TCL-104', employee: 'Sarah Larson', anomaly: 'Missed Punch (Out)', reason: 'System auto-locked at 11:59PM cutoff', status: 'PENDING_CORRECTION' },
];

export const EmployeeHub = () => {
  const { pushDrilldown } = useDrilldown();
  return (
    <div className="animate-fade-in stagger-1" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '1rem' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={28} /> Employee & Payroll Hub
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Timeclocks, Flat-Rate Reconciliation, and Missed Punch Corrections</p>
        </div>
        <button style={{ padding: '0.5rem 1.5rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={18} /> Lock & Export Payroll (ADP)
        </button>
      </header>

      {/* Main Container */}
      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        
        {/* Timeclock Snapshot */}
        <div className="glass-panel" style={{ width: '400px', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
            <Clock size={20} color="var(--color-accent)" /> Active Floor Roster
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <span style={{ fontWeight: 600, display: 'block' }}>Mike Technician</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-success)' }}>Punched IN at 8:04 AM</span>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-text-main)' }}>7h 14m</span>
            </div>
            
            {/* Gamified QA Leaderboard Hook */}
            <div className="animate-fade-in" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--color-border)', marginTop: '0.5rem' }}>
              <h3 style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                Tech Leaderboard 
                <span style={{ color: 'var(--color-accent)' }}>Live Rank</span>
              </h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div>
                  <span style={{ display: 'inline-block', width: '20px', height: '20px', background: 'var(--color-primary)', color: '#fff', borderRadius: '50%', textAlign: 'center', fontSize: '0.75rem', lineHeight: '20px', marginRight: '8px' }}>1</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Alex H.</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-success)' }}>184% Efficient</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>0 Rework Comebacks</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ display: 'inline-block', width: '20px', height: '20px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '50%', textAlign: 'center', fontSize: '0.75rem', lineHeight: '20px', marginRight: '8px' }}>2</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Mike T.</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-danger)' }}>310% Efficient</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-danger)' }}>14% Rework Comeback Ratio!</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', opacity: 0.5 }}>
              <div>
                <span style={{ fontWeight: 600, display: 'block' }}>Sarah Larson</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-danger)' }}>Missed Shift - Unexcused</span>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-text-muted)' }}>0h 0m</span>
            </div>
          </div>
        </div>

        {/* AI Exception Engine */}
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertOctagon size={20} color="var(--color-danger)" /> Payroll Exception & Anomaly Queue
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {mockPayrollExceptions.map(exc => (
              <div 
                key={exc.id} 
                className="glass-card" 
                style={{ padding: '1.5rem', borderLeft: `4px solid ${exc.status === 'REQUIRES_GM_OVERRIDE' ? 'var(--color-danger)' : 'var(--color-warning)'}`, cursor: 'pointer' }}
                onClick={() => pushDrilldown({ type: 'HR_PAYROLL_EXCEPTION', id: exc.id, title: `Exception: ${exc.employee}` })}
              >
                
                {/* AI Copilot Badge directly attached to the anomaly */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(0, 240, 255, 0.1)' }}>
                  <BrainCircuit size={16} color="var(--color-accent)" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600 }}>Copilot Payroll Audit</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '1.1rem' }}>{exc.employee}</h3>
                    <p style={{ margin: 0, fontWeight: 500, color: exc.status === 'REQUIRES_GM_OVERRIDE' ? 'var(--color-danger)' : 'var(--color-warning)' }}>{exc.anomaly}</p>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{exc.reason}</p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>Reject / Request Edit</button>
                    <button style={{ padding: '0.5rem 1rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>Override & Confirm</button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
