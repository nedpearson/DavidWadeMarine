import { useState } from 'react';
import { Shield, Send, AlertTriangle, FileCheck, Anchor, ArrowRightLeft } from 'lucide-react';
import { useDrilldown } from '../contexts/DrilldownContext';

const mockClaims = [
  { id: 'W-9092', ro: 'RO-2850', vendor: 'Yamaha Outboards', type: 'Part Defect', part: 'YAM-69J-13440-03', amount: '$420.00', status: 'PENDING_OEM', submitted: '2 days ago' },
  { id: 'W-9081', ro: 'RO-2841', vendor: 'Boston Whaler', type: 'Hull Gelcoat', part: 'Labor Only (14 Hrs)', amount: '$1,850.00', status: 'APPROVED', submitted: '14 days ago' },
  { id: 'W-9095', ro: 'RO-2895', vendor: 'Mercury Marine', type: 'Lower Unit Case', part: 'MER-8M011', amount: '$3,200.00', status: 'DRAFT', submitted: '-' },
];

export const WarrantyClaims = () => {
  const [selectedClaim, setSelectedClaim] = useState(mockClaims[0]);
  const { pushDrilldown } = useDrilldown();

  return (
    <div className="animate-fade-in stagger-1" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '1rem' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={28} /> OEM Warranty Center
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>B2B Claims Processing, EDI Payloads, and Reconciliations</p>
        </div>
        <button style={{ padding: '0.5rem 1.5rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowRightLeft size={18} /> Sync with Manufacturers
        </button>
      </header>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Pending OEM Approval</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: '0.5rem 0 0 0', color: 'var(--color-warning)' }}>$12,450</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', borderTop: '2px solid var(--color-success)' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>MTD Approved Credits</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: '0.5rem 0 0 0', color: 'var(--color-success)' }}>$4,100</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', borderTop: '2px solid var(--color-danger)' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Rejected / Denied (MTD)</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', margin: '0.5rem 0 0 0', color: 'var(--color-danger)' }}>1 Claim</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(63, 136, 197, 0.05)' }}>
          <Anchor size={32} color="var(--color-primary)" opacity={0.5} />
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block' }}>Primary Payer</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Yamaha Outboards</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        
        {/* Left List: Claims */}
        <div className="glass-panel" style={{ width: '450px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Claims Pipeline</h2>
            <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px' }}>{mockClaims.length} Total</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {mockClaims.map(claim => (
              <div 
                key={claim.id}
                onClick={() => setSelectedClaim(claim)}
                style={{ 
                  padding: '1.25rem', 
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  background: selectedClaim?.id === claim.id ? 'rgba(255,255,255,0.02)' : 'transparent',
                  borderLeft: selectedClaim?.id === claim.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{claim.id}</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{claim.amount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{claim.vendor}</span>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '2px 8px', 
                    borderRadius: '4px',
                    background: claim.status === 'APPROVED' ? 'rgba(16, 185, 129, 0.1)' : claim.status === 'DRAFT' ? 'rgba(255,255,255,0.05)' : 'rgba(245, 158, 11, 0.1)',
                    color: claim.status === 'APPROVED' ? 'var(--color-success)' : claim.status === 'DRAFT' ? 'var(--color-text-muted)' : 'var(--color-warning)'
                  }}>
                    {claim.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane: Outbound Claim Details & API Builder */}
        <div className="glass-panel" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-display)' }}>Claim {selectedClaim.id}</h2>
                <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{selectedClaim.type}</span>
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', margin: 0 }}>Target Endpoint: {selectedClaim.vendor} B2B Portal</p>
            </div>
            <button 
              onClick={() => pushDrilldown({ type: 'RO_DETAIL', id: selectedClaim.ro, title: `${selectedClaim.ro} Breakdown` })}
              style={{ background: 'var(--color-bg-deep)', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <FileCheck size={16} /> Inspect Source RO Source
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
             <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
               <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Affected Item/Labor</span>
               <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{selectedClaim.part}</span>
             </div>
             <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
               <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Submission Trajectory</span>
               <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{selectedClaim.submitted}</span>
             </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Send size={18} /> API JSON Payload Preview</h3>
            
            <div style={{ flex: 1, background: '#050a14', borderRadius: '8px', padding: '1.5rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#a5b4fc', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.5)' }}>
{`POST /api/v2/claims/submit HTTP/1.1
Host: api.yamahaoutboards.com
Content-Type: application/json
Authorization: Bearer dWFlNjQ4...

{
  "dealerId": "DLR-99214",
  "claimReference": "${selectedClaim.id}",
  "repairOrder": "${selectedClaim.ro}",
  "defectType": "${selectedClaim.type.toUpperCase().replace(/\s/g, '_')}",
  "lineItems": [
    {
      "sku": "${selectedClaim.part}",
      "qty": 1,
      "laborHours": 2.5,
      "requestedReimbursement": ${selectedClaim.amount.replace('$', '').replace(',', '')}
    }
  ],
  "technicianNotes": "Water pressure dropped below 12 PSI at WOT. Pulled lower unit. Impeller veins cracked prematurely at 45 hours.",
  "attachments": ["img_defect_1.jpg", "ro_signature.pdf"]
}`}
            </div>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              {selectedClaim.status === 'DRAFT' ? (
                <button style={{ padding: '0.75rem 2rem', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                  <Send size={18} /> Transmit Claim to OEM
                </button>
              ) : selectedClaim.status === 'PENDING_OEM' ? (
                <button style={{ padding: '0.75rem 2rem', background: 'transparent', border: '1px dashed var(--color-warning)', color: 'var(--color-warning)', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                  <AlertTriangle size={18} /> Awaiting OEM Response...
                </button>
              ) : (
                <div style={{ padding: '0.75rem 2rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--color-success)', color: 'var(--color-success)', borderRadius: '8px', fontWeight: 600 }}>
                  Credit Successfully Reconciled
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
