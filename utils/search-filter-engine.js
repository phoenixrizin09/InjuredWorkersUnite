/**
 * SEARCH & FILTER UTILITIES
 * Universal search and filter functions for all pages
 */

export class SearchEngine {
  constructor() {
    this.index = new Map();
  }

  // Build search index from data
  buildIndex(items, searchableFields) {
    items.forEach((item, idx) => {
      const searchText = searchableFields
        .map(field => {
          const value = this.getNestedValue(item, field);
          return typeof value === 'string' ? value.toLowerCase() : '';
        })
        .join(' ');
      
      this.index.set(idx, {
        item,
        searchText
      });
    });
  }

  // Get nested object value (e.g., 'target_entity.name')
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  // Search with scoring
  search(query, options = {}) {
    const {
      fuzzy = true,
      caseSensitive = false,
      minScore = 0.3
    } = options;

    const searchTerm = caseSensitive ? query : query.toLowerCase();
    const words = searchTerm.split(' ').filter(w => w.length > 0);
    const results = [];

    this.index.forEach((data, idx) => {
      let score = 0;
      const { item, searchText } = data;

      // Exact match bonus
      if (searchText.includes(searchTerm)) {
        score += 1.0;
      }

      // Word matching
      words.forEach(word => {
        if (searchText.includes(word)) {
          score += 0.5;
        }
        
        // Fuzzy matching (simple)
        if (fuzzy) {
          const fuzzyMatches = searchText.match(new RegExp(word.split('').join('.*'), 'i'));
          if (fuzzyMatches) {
            score += 0.2;
          }
        }
      });

      if (score >= minScore) {
        results.push({
          item,
          score
        });
      }
    });

    // Sort by score descending
    return results.sort((a, b) => b.score - a.score).map(r => r.item);
  }
}

/**
 * FILTER ENGINE
 * Multi-criteria filtering
 */
export class FilterEngine {
  static applyFilters(items, filters) {
    return items.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        // Skip if filter is not active
        if (value === null || value === undefined || value === '') return true;
        if (Array.isArray(value) && value.length === 0) return true;
        if (typeof value === 'object' && !Array.isArray(value)) {
          // Nested filters
          return this.applyFilters([item], value).length > 0;
        }

        const itemValue = this.getNestedValue(item, key);

        // Array filter (any match)
        if (Array.isArray(value)) {
          if (Array.isArray(itemValue)) {
            return value.some(v => itemValue.includes(v));
          }
          return value.includes(itemValue);
        }

        // Boolean filter
        if (typeof value === 'boolean') {
          return itemValue === value;
        }

        // String filter (case-insensitive contains)
        if (typeof value === 'string') {
          const itemStr = String(itemValue).toLowerCase();
          return itemStr.includes(value.toLowerCase());
        }

        // Number range filter
        if (typeof value === 'object' && ('min' in value || 'max' in value)) {
          const num = Number(itemValue);
          if ('min' in value && num < value.min) return false;
          if ('max' in value && num > value.max) return false;
          return true;
        }

        // Date range filter
        if (value instanceof Date) {
          const itemDate = new Date(itemValue);
          return itemDate >= value;
        }

        // Default: exact match
        return itemValue === value;
      });
    });
  }

  static getNestedValue(obj, path) {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }
}

/**
 * SORT ENGINE
 * Multi-criteria sorting
 */
export class SortEngine {
  static sort(items, sortBy, direction = 'asc') {
    return [...items].sort((a, b) => {
      const aVal = this.getNestedValue(a, sortBy);
      const bVal = this.getNestedValue(b, sortBy);

      // Handle null/undefined
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return direction === 'asc' ? 1 : -1;
      if (bVal == null) return direction === 'asc' ? -1 : 1;

      // Number comparison
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      // Date comparison
      if (aVal instanceof Date && bVal instanceof Date) {
        return direction === 'asc' 
          ? aVal.getTime() - bVal.getTime()
          : bVal.getTime() - aVal.getTime();
      }

      // String comparison
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      
      if (direction === 'asc') {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });
  }

  static getNestedValue(obj, path) {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }
}

/**
 * PAGINATION ENGINE
 */
export class PaginationEngine {
  static paginate(items, page = 1, pageSize = 20) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    
    return {
      items: items.slice(start, end),
      page,
      pageSize,
      totalItems: items.length,
      totalPages: Math.ceil(items.length / pageSize),
      hasNext: end < items.length,
      hasPrev: page > 1
    };
  }
}

/**
 * UNIFIED SEARCH & FILTER HOOK
 * For use in React components
 */
export function useSearchAndFilter(initialData, searchFields) {
  if (typeof window === 'undefined') {
    return {
      data: initialData,
      search: () => {},
      filter: () => {},
      sort: () => {},
      reset: () => {}
    };
  }

  const [data, setData] = React.useState(initialData);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filters, setFilters] = React.useState({});
  const [sortBy, setSortBy] = React.useState(null);
  const [sortDirection, setSortDirection] = React.useState('asc');
  
  const searchEngine = React.useRef(new SearchEngine());

  // Rebuild index when data changes
  React.useEffect(() => {
    searchEngine.current.buildIndex(initialData, searchFields);
    applyAll();
  }, [initialData]);

  const applyAll = () => {
    let result = [...initialData];

    // Apply search
    if (searchQuery) {
      result = searchEngine.current.search(searchQuery);
    }

    // Apply filters
    if (Object.keys(filters).length > 0) {
      result = FilterEngine.applyFilters(result, filters);
    }

    // Apply sort
    if (sortBy) {
      result = SortEngine.sort(result, sortBy, sortDirection);
    }

    setData(result);
  };

  const search = (query) => {
    setSearchQuery(query);
    React.useEffect(() => {
      applyAll();
    }, [query]);
  };

  const filter = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    React.useEffect(() => {
      applyAll();
    }, [newFilters]);
  };

  const sort = (field, direction = 'asc') => {
    setSortBy(field);
    setSortDirection(direction);
    React.useEffect(() => {
      applyAll();
    }, [field, direction]);
  };

  const reset = () => {
    setSearchQuery('');
    setFilters({});
    setSortBy(null);
    setSortDirection('asc');
    setData(initialData);
  };

  return {
    data,
    search,
    filter,
    sort,
    reset,
    searchQuery,
    filters,
    sortBy,
    sortDirection
  };
}

export default {
  SearchEngine,
  FilterEngine,
  SortEngine,
  PaginationEngine,
  useSearchAndFilter
};
