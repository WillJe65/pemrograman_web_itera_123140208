import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from '../components/BookForm';

describe('BookForm', () => {
  const mockOnSubmit = jest.fn();

  test('renders form fields', () => {
    render(<BookForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/judul buku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/penulis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByText('Tambah Buku')).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    render(<BookForm onSubmit={mockOnSubmit} />);
    
    fireEvent.click(screen.getByText('Tambah Buku'));

    expect(await screen.findByText('Judul buku harus diisi')).toBeInTheDocument();
    expect(await screen.findByText('Penulis harus diisi')).toBeInTheDocument();
    expect(await screen.findByText('Status harus dipilih')).toBeInTheDocument();
  });

  test('calls onSubmit with form data when valid', () => {
    render(<BookForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/judul buku/i), {
      target: { value: 'Test Book' }
    });
    fireEvent.change(screen.getByLabelText(/penulis/i), {
      target: { value: 'Test Author' }
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: 'owned' }
    });

    fireEvent.click(screen.getByText('Tambah Buku'));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Book',
      author: 'Test Author',
      status: 'owned'
    });
  });
});