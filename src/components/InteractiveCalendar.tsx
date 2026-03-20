import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useDrilldown } from '../contexts/DrilldownContext';

type ViewMode = 'MONTH' | 'WEEK' | 'DAY';

// Mock Event Data Architecture
interface CalendarEvent {
  id: string;
  title: string;
  type: 'DELIVERY' | 'SERVICE' | 'MOBILE_TECH' | 'LOGISTICS';
  startHour: number; // 0-23
  endHour: number;
  dayOffset: number; // 0 is today, -1 is yesterday
  meta: string;
}

const MOCK_EVENTS: CalendarEvent[] = [
  { id: 'DEL-150', title: 'Boston Whaler 150 Delivery', type: 'DELIVERY', startHour: 9, endHour: 10, dayOffset: 0, meta: 'John Doe' },
  { id: 'MOB-YAM', title: 'Mobile Repair: Sea Doo', type: 'MOBILE_TECH', startHour: 11, endHour: 14, dayOffset: 0, meta: 'Tech: Dave S.' },
  { id: 'SRV-9941', title: 'RO-9941 Diagnostics', type: 'SERVICE', startHour: 8, endHour: 12, dayOffset: 1, meta: 'Service Bay 4' },
  { id: 'LOG-RCV', title: 'Yamaha Freight Drop', type: 'LOGISTICS', startHour: 14, endHour: 15, dayOffset: -1, meta: 'Loading Dock A' },
  { id: 'DEL-PON', title: 'Bennington Pontoon Reveal', type: 'DELIVERY', startHour: 16, endHour: 17, dayOffset: 2, meta: 'VIP Client' },
  { id: 'SRV-8820', title: 'Lower Unit Rebuild', type: 'SERVICE', startHour: 10, endHour: 16, dayOffset: 0, meta: 'Service Bay 1' },
];

