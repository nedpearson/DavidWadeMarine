import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  CreditCard, 
  FileSignature, 
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

export const CustomerPortal = () => {
  const { customerId } = useParams();
  const [signature, setSignature] = useState(false);

  // Mock data for the external view
  const boatContext = {
    model: '2023 Yamaha 255XD',
    hin: 'YAM123456789',
    roNumber: 'RO-9941',
    advisor: 'Dave S.',
    totalEstimate: 1245.50
  };

  const currentStep = 2; // 0: Received, 1: Triaged, 2: Wrenching, 3: QA, 4: Ready
  const steps = [
    { title: 'Vessel Received', icon: Building2 },
    { title: 'Diagnostics & Triage', icon: Clock },
    { title: 'Active Repair', icon: Wrench },
    { title: 'Quality Assurance', icon: ShieldCheck },
    { title: 'Ready for Pickup', icon: CheckCircle2 }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: '#fff', fontFamily: 'var(--font-sans)' }}>
      {/* Portal Header */}
      <header style={{ 
        padding: '1.5rem 2rem', 
        background: 'rgba(25, 25, 25, 0.8)', 
        backdropFilter: 'blur(12px)', 
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Building2 color="var(--color-primary)" size={32} />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>David Wade</h1>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>Marine Service Portal</span>
          </div>
        </div>
        <button className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', color: '#fff' }}>
          <PhoneCall size={16} /> Contact Advisor
        </button>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Welcome Block */}
        <div className="animate-fade-in stagger-1" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Repair Sequence: {boatContext.roNumber}</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>{boatContext.model} (HIN: {boatContext.hin}) • ID: {customerId}</p>
        </div>

        {/* Live Tracking Progress Pipeline */}
        <div className="glass-card animate-fade-in stagger-2" style={{ padding: '2.5rem', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          {/* Connecting Line */}
          <div style={{ position: 'absolute', top: '50px', left: '10%', right: '10%', height: '4px', background: 'rgba(255,255,255,0.1)', zIndex: 0 }} />
          <div style={{ position: 'absolute', top: '50px', left: '10%', width: `${(currentStep / (steps.length - 1)) * 80}%`, height: '4px', background: 'var(--color-primary)', transition: 'width 1s ease', zIndex: 0 }} />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx < currentStep;
            const isActive = idx === currentStep;

            return (
              <div key={idx} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '120px' }}>
                <div style={{ 
                  width: '48px', height: '48px', borderRadius: '50%', 
                  background: isCompleted ? 'var(--color-success)' : isActive ? 'var(--color-primary)' : 'var(--color-bg)',
                  border: isActive ? '4px solid rgba(63, 136, 197, 0.3)' : `2px solid ${isCompleted ? 'var(--color-success)' : 'rgba(255,255,255,0.2)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isCompleted || isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                  boxShadow: isActive ? '0 0 20px rgba(63, 136, 197, 0.4)' : 'none',
                  transition: 'all 0.3s ease'
                }}>
                  <Icon size={20} />
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: isActive ? 600 : 400, color: isActive ? '#fff' : 'var(--color-text-muted)' }}>
                  {step.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Required: Approvals & Invoices */}
        <div className="animate-fade-in stagger-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', color: 'var(--color-danger)' }}>
                <AlertCircleIcon />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Authorization Required</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>
              During triage, we discovered a failing water pump impeller. We require your digital authorization to proceed with the $340.00 replacement.
            </p>
            {signature ? (
              <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 600 }}>
                <CheckCircle2 size={18} /> Authorized
              </div>
            ) : (
              <button onClick={() => setSignature(true)} className="hover-scale" style={{ padding: '1rem', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <FileSignature size={18} /> Digitally Approve Quote
              </button>
            )}
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: 'var(--color-success)' }}>
                <CreditCard size={20} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Active Invoice Balance</h3>
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>
              $1,245<span style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>.50</span>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', flex: 1 }}>
              This balance reflects the original winterization package plus the approved impeller addition.
            </p>
            <button className="hover-scale" style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <CreditCard size={18} /> Pay securely via Stripe
            </button>
          </div>

        </div>

      </main>
    </div>
  );
};

const AlertCircleIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
