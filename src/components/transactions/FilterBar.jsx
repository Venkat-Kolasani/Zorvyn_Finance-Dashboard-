import React, { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { CATEGORIES } from '../../data/categories';
import { Button } from '../ui';
import './FilterBar.css';

export const FilterBar = () => {
  const filters = useFinanceStore((state) => state.filters);
  const setFilter = useFinanceStore((state) => state.setFilter);
  const resetFilters = useFinanceStore((state) => state.resetFilters);

  const [localSearch, setLocalSearch] = useState(filters.search || '');
  const searchTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

  const handleSearchChange = (value) => {
    setLocalSearch(value);

    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    searchTimerRef.current = setTimeout(() => {
      setFilter('search', value);
    }, 300);
  };

  const handleReset = () => {
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    setLocalSearch('');
    resetFilters();
  };

  const hasActiveFilters =
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.type !== 'all';

  return (
    <div className="filter-bar">
      <div className="filter-input-wrapper filter-search-wrapper">
        <Search size={16} className="filter-search-icon" />
        <input
          type="text"
          className="filter-input filter-search-input"
          placeholder="Search transactions..."
          value={localSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-selects">
        <select
          className="filter-input filter-select"
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value)}
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>

        <select
          className="filter-input filter-select"
          value={filters.type}
          onChange={(e) => setFilter('type', e.target.value)}
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={handleReset}
            className="filter-clear-btn"
          >
            Clear <X size={14} className="ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};
