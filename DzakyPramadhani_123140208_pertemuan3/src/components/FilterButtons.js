import React from 'react';
import { useBooks } from '../hooks/useBooks';
import { 
  FaBook, 
  FaCheck, 
  FaBookOpen, 
  FaShoppingCart 
} from 'react-icons/fa';

const FilterButtons = () => {
  const { filter, setFilter } = useBooks();

  const filters = [
    { 
      key: 'all', 
      label: 'Semua', 
      icon: <FaBook className="w-4 h-4" />
    },
    { 
      key: 'owned', 
      label: 'Dimiliki', 
      icon: <FaCheck className="w-4 h-4" />
    },
    { 
      key: 'reading', 
      label: 'Sedang Dibaca', 
      icon: <FaBookOpen className="w-4 h-4" />
    },
    { 
      key: 'wishlist', 
      label: 'Ingin Dibeli', 
      icon: <FaShoppingCart className="w-4 h-4" />
    }
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-4">
      {filters.map(({ key, label, icon }) => (
        <button
          key={key}
          className={`filter-btn flex items-center space-x-2 ${
            filter === key ? 'filter-btn-active' : 'filter-btn-inactive'
          }`}
          onClick={() => setFilter(key)}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;