import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type WidgetId = 'ACTION_CENTER' | 'FINANCE_KPI' | 'SERVICE_KANBAN' | 'CRM_LEADS' | 'WARRANTY_CLAIMS' | 'INVENTORY_ALERTS' | 'PAYROLL_ANOMALIES' | 'ENTERPRISE_TRANSFERS' | 'DAILY_CALENDAR' | 'SERVICE_PROGRESS';

export interface WidgetConfig {
  id: WidgetId;
  name: string;
  description: string;
  enabled: boolean;
}

const defaultWidgets: WidgetConfig[] = [
  { id: 'ACTION_CENTER', name: 'Daily Action Center', description: 'Urgent required approvals and consolidated real-time fires', enabled: true },
  { id: 'DAILY_CALENDAR', name: 'Daily Operations Calendar', description: 'Immediate schedule and shift timeline for the current day', enabled: true },
  { id: 'SERVICE_PROGRESS', name: 'Service Job Tracker', description: 'Live progress bars and alerts for active repair orders', enabled: true },
  { id: 'FINANCE_KPI', name: 'Global Financial Performance', description: 'Revenue and margin profitability block', enabled: false },
  { id: 'INVENTORY_ALERTS', name: 'Supply Constraints', description: 'Low stock and backorder warnings', enabled: false },
  { id: 'CRM_LEADS', name: 'Sales Funnel Tracker', description: 'Quick view of active sales leads', enabled: false },
  { id: 'PAYROLL_ANOMALIES', name: 'HR Payroll Warnings', description: 'Clocked hours vs. flat-rate discrepancies', enabled: false },
  { id: 'SERVICE_KANBAN', name: 'Service Pipeline Sandbox', description: 'Mini Kanban view for active repair orders', enabled: false },
  { id: 'WARRANTY_CLAIMS', name: 'OEM B2B Warranty Status', description: 'Active warranty dispute funnel', enabled: false },
  { id: 'ENTERPRISE_TRANSFERS', name: 'Cross-Store Logistics', description: 'Inter-store transferring pipeline', enabled: false },
];

interface WidgetContextType {
  widgets: WidgetConfig[];
  toggleWidget: (id: WidgetId) => void;
  moveWidgetUp: (index: number) => void;
  moveWidgetDown: (index: number) => void;
  activeWidgets: WidgetConfig[];
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

export const WidgetProvider = ({ children }: { children: ReactNode }) => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(defaultWidgets);

  const toggleWidget = (id: WidgetId) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w));
  };

  const moveWidgetUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...widgets];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    setWidgets(newOrder);
  };

  const moveWidgetDown = (index: number) => {
    if (index === widgets.length - 1) return;
    const newOrder = [...widgets];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index] = temp;
    setWidgets(newOrder);
  };

  const activeWidgets = widgets.filter(w => w.enabled);

  return (
    <WidgetContext.Provider value={{ widgets, toggleWidget, moveWidgetUp, moveWidgetDown, activeWidgets }}>
      {children}
    </WidgetContext.Provider>
  );
};

export const useWidgets = () => {
  const context = useContext(WidgetContext);
  if (context === undefined) {
    throw new Error('useWidgets must be used within a WidgetProvider');
  }
  return context;
};
