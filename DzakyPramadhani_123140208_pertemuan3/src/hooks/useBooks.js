import { useEffect } from 'react';
import { useBookContext } from '../contexts/BookContext';
import { useLocalStorage } from './useLocalStorage';

export const useBooks = () => {
  const { state, dispatch } = useBookContext();
  const [localBooks, setLocalBooks] = useLocalStorage('books', []);

  useEffect(() => {
    dispatch({ type: 'SET_BOOKS', payload: localBooks });
  }, [dispatch, localBooks]);

  const addBook = (book) => {
    const newBook = {
      ...book,
      id: Date.now().toString()
    };
    const updatedBooks = [...localBooks, newBook];
    setLocalBooks(updatedBooks);
    dispatch({ type: 'ADD_BOOK', payload: newBook });
  };

  const updateBook = (updatedBook) => {
    const updatedBooks = localBooks.map(book =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setLocalBooks(updatedBooks);
    dispatch({ type: 'UPDATE_BOOK', payload: updatedBook });
  };

  const deleteBook = (bookId) => {
    const updatedBooks = localBooks.filter(book => book.id !== bookId);
    setLocalBooks(updatedBooks);
    dispatch({ type: 'DELETE_BOOK', payload: bookId });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const filteredBooks = state.books.filter(book => {
    const matchesFilter = state.filter === 'all' || book.status === state.filter;
    const matchesSearch = book.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return {
    books: filteredBooks,
    allBooks: state.books,
    filter: state.filter,
    searchQuery: state.searchQuery,
    addBook,
    updateBook,
    deleteBook,
    setFilter,
    setSearchQuery
  };
};