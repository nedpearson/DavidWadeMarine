import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface DrilldownView {
  type: string;
  id?: string;
  title: string;
  contextData?: any;
}

interface DrilldownContextType {
  stack: DrilldownView[];
  isOpen: boolean;
  pushDrilldown: (view: DrilldownView) => void;
  popDrilldown: () => void;
  closeDrilldown: () => void;
}

const DrilldownContext = createContext<DrilldownContextType | undefined>(undefined);

export const DrilldownProvider = ({ children }: { children: ReactNode }) => {
  const [stack, setStack] = useState<DrilldownView[]>([]);
  
  const pushDrilldown = (view: DrilldownView) => {
    setStack(prev => [...prev, view]);
  };

  const popDrilldown = () => {
    setStack(prev => prev.slice(0, -1));
  };

  const closeDrilldown = () => {
    setStack([]);
  };

  return (
    <DrilldownContext.Provider value={{
      stack,
      isOpen: stack.length > 0,
      pushDrilldown,
      popDrilldown,
      closeDrilldown
    }}>
      {children}
    </DrilldownContext.Provider>
  );
};

export const useDrilldown = () => {
  const context = useContext(DrilldownContext);
  if (context === undefined) {
    throw new Error('useDrilldown must be used within a DrilldownProvider');
  }
  return context;
};
