import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type DateRange = 'TODAY' | 'MTD' | 'QTD' | 'YTD' | 'ALL';
export type LocationId = 'ALL' | 'DALLAS_HQ' | 'MIAMI_RETAIL' | 'AUSTIN_SERVICE';
export type Department = 'ALL' | 'SALES' | 'SERVICE' | 'PARTS' | 'F_AND_I';

export interface FilterState {
  dateRange: DateRange;
  locationId: LocationId;
  department: Department;
  searchQuery: string;
}

interface FilterContextType {
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  dateRange: 'MTD',
  locationId: 'ALL',
  department: 'ALL',
  searchQuery: ''
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const setFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <FilterContext.Provider value={{ filters, setFilter, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useGlobalFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useGlobalFilter must be used within a FilterProvider');
  }
  return context;
};
