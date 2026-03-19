import React, { useState } from 'react';
import { Users, Phone, Mail, MessageSquare, AlertCircle, Ship, Search, ChevronRight, Loader2 } from 'lucide-react';

const mockLeads = [
  { id: 'LD-889', name: 'John Doe', interest: 'Yamaha 150HP Repower', status: 'QUOTING', score: 85, sla: 'GREEN', owner: 'Ned Admin', lastContact: '2 hours ago' },
  { id: 'LD-890', name: 'Sarah Larson', interest: 'Service Quote: Winterization', status: 'NEW_UNTOUCHED', score: 92, sla: 'RED', owner: 'Unassigned', lastContact: 'Never' },
  { id: 'LD-891', name: 'Mitch R.', interest: 'SeaRay SPX 190', status: 'ATTEMPTED_CONTACT', score: 45, sla: 'YELLOW', owner: 'Dave Sales', lastContact: '1 day ago' },
];

const mockCustomers = [
  { id: 'CUST-112', name: 'Robert Maritime', type: 'Household', assets: ['2015 Boston Whaler', 'Yamaha F200'], ltv: '$14,500' },
  { id: 'CUST-113', name: 'Lake Services LLC', type: 'Business', assets: ['2020 Tracker', '2019 SeaRay'], ltv: '$42,100' },
];

export const CrmHub = () => {
  const [activeTab, setActiveTab] = useState<'LEADS' | 'CUSTOMERS'>('LEADS');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiDraft, setAiDraft] = useState<string | null>(null);

  const handleGenerateAI = async () => {
    setIsAiLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/ai/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          agent: 'SALES_SLA_AGENT',
          contextPayload: { customerName: 'Sarah', interest: 'Winterization & Shrinkwrap' }
        })
      });
      const data = await response.json();
      setAiDraft(data.draftPayload);
    } catch (e) {
      console.error(e);
      setAiDraft("Failed to connect to Local Copilot Hub.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="animate-fade-in stagger-1" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '1rem' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={28} /> CRM & Communications Hub
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Customer Base, Active Leads, and Omnichannel Logs</p>
        </div>
        <div className="glass-panel" style={{ display: 'flex', padding: '0.25rem', borderRadius: '8px' }}>
          <button 
            onClick={() => setActiveTab('LEADS')}
            style={{ padding: '0.5rem 1.5rem', background: activeTab === 'LEADS' ? 'var(--color-primary)' : 'transparent', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600 }}
          >
            Active Leads
          </button>
          <button 
            onClick={() => setActiveTab('CUSTOMERS')}
            style={{ padding: '0.5rem 1.5rem', background: activeTab === 'CUSTOMERS' ? 'var(--color-primary)' : 'transparent', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600 }}
          >
            Customer Master
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        
        {/* Left List Pane (Virtual Table representation) */}
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-bg-deep)', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid var(--color-border)', flex: 1, maxWidth: '300px' }}>
              <Search size={16} color="var(--color-text-muted)" />
              <input type="text" placeholder="Search Names, Phones..." style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%' }} />
            </div>
            <button style={{ background: 'transparent', color: 'var(--color-primary)', fontSize: '0.875rem' }}>+ Advanced Filters</button>
          </div>

          <div style={{ overflowY: 'auto', flex: 1 }}>
            {activeTab === 'LEADS' ? (
              mockLeads.map(lead => (
                <div key={lead.id} className="glass-card" style={{ margin: '0.5rem 1rem', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderLeft: `4px solid ${lead.sla === 'RED' ? 'var(--color-danger)' : lead.sla === 'YELLOW' ? 'var(--color-warning)' : 'var(--color-success)'}` }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 600 }}>{lead.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{lead.interest}</p>
                    <span style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.75rem', padding: '2px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', color: 'var(--color-accent)' }}>
                      Score: {lead.score} | Owner: {lead.owner}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', padding: '2px 8px', borderRadius: '4px', background: 'var(--color-primary)' }}>{lead.status.replace('_', ' ')}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}><ClockIcon /> {lead.lastContact}</span>
                  </div>
                </div>
              ))
            ) : (
              mockCustomers.map(cust => (
                <div key={cust.id} className="glass-card" style={{ margin: '0.5rem 1rem', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{cust.name} <span style={{ fontSize: '0.7rem', color: 'var(--color-primary)', border: '1px solid var(--color-primary)', padding: '1px 6px', borderRadius: '12px' }}>{cust.type}</span></h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <Ship size={14} color="var(--color-accent)" /> {cust.assets.join(' • ')}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Lifetime Value</p>
                      <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-success)', fontFamily: 'var(--font-display)' }}>{cust.ltv}</p>
                    </div>
                    <ChevronRight size={20} color="var(--color-text-muted)" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Detail Pane (Slide-out equivalent) */}
        <div className="glass-panel" style={{ width: '450px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.02)' }}>
            <h2 style={{ margin: '0 0 0.25rem 0', fontFamily: 'var(--font-display)', color: '#fff' }}>Sarah Larson</h2>
            <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Lead: Service Quote Winterization</p>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                <Phone size={16} /> Call
              </button>
              <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'transparent', border: '1px solid var(--color-primary)', color: 'var(--color-primary)', padding: '0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                <MessageSquare size={16} /> Text
              </button>
              <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', padding: '0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                <Mail size={16} /> Email
              </button>
            </div>
            
            <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderLeft: '3px solid var(--color-danger)', borderRadius: '4px', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <AlertCircle size={20} color="var(--color-danger)" />
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-danger)' }}>SLA Breach: UNTOUCHED</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Lead generated &gt; 30 minutes ago.</p>
              </div>
            </div>
          </div>

          <div style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
            <h3 style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Communication Timeline</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--color-border)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0 0 0.25rem 0' }}>Today 10:14 AM - Twilio MMS Intake</p>
                <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0 8px 8px 8px' }}>
                  <div style={{ width: '120px', height: '80px', background: 'rgba(239, 68, 68, 0.1)', border: '2px solid var(--color-danger)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    <img src="https://images.unsplash.com/photo-1544414603-f3c5aa667ea6" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt="Damaged Engine Block" />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="glow-pulse" style={{ width: '40px', height: '40px', border: '3px solid red', borderRadius: '50%' }}></div>
                    </div>
                  </div>
                  <div style={{ flex: 1, fontSize: '0.9rem' }}>
                    "Need to schedule winterization for my Yamaha. Do you guys do shrinkwrapping? Also heard a cracking noise in lower unit, sending photo."
                    <button style={{ marginTop: '0.5rem', display: 'block', background: 'transparent', color: 'var(--color-primary)', border: '1px solid var(--color-border)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>+ Append to RO Diagnostics</button>
                  </div>
                </div>
              </div>

              {/* AI Copilot Injection */}
              <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--color-accent)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-accent)', margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Auto-Agent <span style={{ padding: '2px 4px', background: 'rgba(0,240,255,0.1)', borderRadius: '2px' }}>Next Best Action</span>
                </p>
                <div style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.2)', padding: '0.75rem', borderRadius: '0 8px 8px 8px', fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                  
                  {aiDraft ? (
                    <>
                      <strong>Suggested Reply Generated:</strong><br/> "{aiDraft}"
                      <button style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>Accept & Broadcast Text</button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={handleGenerateAI}
                        disabled={isAiLoading}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-accent)', color: 'var(--color-bg-deep)', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}
                      >
                        {isAiLoading ? <Loader2 size={14} className="animate-spin" /> : <MessageSquare size={14} />}
                        Analyze Thread & Draft Response
                      </button>
                    </>
                  )}
                  
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

const ClockIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'text-bottom' }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
