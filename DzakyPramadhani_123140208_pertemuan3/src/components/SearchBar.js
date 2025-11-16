import React from 'react';
import { useBooks } from '../hooks/useBooks';
import { HiSearch } from 'react-icons/hi';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useBooks();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <HiSearch className="h-5 w-5 text-purple-400" />
        </div>
        <input
          type="text"
          placeholder="Cari buku berdasarkan judul atau penulis..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="form-input pl-10 w-full glass-effect"
        />
      </div>
    </div>
  );
};

export default SearchBar;