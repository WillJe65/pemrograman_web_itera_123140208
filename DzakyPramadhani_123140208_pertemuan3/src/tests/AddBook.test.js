import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddBook from '../pages/AddBook';
import { BookProvider } from '../contexts/BookContext';

const MockAddBook = () => {
  return (
    <BrowserRouter>
      <BookProvider>
        <AddBook />
      </BookProvider>
    </BrowserRouter>
  );
};

describe('AddBook', () => {
  test('renders add book page with form', () => {
    render(<MockAddBook />);
    
    expect(screen.getByText('Tambah Buku Baru')).toBeInTheDocument();
    expect(screen.getByLabelText(/judul buku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/penulis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });
});