import React, { useState } from 'react';
import { Wrench, Clock, AlertTriangle, CheckCircle, MapPin, Anchor, X } from 'lucide-react';

interface RepairOrder {
  id: string;
  boat: string;
  customer: string;
  tech: string;
  status: 'DIAGNOSING' | 'WAITING_ON_PARTS' | 'IN_PROGRESS' | 'QA_REVIEW' | 'READY';
  promisedDate: string;
  flags: ('COMEBACK_RISK' | 'OVERDUE' | 'WARRANTY')[];
}

const initialROs: RepairOrder[] = [
  { id: 'RO-4429', boat: '2022 Yamaha 252 FSH', customer: 'David O.', tech: 'Mike T.', status: 'IN_PROGRESS', promisedDate: 'Today 5:00 PM', flags: [] },
  { id: 'RO-4430', boat: '2019 SeaRay SPX 190', customer: 'Sarah L.', tech: 'Unassigned', status: 'DIAGNOSING', promisedDate: 'Tomorrow 10:00 AM', flags: ['WARRANTY'] },
  { id: 'RO-4425', boat: '2015 Boston Whaler', customer: 'Robert M.', tech: 'Alex H.', status: 'WAITING_ON_PARTS', promisedDate: 'Delayed (ETA Unknown)', flags: ['OVERDUE'] },
  { id: 'RO-4431', boat: '2024 Regal LS4', customer: 'Chris V.', tech: 'Mike T.', status: 'QA_REVIEW', promisedDate: 'Today 2:00 PM', flags: ['COMEBACK_RISK'] },
  { id: 'RO-4421', boat: '2020 Tracker Pro Team', customer: 'Tom J.', tech: 'Alex H.', status: 'READY', promisedDate: 'Ready for Pickup', flags: [] },
];

const statusColumns = [
  { key: 'DIAGNOSING', label: 'Triage / Diag', color: 'var(--color-warning)' },
  { key: 'WAITING_ON_PARTS', label: 'Waiting (Blocked)', color: 'var(--color-danger)' },
  { key: 'IN_PROGRESS', label: 'In Progress (Clocked)', color: 'var(--color-primary)' },
  { key: 'QA_REVIEW', label: 'Water-Test / Wash', color: 'var(--color-accent)' },
  { key: 'READY', label: 'Ready for Pickup', color: 'var(--color-success)' },
];

