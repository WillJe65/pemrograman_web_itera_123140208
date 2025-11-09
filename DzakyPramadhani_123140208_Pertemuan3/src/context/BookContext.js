import React, { createContext, useContext, useMemo, useState } from 'react'; // <-- Hapus impor yang tidak terpakai
import { useLocalStorage } from '../hooks/useLocalStorage'; // <-- 1. Impor hook Anda

const BookContext = createContext(null);

// Kita simpan ini sebagai fallback jika localStorage kosong
const initialBooksData = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'done' },
  { id: '2', title: '1984', author: 'George Orwell', status: 'progress' },
  { id: '3', title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'not_started' },
  { id: '4', title: 'Dune', author: 'Frank Herbert', status: 'progress' },
];

export const STATUSES = {
  done: 'Done Reading',
  progress: 'In Progress',
  not_started: 'Not Started',
};

export function BookProvider({ children }) {
  // 2. Ganti `useState` dengan `useLocalStorage`
  // Ini adalah "daftar master" Anda
  const [allBooks, setAllBooks] = useLocalStorage('my-book-library', initialBooksData);
  
  // State untuk filter tetap menggunakan `useState` karena tidak perlu disimpan
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');


  const addBook = (book) => {
    const newBook = { ...book, id: crypto.randomUUID() };
    // 3. Pastikan semua fungsi mengubah `setAllBooks`
    setAllBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  const updateBook = (bookId, updatedBookData) => {
    // 3. Pastikan semua fungsi mengubah `setAllBooks`
    setAllBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, ...updatedBookData } : book
      )
    );
  };

  const deleteBook = (bookId) => {
    // 3. Pastikan semua fungsi mengubah `setAllBooks`
    setAllBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  
  const filteredBooks = useMemo(() => {
    // 4. `useMemo` sekarang memfilter dari `allBooks`
    return allBooks
      .filter((book) => {
        return filterStatus === 'all' || book.status === filterStatus;
      })
      .filter((book) => {
        const term = searchTerm.toLowerCase();
        return (
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
        );
      });
  }, [allBooks, searchTerm, filterStatus]); // <-- 4. Dependency diubah ke `allBooks`

  const value = {
    // 5. Kirim `books` (yang sudah difilter) untuk `HomePage`
    books: filteredBooks,
    
    // 6. Kirim `allBooks` (master list) untuk `useBookStats`
    allBooks, 
    
    // Sisa fungsi dan state
    addBook,
    updateBook,
    deleteBook,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}