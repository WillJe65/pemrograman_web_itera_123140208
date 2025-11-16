import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { BookProvider } from '../contexts/BookContext';

const MockSearchBar = () => {
  return (
    <BookProvider>
      <SearchBar />
    </BookProvider>
  );
};

describe('SearchBar', () => {
  test('renders search input', () => {
    render(<MockSearchBar />);
    
    expect(screen.getByPlaceholderText(/cari buku/i)).toBeInTheDocument();
  });

  test('updates search query on input change', () => {
    render(<MockSearchBar />);
    
    const searchInput = screen.getByPlaceholderText(/cari buku/i);
    fireEvent.change(searchInput, { target: { value: 'test query' } });

    expect(searchInput.value).toBe('test query');
  });
});