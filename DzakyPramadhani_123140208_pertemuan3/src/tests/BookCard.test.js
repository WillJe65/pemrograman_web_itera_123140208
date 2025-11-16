import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { BookProvider } from '../contexts/BookContext';

const MockBookCard = ({ book }) => {
  return (
    <BrowserRouter>
      <BookProvider>
        <BookCard book={book} />
      </BookProvider>
    </BrowserRouter>
  );
};

describe('BookCard', () => {
  const mockBook = {
    id: '1',
    title: 'Test Book',
    author: 'Test Author',
    status: 'owned'
  };

  test('renders book information correctly', () => {
    render(<MockBookCard book={mockBook} />);
    
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Oleh: Test Author')).toBeInTheDocument();
    expect(screen.getByText('Dimiliki')).toBeInTheDocument();
  });

  test('renders edit and delete buttons', () => {
    render(<MockBookCard book={mockBook} />);
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Hapus')).toBeInTheDocument();
  });
});