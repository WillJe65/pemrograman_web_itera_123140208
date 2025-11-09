import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import ReactDOM from 'react-dom/client'; 

const BookContext = createContext(null);

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
  const [books, setBooks] = useState(() => {
    return initialBooksData;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');


  const addBook = (book) => {
    const newBook = { ...book, id: crypto.randomUUID() };
    setBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  const updateBook = (bookId, updatedBookData) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, ...updatedBookData } : book
      )
    );
  };

  const deleteBook = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

 
  const filteredBooks = useMemo(() => {
    return books
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
  }, [books, searchTerm, filterStatus]);

  const value = {
    books: filteredBooks,
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