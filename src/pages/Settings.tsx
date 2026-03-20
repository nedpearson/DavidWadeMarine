import { useState } from 'react';
import { Settings as SettingsIcon, Shield, DollarSign, Zap, Save, Building, Cpu, Lock, LayoutDashboard, ChevronUp, ChevronDown } from 'lucide-react';
import { useDrilldown } from '../contexts/DrilldownContext';
import { useWidgets } from '../contexts/WidgetContext';

// Define the shape of our massive configuration object
interface AppSettings {
  strictFlatRate: boolean;
  mandatoryQa: boolean;
  autoSms: boolean;
  crossStoreVis: boolean;
  centralPurchasing: boolean;
  globalPricingOverride: boolean;
  autoGlSweep: boolean;
  splitBilling: boolean;
  strictCredit: boolean;
  leadTimeAi: boolean;
  upsellAi: boolean;
  forensicRiskAi: boolean;
}

const defaultSettings: AppSettings = {
  strictFlatRate: true,
  mandatoryQa: true,
  autoSms: false,
  crossStoreVis: true,
  centralPurchasing: false,
  globalPricingOverride: false,
  autoGlSweep: true,
  splitBilling: true,
  strictCredit: false,
  leadTimeAi: true,
  upsellAi: true,
  forensicRiskAi: true,
};