export const ServiceBoard = () => {
  const [activeROs] = useState<RepairOrder[]>(initialROs);
  const [viewMode, setViewMode] = useState<'KANBAN' | 'YARD_MAP'>('KANBAN');
  const [selectedRO, setSelectedRO] = useState<RepairOrder | null>(null);

  return (
    <div className="animate-fade-in stagger-1" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header & Controls */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Wrench size={28} /> Service Lane Command
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Active Repair Order Pipeline & Shop Floor Routing</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-panel" style={{ display: 'flex', padding: '0.25rem', borderRadius: '8px' }}>
            <button onClick={() => setViewMode('KANBAN')} style={{ padding: '0.5rem 1rem', background: viewMode === 'KANBAN' ? 'var(--color-primary)' : 'transparent', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600 }}>Kanban</button>
            <button onClick={() => setViewMode('YARD_MAP')} style={{ padding: '0.5rem 1rem', background: viewMode === 'YARD_MAP' ? 'var(--color-primary)' : 'transparent', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600 }}>Yard Map</button>
          </div>
          <button className="glass-panel" style={{ padding: '0.5rem 1.5rem', color: '#fff' }}>Assign Techs</button>
          <button style={{ padding: '0.5rem 1.5rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>+ New RO</button>
        </div>
      </div>

      {/* View Controller Container */}
      {viewMode === 'YARD_MAP' ? (
        <div className="glass-panel animate-fade-in" style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden', padding: '2rem', background: 'radial-gradient(circle at center, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)' }}>
          
          <div style={{ position: 'absolute', top: '20px', left: '20px', border: '2px dashed rgba(255,255,255,0.1)', width: '350px', height: 'auto', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ color: 'var(--color-text-muted)', margin: '0 0 1rem 0', display: 'flex', justifyContent: 'space-between' }}>Service Bays (Indoors) <span>2 Units</span></h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div onClick={() => setSelectedRO(activeROs[0])} className="glass-card" style={{ flex: 1, padding: '1rem', background: 'var(--color-primary)', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' }}>
                <Anchor size={32} color="#fff" style={{ marginBottom: '0.5rem' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>2022 Yamaha 252</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Bay 3 - IN_PROGRESS</span>
              </div>
            </div>
          </div>
          
          <div style={{ position: 'absolute', bottom: '20px', right: '20px', border: '2px dashed rgba(255,255,255,0.1)', width: '450px', height: 'auto', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ color: 'var(--color-text-muted)', margin: '0 0 1rem 0', display: 'flex', justifyContent: 'space-between' }}>Dry Stack / Fenced Yard <span>14 Units</span></h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div onClick={() => setSelectedRO(activeROs[2])} className="glass-card kanban-card-dragging" style={{ padding: '1rem', background: 'var(--color-danger)', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'grab' }}>
                <Anchor size={32} color="#fff" style={{ marginBottom: '0.5rem' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>2015 Boston Whaler</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Row B, Slot 12</span>
              </div>
              <div onClick={() => setSelectedRO(activeROs[1])} className="glass-card" style={{ padding: '1rem', background: 'var(--color-warning)', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'grab' }}>
                <Anchor size={32} color="#fff" style={{ marginBottom: '0.5rem' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>2019 SeaRay SPX</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Row A, Slot 4</span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="animate-fade-in" style={{ flex: 1, display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
        
        {statusColumns.map(column => {
          const matchingROs = activeROs.filter(ro => ro.status === column.key);
          
          return (
            <div key={column.key} className="glass-panel" style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '1rem', overflow: 'hidden' }}>
              
              <div style={{ paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: column.color, boxShadow: `0 0 8px ${column.color}` }}></div>
                  <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{column.label}</h3>
                </div>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px', color: 'var(--color-text-muted)' }}>{matchingROs.length}</span>
              </div>

              {/* Cards Container */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {matchingROs.map(ro => (
                  <div onClick={() => setSelectedRO(ro)} key={ro.id} className="glass-card animate-fade-in" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', borderLeft: `3px solid ${column.color}`, cursor: 'pointer' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{ro.id}</span>
                      <span style={{ fontSize: '0.75rem', background: ro.tech === 'Unassigned' ? 'var(--color-danger)' : 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                        {ro.tech}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-main)' }}>
                      <Anchor size={14} color="var(--color-text-muted)" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{ro.boat}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
                      <Clock size={14} />
                      <span style={{ fontSize: '0.75rem' }}>{ro.promisedDate}</span>
                    </div>

                    {ro.flags.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                        {ro.flags.map(flag => (
                          <span key={flag} style={{ 
                            fontSize: '0.65rem', 
                            padding: '2px 6px', 
                            borderRadius: '2px',
                            background: flag === 'OVERDUE' ? 'var(--color-danger)' : (flag === 'COMEBACK_RISK' ? 'var(--color-warning)' : 'var(--color-info)'),
                            color: '#fff',
                            fontWeight: 600
                          }}>
                            {flag.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    )}
                    
                  </div>
                ))}
                
                {matchingROs.length === 0 && (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', border: '1px dashed var(--color-border)', borderRadius: '8px' }}>
                    <p style={{ fontSize: '0.85rem' }}>No Active Units</p>
                  </div>
                )}
              </div>

            </div>
          );
        })}

        </div>
      )}
      
      {/* Warranty vs Retail Split-Bill Modal */}
      {selectedRO && (
        <div className="animate-fade-in" style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
          <div className="glass-panel" style={{ width: '800px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg-panel)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {selectedRO.id} <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{selectedRO.boat} - {selectedRO.customer}</span>
                </h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', background: 'var(--color-primary)', color: '#fff', padding: '2px 8px', borderRadius: '4px' }}>Tech: {selectedRO.tech}</span>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', color: 'var(--color-text-main)', padding: '2px 8px', borderRadius: '4px' }}>Status: {selectedRO.status.replace('_', ' ')}</span>
                </div>
              </div>
              <button onClick={() => setSelectedRO(null)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
              <h3 style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: 'var(--color-text-muted)', letterSpacing: '1px', marginBottom: '1rem' }}>Warranty vs. Retail Split-Billing Matrix</h3>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginBottom: '1.5rem' }}>
                <thead style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <tr>
                    <th style={{ padding: '0.75rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Code</th>
                    <th style={{ padding: '0.75rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Description (Part/Labor)</th>
                    <th style={{ padding: '0.75rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Amount</th>
                    <th style={{ padding: '0.75rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Billing Payer Split</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem 0.75rem', fontWeight: 600, fontSize: '0.9rem' }}>LBR-01</td>
                    <td style={{ padding: '1rem 0.75rem' }}>Diagnose & Replace Steering Cable (3.5 Hrs)</td>
                    <td style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>$420.00</td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)', width: 'fit-content' }}>
                        <button style={{ padding: '4px 12px', fontSize: '0.75rem', border: 'none', background: 'transparent', color: 'var(--color-text-muted)' }}>Customer</button>
                        <button style={{ padding: '4px 12px', fontSize: '0.75rem', border: 'none', background: 'var(--color-danger)', color: '#fff', fontWeight: 600 }}>OEM Warranty</button>
                      </div>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem 0.75rem', fontWeight: 600, fontSize: '0.9rem' }}>PRT-881</td>
                    <td style={{ padding: '1rem 0.75rem' }}>OEM Mercury Steering Rigging Kit</td>
                    <td style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>$512.50</td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)', width: 'fit-content' }}>
                        <button style={{ padding: '4px 12px', fontSize: '0.75rem', border: 'none', background: 'transparent', color: 'var(--color-text-muted)' }}>Customer</button>
                        <button style={{ padding: '4px 12px', fontSize: '0.75rem', border: 'none', background: 'var(--color-danger)', color: '#fff', fontWeight: 600 }}>OEM Warranty</button>
                      </div>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem 0.75rem', fontWeight: 600, fontSize: '0.9rem' }}>PRT-442</td>
                    <td style={{ padding: '1rem 0.75rem' }}>Kenwood Premium Stereo Receiver</td>
                    <td style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>$299.00</td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)', width: 'fit-content' }}>
                        <button style={{ padding: '4px 12px', fontSize: '0.75rem', border: 'none', background: 'var(--color-success)', color: '#fff', fontWeight: 600 }}>Customer</button>
                        <button style={{ padding: '4px 12px', fontSize: '0.75rem', border: 'none', background: 'transparent', color: 'var(--color-text-muted)' }}>OEM Warranty</button>
                      </div>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem 0.75rem', fontWeight: 600, fontSize: '0.9rem' }}>LBR-08</td>
                    <td style={{ padding: '1rem 0.75rem' }}>Stereo Installation & Rewiring (1.5 Hrs)</td>
                    <td style={{ padding: '1rem 0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>$180.00</td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)', width: 'fit-content' }}>
                        <button style={{ padding: '4px 12px', fontSize: '0.75rem', border: 'none', background: 'var(--color-success)', color: '#fff', fontWeight: 600 }}>Customer</button>
                        <button style={{ padding: '4px 12px', fontSize: '0.75rem', border: 'none', background: 'transparent', color: 'var(--color-text-muted)' }}>OEM Warranty</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
                <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px' }}>
                  <h4 style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--color-success)', margin: '0 0 0.5rem 0' }}>Retail Invoice Total (Customer)</h4>
                  <p style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700 }}>$479.00</p>
                </div>
                <div style={{ padding: '1.5rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px' }}>
                  <h4 style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--color-danger)', margin: '0 0 0.5rem 0' }}>Warranty Claim Total (OEM)</h4>
                  <p style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700 }}>$932.50</p>
                </div>
              </div>

            </div>
            
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button onClick={() => setSelectedRO(null)} style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: '1px solid var(--color-border)', color: '#fff', borderRadius: '4px', fontWeight: 600 }}>Save Draft</button>
              <button style={{ padding: '0.75rem 1.5rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: '4px', fontWeight: 600 }}>Commit Split & Generate OEM XML</button>
            </div>
          </div>
        </div>
      )}
    
    </div>
  );
};