export const InteractiveCalendar = () => {
  const { pushDrilldown } = useDrilldown();
  const [view, setView] = useState<ViewMode>('DAY');
  const [dateOffset, setDateOffset] = useState<number>(0); // weeks, months, or days offset from current

  const getEventColor = (type: string) => {
    switch(type) {
      case 'DELIVERY': return 'var(--color-success)';
      case 'SERVICE': return 'var(--color-accent)';
      case 'MOBILE_TECH': return 'var(--color-warning)';
      case 'LOGISTICS': return '#8b5cf6';
      default: return 'var(--color-primary)';
    }
  };

  const shiftDate = (dir: 1 | -1) => setDateOffset(prev => prev + dir);

  // --- DAY VIEW ENGINE ---
  const renderDayView = () => {
    const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM
    
    // Filter events for the currently targeted day offset
    const activeEvents = MOCK_EVENTS.filter(e => e.dayOffset === dateOffset);

    return (
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: 'var(--color-border)', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
        {hours.map(hour => {
          const eventsInHour = activeEvents.filter(e => e.startHour <= hour && e.endHour > hour);
          return (
            <div key={hour} style={{ display: 'flex', background: 'var(--color-bg-panel)', minHeight: '60px' }}>
              <div style={{ width: '80px', padding: '0.75rem', borderRight: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
              </div>
              <div style={{ flex: 1, padding: '4px', display: 'flex', gap: '8px', position: 'relative' }}>
                {eventsInHour.map(e => (
                  <div 
                    key={e.id}
                    onClick={() => pushDrilldown({ type: 'RO_DETAIL', id: e.id, title: e.title })}
                    className="hover-scale"
                    style={{ 
                      flex: 1, 
                      background: `color-mix(in srgb, ${getEventColor(e.type)} 20%, transparent)`,
                      borderLeft: `4px solid ${getEventColor(e.type)}`,
                      borderRadius: '4px',
                      padding: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      opacity: e.startHour === hour ? 1 : 0.8 // slight fade for continuous hour blocks
                    }}
                  >
                    {e.startHour === hour && (
                      <>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{e.title}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{e.meta}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // --- WEEK VIEW ENGINE ---
  const renderWeekView = () => {
    // Generate a 7-day flex track
    const weekAxis = [0, 1, 2, 3, 4, 5, 6];
    
    return (
      <div className="animate-fade-in" style={{ display: 'flex', gap: '1px', background: 'var(--color-border)', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden', minHeight: '400px' }}>
        {weekAxis.map(i => {
          // A bit of mock math to distribute events across the week based on base offset
          const localDayOffset = dateOffset * 7 + i - 3; // Center the week
          const dayEvents = MOCK_EVENTS.filter(e => e.dayOffset === localDayOffset || (i === 3 && e.dayOffset === 0));

          return (
            <div key={i} style={{ flex: 1, background: 'var(--color-bg-panel)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--color-border)', background: i === 3 ? 'rgba(63, 136, 197, 0.1)' : 'transparent' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: i === 3 ? 'var(--color-primary)' : 'inherit' }}>
                  {((new Date().getDate() + i - 3) % 30 + 1)}
                </div>
              </div>
              <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {dayEvents.map(e => (
                   <div 
                   key={e.id}
                   onClick={() => pushDrilldown({ type: 'RO_DETAIL', id: e.id, title: e.title })}
                   style={{ 
                     background: `color-mix(in srgb, ${getEventColor(e.type)} 20%, transparent)`,
                     borderLeft: `3px solid ${getEventColor(e.type)}`,
                     borderRadius: '4px',
                     padding: '6px',
                     cursor: 'pointer',
                     fontSize: '0.75rem'
                   }}
                 >
                   <div style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.title}</div>
                   <div style={{ color: 'var(--color-text-muted)' }}>{e.startHour}:00</div>
                 </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // --- MONTH VIEW ENGINE ---
  const renderMonthView = () => {
    // 7x5 CSS Grid (35 cells)
    const cells = Array.from({ length: 35 }, (_, i) => i);
    
    return (
      <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: 'var(--color-border)', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{d}</div>
        ))}
        {cells.map(i => {
           const isToday = i === 18; // Fake "Today" position
           const hasEvents = i === 18 || i === 19 || i === 17 || i === 20;
           
           return (
             <div key={i} style={{ aspectRatio: '1', background: 'var(--color-bg-panel)', padding: '4px', display: 'flex', flexDirection: 'column' }}>
               <div style={{ textAlign: 'right', padding: '4px', fontSize: '0.85rem', fontWeight: isToday ? 700 : 400, color: isToday ? '#fff' : 'var(--color-text-muted)' }}>
                 {isToday && <span style={{ background: 'var(--color-primary)', padding: '2px 6px', borderRadius: '12px' }}>{i - 4}</span>}
                 {!isToday && <span>{i < 4 ? 27 + i : i - 4}</span>}
               </div>
               
               {hasEvents && (
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: 'auto' }}>
                   {i === 18 && MOCK_EVENTS.filter(e => e.dayOffset === 0).map((e, idx) => (
                      <div key={idx} onClick={() => pushDrilldown({ type: 'RO_DETAIL', id: e.id, title: e.title })} 
                           style={{ background: getEventColor(e.type), color: '#fff', fontSize: '0.65rem', padding: '2px 4px', borderRadius: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>
                        {e.startHour}:00 {e.title}
                      </div>
                   ))}
                   {i !== 18 && (
                     <div style={{ background: 'rgba(255,255,255,0.1)', height: '14px', borderRadius: '2px' }} />
                   )}
                 </div>
               )}
             </div>
           );
        })}
      </div>
    );
  };


  return (
    <div className="card animate-fade-in stagger-1" style={{ width: '100%', marginBottom: '1rem' }}>
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarIcon color="var(--color-primary)" /> 
          Global Operations Schedule
        </h3>

        {/* View Toggle Controller */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button onClick={() => shiftDate(-1)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '4px' }}><ChevronLeft size={18}/></button>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '70px', textAlign: 'center' }}>
              {view === 'DAY' ? (dateOffset === 0 ? 'Today' : `Offset ${dateOffset}`) : view === 'WEEK' ? 'This Week' : 'April 2026'}
            </span>
            <button onClick={() => shiftDate(1)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '4px' }}><ChevronRight size={18}/></button>
          </div>
          <div style={{ width: '1px', height: '16px', background: 'var(--color-border)' }} />
          <div style={{ display: 'flex', gap: '4px' }}>
            {['DAY', 'WEEK', 'MONTH'].map(mode => (
              <button 
                key={mode}
                onClick={() => setView(mode as ViewMode)}
                style={{
                  background: view === mode ? 'var(--color-primary)' : 'transparent',
                  color: view === mode ? '#fff' : 'var(--color-text-muted)',
                  border: 'none', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 600,
                  borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s ease'
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        {view === 'DAY' && renderDayView()}
        {view === 'WEEK' && renderWeekView()}
        {view === 'MONTH' && renderMonthView()}
      </div>
    </div>
  );
};
