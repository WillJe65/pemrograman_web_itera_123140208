import { useContext } from 'react';
import { BookContext } from '../context/BookContext'; // <-- Sesuaikan path ini

export const useBooks = () => {
  const context = useContext(BookContext);

  if (context === undefined) {
    throw new Error('useBooks harus digunakan di dalam BookContext');
  }

  return context;
};