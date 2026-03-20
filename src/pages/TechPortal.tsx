import { useState } from 'react';
import { Camera, CheckCircle2, Clock, Wrench, Navigation, ShieldAlert, Waves, ArrowRight } from 'lucide-react';
import { useDrilldown } from '../contexts/DrilldownContext';

const mockAssignedROs = [
  { id: 'RO-2900', boat: '2022 Yamaha 252SD', task: '50-Hour Service & Lake Test', status: 'IN_PROGRESS', location: 'Slip 4', estimatedHrs: 2.5 },
  { id: 'RO-2914', boat: '2019 Sea Ray SLX 250', task: 'Impeller Replacement', status: 'READY_TO_START', location: 'Bay 2', estimatedHrs: 1.0 },
];

export const TechPortal = () => {
  const [activeRO, setActiveRO] = useState<string | null>('RO-2900');
  const [clockedIn, setClockedIn] = useState(true);
  const { pushDrilldown } = useDrilldown();

  // Water Test Checklist State
  const [checklist, setChecklist] = useState({
    engineTemp: false,
    waterPressure: false,
    shifting: false,
    steering: false,
    noLeaks: false,
  });

  const allChecked = Object.values(checklist).every(Boolean);

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="animate-fade-in" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '1rem' }}>
      
      {/* Mobile-Optimized Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-panel)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
            <Wrench size={24} color="var(--color-primary)" /> Tech Portal (iPad View)
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Welcome back, Mike T.</p>
        </div>
        
        <button 
          onClick={() => setClockedIn(!clockedIn)}
          style={{ 
            padding: '1rem 2rem', 
            borderRadius: '50px', 
            border: 'none', 
            background: clockedIn ? 'var(--color-danger)' : 'var(--color-success)', 
            color: '#fff', 
            fontWeight: 700,
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}
        >
          <Clock size={20} /> {clockedIn ? 'Punch OUT' : 'Punch IN (Flat Rate)'}
        </button>
      </header>

      <div style={{ display: 'flex', gap: '1rem', flex: 1, minHeight: 0 }}>
        
        {/* Left Side: Assigned Dispatch List */}
        <div className="glass-panel" style={{ width: '350px', display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '1rem' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>My Queue (Today)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {mockAssignedROs.map((ro) => (
              <div 
                key={ro.id} 
                onClick={() => setActiveRO(ro.id)}
                style={{ 
                  padding: '1.25rem', 
                  background: activeRO === ro.id ? 'rgba(63, 136, 197, 0.15)' : 'rgba(255,255,255,0.02)', 
                  border: `1px solid ${activeRO === ro.id ? 'var(--color-primary)' : 'var(--color-border)'}`, 
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem', color: activeRO === ro.id ? '#fff' : 'var(--color-text-main)' }}>{ro.id}</span>
                  <span style={{ fontSize: '0.8rem', padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: 'var(--color-text-muted)' }}>{ro.estimatedHrs} Hrs</span>
                </div>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>{ro.boat}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Navigation size={14} /> {ro.location}</span>
                  <span style={{ fontSize: '0.75rem', color: ro.status === 'IN_PROGRESS' ? 'var(--color-primary)' : 'var(--color-warning)' }}>{ro.status.replace(/_/g, ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Active Workspace & Checklist Container */}
        <div className="glass-panel" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {activeRO ? (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                  <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-display)' }}>RO-2900: 50-Hour Service</h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', margin: 0 }}>2022 Yamaha 252SD (Twin 1.8L HO)</p>
                </div>
                <button 
                  onClick={() => pushDrilldown({ type: 'RO_DETAIL', id: 'RO-2900', title: 'RO-2900 Diagnostics' })}
                  style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  View Full RO <ArrowRight size={18} />
                </button>
              </div>

              {/* Touch-Oriented Water Test Checklist */}
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Waves color="var(--color-primary)" /> QA Water-Testing Protocol
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  
                  {Object.entries({
                    engineTemp: 'Engine Temps within Spec (140-160°F)',
                    waterPressure: 'Tell-Tale flow strong (PSI > 12)',
                    shifting: 'Forward/Reverse transitions smooth',
                    steering: 'Helm / Jet articulation tested',
                    noLeaks: 'Bilge dry / No fluid leaks'
                  }).map(([key, label]) => {
                    const typedKey = key as keyof typeof checklist;
                    const isChecked = checklist[typedKey];
                    return (
                      <div 
                        key={key}
                        onClick={() => toggleCheck(typedKey)}
                        style={{ 
                          padding: '1.5rem', 
                          background: isChecked ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)', 
                          border: `2px solid ${isChecked ? 'var(--color-success)' : 'var(--color-border)'}`,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isChecked ? 'var(--color-success)' : 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          {isChecked && <CheckCircle2 size={20} color="#fff" />}
                        </div>
                        <span style={{ fontSize: '1.1rem', fontWeight: isChecked ? 600 : 400, color: isChecked ? '#fff' : 'var(--color-text-muted)' }}>{label}</span>
                      </div>
                    )
                  })}

                </div>

                {/* Media Upload & Flags */}
                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
                  <button style={{ flex: 1, padding: '1.25rem', background: 'var(--color-bg-panel)', border: '1px dashed var(--color-border)', borderRadius: '12px', color: 'var(--color-text-main)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}>
                    <Camera size={24} /> Add QA Photo / Damage Evidence
                  </button>
                  <button style={{ flex: 1, padding: '1.25rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--color-danger)', borderRadius: '12px', color: 'var(--color-danger)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}>
                    <ShieldAlert size={24} /> Flag for Warranty / Defect
                  </button>
                </div>
                
                {allChecked && (
                  <button className="animate-fade-in" style={{ width: '100%', marginTop: '1rem', padding: '1.5rem', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.25rem', fontWeight: 700, boxShadow: '0 8px 30px rgba(63, 136, 197, 0.4)' }}>
                    Complete Phase & Submit QA
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--color-text-muted)' }}>
              Select a Repair Order from your queue.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
