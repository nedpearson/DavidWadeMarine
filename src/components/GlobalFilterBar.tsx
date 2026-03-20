import { Calendar, MapPin, Building, Search, X } from 'lucide-react';
import { useGlobalFilter } from '../contexts/FilterContext';
import type { DateRange, LocationId, Department } from '../contexts/FilterContext';

export const GlobalFilterBar = () => {
  const { filters, setFilter, resetFilters } = useGlobalFilter();

  const activeFilterCount = 
    (filters.dateRange !== 'MTD' ? 1 : 0) + 
    (filters.locationId !== 'ALL' ? 1 : 0) + 
    (filters.department !== 'ALL' ? 1 : 0) + 
    (filters.searchQuery !== '' ? 1 : 0);

  return (
    <div className="glass-panel" style={{ 
      margin: '0 24px 20px 24px', 
      padding: '12px 20px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '20px', 
      borderLeft: '4px solid var(--color-primary)',
      background: 'rgba(255,255,255,0.02)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 600 }}>
        <Search size={18} />
        <span>Global Context</span>
      </div>

      <div style={{ width: '1px', height: '24px', background: 'var(--color-border)' }} />

      {/* Date Range Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Calendar size={16} color="var(--color-text-muted)" />
        <select 
          value={filters.dateRange} 
          onChange={(e) => setFilter('dateRange', e.target.value as DateRange)}
          style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
        >
          <option value="TODAY">Today Only</option>
          <option value="MTD">Month-to-Date (MTD)</option>
          <option value="QTD">Quarter-to-Date (QTD)</option>
          <option value="YTD">Year-to-Date (YTD)</option>
          <option value="ALL">All Time</option>
        </select>
      </div>

      {/* Location Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <MapPin size={16} color="var(--color-text-muted)" />
        <select 
          value={filters.locationId} 
          onChange={(e) => setFilter('locationId', e.target.value as LocationId)}
          style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
        >
          <option value="ALL">All Locations</option>
          <option value="DALLAS_HQ">Dallas Supercenter</option>
          <option value="MIAMI_RETAIL">Miami Retail</option>
          <option value="AUSTIN_SERVICE">Austin Service Hub</option>
        </select>
      </div>

      {/* Department Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Building size={16} color="var(--color-text-muted)" />
        <select 
          value={filters.department} 
          onChange={(e) => setFilter('department', e.target.value as Department)}
          style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
        >
          <option value="ALL">All Departments</option>
          <option value="SALES">Sales & Finance</option>
          <option value="SERVICE">Service & Rigging</option>
          <option value="PARTS">Parts & Accessories</option>
        </select>
      </div>

      {/* Reset Action */}
      <div style={{ flex: 1 }} />
      {activeFilterCount > 0 && (
        <button 
          onClick={resetFilters}
          className="animate-fade-in hover-scale"
          style={{ 
            display: 'flex', alignItems: 'center', gap: '6px', 
            padding: '6px 12px', background: 'rgba(239, 68, 68, 0.1)', 
            color: 'var(--color-danger)', border: '1px solid rgba(239,68,68,0.3)', 
            borderRadius: '16px', fontSize: '0.8rem', fontWeight: 600 
          }}
        >
          <X size={14} /> Clear {activeFilterCount} Filters
        </button>
      )}

    </div>
  );
};
