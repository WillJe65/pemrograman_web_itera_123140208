import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { BookProvider } from '../contexts/BookContext';

const MockHome = () => {
  return (
    <BrowserRouter>
      <BookProvider>
        <Home />
      </BookProvider>
    </BrowserRouter>
  );
};

describe('Home', () => {
  test('renders home page with title', () => {
    render(<MockHome />);
    
    expect(screen.getByText('Koleksi Buku Saya')).toBeInTheDocument();
  });

  test('renders search and filter components', () => {
    render(<MockHome />);
    
    expect(screen.getByPlaceholderText(/cari buku/i)).toBeInTheDocument();
    expect(screen.getByText('Semua')).toBeInTheDocument();
    expect(screen.getByText('Dimiliki')).toBeInTheDocument();
    expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument();
    expect(screen.getByText('Ingin Dibeli')).toBeInTheDocument();
  });
});