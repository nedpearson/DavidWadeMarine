import { useDrilldown } from '../contexts/DrilldownContext';
import { X, ChevronLeft } from 'lucide-react';
import { resolveDrilldownView } from '../utils/drilldownResolver';

export const DrilldownModal = () => {
  const { stack, isOpen, popDrilldown, closeDrilldown } = useDrilldown();

  if (!isOpen || stack.length === 0) return null;

  const currentView = stack[stack.length - 1];
  const depth = stack.length;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="animate-fade-in"
        style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={closeDrilldown}
      />
      
      {/* Panel */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '75vw',
          maxWidth: '850px',
          background: 'var(--color-bg-panel)',
          zIndex: 1000,
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="animate-fade-in"
      >
        {/* Header & Breadcrumbs */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {depth > 1 && (
              <button 
                onClick={popDrilldown}
                style={{ background: 'var(--color-primary)', border: 'none', color: '#fff', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(63, 136, 197, 0.4)' }}
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <div>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.75rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Level {depth}: {currentView.type.replace(/_/g, ' ')}</p>
              <h2 style={{ margin: 0, fontSize: '1.75rem', fontFamily: 'var(--font-display)', color: '#fff' }}>{currentView.title}</h2>
            </div>
          </div>
          <button 
            onClick={closeDrilldown}
            style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '8px' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Dynamic Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          {resolveDrilldownView(currentView)}
        </div>
        
        {/* Footer Trailing */}
        <div style={{ padding: '1rem 2rem', borderTop: '1px solid var(--color-border)', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Global Drilldown Session Active ID: {currentView.id || 'N/A'}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Depth Level: {depth} / 5</span>
        </div>
      </div>
    </>
  );
};
