import React, { useState } from 'react';
import { Wrench, Clock, AlertTriangle, CheckCircle, MapPin, Anchor } from 'lucide-react';

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
          <button className="glass-panel" style={{ padding: '0.5rem 1.5rem', color: '#fff' }}>Assign Techs</button>
          <button style={{ padding: '0.5rem 1.5rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>+ New RO</button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div style={{ flex: 1, display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
        
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
                  <div key={ro.id} className="glass-card animate-fade-in" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', borderLeft: `3px solid ${column.color}`, cursor: 'pointer' }}>
                    
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
    
    </div>
  );
};