export const Settings = () => {
  const [activeTab, setActiveTab] = useState<'RULES' | 'TENANT' | 'FINANCE' | 'AI' | 'DASHBOARD'>('RULES');
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const { pushDrilldown } = useDrilldown();
  const { widgets, toggleWidget, moveWidgetUp, moveWidgetDown } = useWidgets();

  const handleToggle = (key: keyof AppSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHasUnsavedChanges(false);
      // Pushing an audit summary into the Drilldown agent
      pushDrilldown({ type: 'AUDIT_LOG', id: 'CFG-UPDATE', title: 'Enterprise Configuration Saved' });
    }, 1200);
  };

  const Switch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <div 
      onClick={onChange}
      style={{
        width: '44px', height: '24px', 
        background: checked ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)', 
        borderRadius: '12px', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '2px', 
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{
        width: '20px', height: '20px', 
        background: '#fff', 
        borderRadius: '50%', 
        transform: checked ? 'translateX(20px)' : 'translateX(0)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }} />
    </div>
  );

  return (
    <div className="animate-fade-in stagger-1" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', paddingBottom: '1rem' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SettingsIcon size={28} /> Global Dealership Settings
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Manage Master Configurations, Multi-Tenant Rules, and Enterprise Integrations</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {hasUnsavedChanges && <span style={{ color: 'var(--color-warning)', fontSize: '0.85rem', fontWeight: 600 }}>Unsaved Changes</span>}
          <button 
            onClick={handleSave}
            disabled={isSaving || !hasUnsavedChanges}
            style={{ 
              padding: '0.75rem 1.5rem', 
              background: isSaving ? 'var(--color-bg-deep)' : (hasUnsavedChanges ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'), 
              color: hasUnsavedChanges ? '#fff' : 'var(--color-text-muted)', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: 600, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              cursor: isSaving || !hasUnsavedChanges ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {isSaving ? <span className="spinner" style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> : <Save size={18} />}
            {isSaving ? 'Syncing Nodes...' : 'Save Configuration'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flex: 1, minHeight: 0 }}>
        
        {/* Left Nav Sidebar */}
        <div className="glass-panel" style={{ width: '280px', flexShrink: 0, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Control Modules</h3>
          
          <button 
            onClick={() => setActiveTab('RULES')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', width: '100%', 
              background: activeTab === 'RULES' ? 'rgba(63, 136, 197, 0.15)' : 'transparent',
              border: activeTab === 'RULES' ? '1px solid var(--color-primary)' : '1px solid transparent',
              color: activeTab === 'RULES' ? 'var(--color-primary)' : 'var(--color-text-main)',
              borderRadius: '8px', textAlign: 'left', fontWeight: activeTab === 'RULES' ? 600 : 400,
              transition: 'all 0.2s', cursor: 'pointer'
            }}
          >
            <Shield size={20} /> Core Dealership Rules
          </button>
          
          <button 
            onClick={() => setActiveTab('TENANT')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', width: '100%', 
              background: activeTab === 'TENANT' ? 'rgba(63, 136, 197, 0.15)' : 'transparent',
              border: activeTab === 'TENANT' ? '1px solid var(--color-primary)' : '1px solid transparent',
              color: activeTab === 'TENANT' ? 'var(--color-primary)' : 'var(--color-text-main)',
              borderRadius: '8px', textAlign: 'left', fontWeight: activeTab === 'TENANT' ? 600 : 400,
              transition: 'all 0.2s', cursor: 'pointer'
            }}
          >
            <Building size={20} /> Multi-Tenant Network
          </button>

          <button 
            onClick={() => setActiveTab('FINANCE')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', width: '100%', 
              background: activeTab === 'FINANCE' ? 'rgba(63, 136, 197, 0.15)' : 'transparent',
              border: activeTab === 'FINANCE' ? '1px solid var(--color-primary)' : '1px solid transparent',
              color: activeTab === 'FINANCE' ? 'var(--color-primary)' : 'var(--color-text-main)',
              borderRadius: '8px', textAlign: 'left', fontWeight: activeTab === 'FINANCE' ? 600 : 400,
              transition: 'all 0.2s', cursor: 'pointer'
            }}
          >
            <DollarSign size={20} /> Financial Connections
          </button>

          <button 
            onClick={() => setActiveTab('AI')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', width: '100%', 
              background: activeTab === 'AI' ? 'rgba(63, 136, 197, 0.15)' : 'transparent',
              border: activeTab === 'AI' ? '1px solid var(--color-primary)' : '1px solid transparent',
              color: activeTab === 'AI' ? 'var(--color-primary)' : 'var(--color-text-main)',
              borderRadius: '8px', textAlign: 'left', fontWeight: activeTab === 'AI' ? 600 : 400,
              transition: 'all 0.2s', cursor: 'pointer'
            }}
          >
            <Zap size={20} /> AI Copilot Intelligence
          </button>

          <button 
            onClick={() => setActiveTab('DASHBOARD')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', width: '100%', 
              background: activeTab === 'DASHBOARD' ? 'rgba(63, 136, 197, 0.15)' : 'transparent',
              border: activeTab === 'DASHBOARD' ? '1px solid var(--color-primary)' : '1px solid transparent',
              color: activeTab === 'DASHBOARD' ? 'var(--color-primary)' : 'var(--color-text-main)',
              borderRadius: '8px', textAlign: 'left', fontWeight: activeTab === 'DASHBOARD' ? 600 : 400,
              transition: 'all 0.2s', cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            <LayoutDashboard size={20} /> Dashboard Preferences
          </button>

          <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,165,0,0.1)', border: '1px solid rgba(255,165,0,0.3)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--color-warning)', fontWeight: 600, marginBottom: '0.5rem' }}>
              <Lock size={16} /> Restricted Action
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>
              Changes made in this terminal apply globally across all branch databases immediately upon save.
            </p>
          </div>
        </div>

        {/* Dynamic Content Panel */}
        <div className="glass-panel" style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
          
          {activeTab === 'RULES' && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Shield color="var(--color-primary)" /> Core Dealership Rules
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>Govern shop-floor policies and procedural enforcements across the dealership network.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem 0' }}>Strict Flat-Rate Enforcement</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
                      Prevents technicians from prematurely clocking out and harvesting unearned flat-rate guarantees if their actual time punch is less than the allocated billing requirement.
                    </p>
                  </div>
                  <Switch checked={settings.strictFlatRate} onChange={() => handleToggle('strictFlatRate')} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem 0' }}>Mandatory QA Water-Testing</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
                      Blocks a Repair Order from moving to the "READY" status until a digital QA signature and photographic water-test evidence is uploaded to the tech tablet.
                    </p>
                  </div>
                  <Switch checked={settings.mandatoryQa} onChange={() => handleToggle('mandatoryQa')} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem 0' }}>Automated Customer SMS Updates</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
                      Automatically triggers Twilio SMS text messages to customers whenever their service status changes (e.g., "Waiting on Parts" or "Ready for Pickup").
                    </p>
                  </div>
                  <Switch checked={settings.autoSms} onChange={() => handleToggle('autoSms')} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'TENANT' && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Building color="var(--color-primary)" /> Multi-Tenant Network Controls
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>Configure permissions and visibilities crossing between regional location databases.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem 0' }}>Cross-Store Inventory Visibility</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
                      Allows technicians and service writers to search the centralized part database and see localized stock levels at other subsidiary marinas.
                    </p>
                  </div>
                  <Switch checked={settings.crossStoreVis} onChange={() => handleToggle('crossStoreVis')} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem 0', color: 'var(--color-warning)' }}>Centralized Warehouse Purchasing (HQ Override)</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
                      If enabled, blocks individual store managers from issuing POs. All restock flows are routed to Dallas HQ for bulk OEM discounting and distribution.
                    </p>
                  </div>
                  <Switch checked={settings.centralPurchasing} onChange={() => handleToggle('centralPurchasing')} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem 0' }}>Global Pricing Matrix Override</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
                      Enforces a synchronized Retail Base Pricing Matrix across all locations, overriding local markup algorithms based on regional demand.
                    </p>
                  </div>
                  <Switch checked={settings.globalPricingOverride} onChange={() => handleToggle('globalPricingOverride')} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'FINANCE' && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <DollarSign color="var(--color-success)" /> Financial & Accounting Linkages
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>Manage the pipelines connecting operational data to external General Ledgers (QuickBooks/Sage).</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem 0' }}>Automated EOD General Ledger Sweep</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
                      Pushes aggregated daily revenue, COGS, and payable liabilities as encrypted journal entries into the external accounting software automatically at midnight.
                    </p>
                  </div>
                  <Switch checked={settings.autoGlSweep} onChange={() => handleToggle('autoGlSweep')} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem 0' }}>Split-Billing Warranty Handoff</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
                      Enables the B2B Claim Module (Phase 2). When a repair order is flagged for warranty, the system will automatically separate the invoice payload.
                    </p>
                  </div>
                  <Switch checked={settings.splitBilling} onChange={() => handleToggle('splitBilling')} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem 0', color: 'var(--color-danger)' }}>Strict Customer Credit Limits</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
                      Blocks the issuance of a new sales or service quote if the customer's Accounts Receivable aging balance exceeds their dynamically assigned risk score limit.
                    </p>
                  </div>
                  <Switch checked={settings.strictCredit} onChange={() => handleToggle('strictCredit')} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'AI' && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Cpu color="#a855f7" /> AI Copilot Intelligence
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>Fine-tune the Machine Learning models interacting with the platform's dataset.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem 0' }}>Lead Time Intelligence Engine</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
                      Activates the ML model that analyzes supplier tracking records to artificially adjust expected ETA windows for parts, overriding the manufacturer defaults.
                    </p>
                  </div>
                  <Switch checked={settings.leadTimeAi} onChange={() => handleToggle('leadTimeAi')} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem 0' }}>Automated Service Upsell Prompts</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
                      Predicts required maintenance intervals based on seasonal weather patterns and HIN metadata, injecting upsell packages into the service writer's workflow.
                    </p>
                  </div>
                  <Switch checked={settings.upsellAi} onChange={() => handleToggle('upsellAi')} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem 0' }}>Forensic AP Risk Analysis</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
                      Scans incoming Accounts Payable vendor invoices for Duplicate/Ghost billing anomalies and flags them back to the CFO before automated disbursements occur.
                    </p>
                  </div>
                  <Switch checked={settings.forensicRiskAi} onChange={() => handleToggle('forensicRiskAi')} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'DASHBOARD' && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <LayoutDashboard color="var(--color-primary)" /> Dynamic Dashboard Builder
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>Select which active modules you want broadcasted to your home dashboard. Reorder them using the arrows.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {widgets.map((widget, index) => (
                  <div key={widget.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--color-bg-deep)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <button 
                        onClick={() => moveWidgetUp(index)}
                        disabled={index === 0}
                        style={{ background: 'transparent', border: 'none', color: index === 0 ? 'transparent' : 'var(--color-text-muted)', cursor: index === 0 ? 'default' : 'pointer' }}
                      >
                        <ChevronUp size={20} />
                      </button>
                      <button 
                        onClick={() => moveWidgetDown(index)}
                        disabled={index === widgets.length - 1}
                        style={{ background: 'transparent', border: 'none', color: index === widgets.length - 1 ? 'transparent' : 'var(--color-text-muted)', cursor: index === widgets.length - 1 ? 'default' : 'pointer' }}
                      >
                        <ChevronDown size={20} />
                      </button>
                    </div>

                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem 0' }}>{widget.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>{widget.description}</p>
                    </div>

                    <Switch 
                      checked={widget.enabled} 
                      onChange={() => {
                        toggleWidget(widget.id);
                        setHasUnsavedChanges(true);
                      }} 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
