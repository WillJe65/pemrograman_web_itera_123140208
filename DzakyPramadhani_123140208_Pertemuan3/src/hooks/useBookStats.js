import { useMemo } from 'react';
import { useBooks } from '../context/BookContext'; // <-- Path Anda

export function useBookStats() {
  // Anda sudah benar mengambil allBooks di sini
  const { allBooks } = useBooks(); 

  const stats = useMemo(() => {
    // 1. Ganti `books` -> `allBooks`
    const doneCount = allBooks.filter(book => book.status === 'done').length;
    // 2. Ganti `books` -> `allBooks`
    const progressCount = allBooks.filter(book => book.status === 'progress').length;
    // 3. Ganti `books` -> `allBooks`
    const notStartedCount = allBooks.filter(book => book.status === 'not_started').length;
    
    // 4. Ganti `books` -> `allBooks`
    const totalBooks = allBooks.length;

    // Hitung persentase
    const donePercentage = totalBooks > 0 ? (doneCount / totalBooks) * 100 : 0;
    const progressPercentage = totalBooks > 0 ? (progressCount / totalBooks) * 100 : 0;
    const notStartedPercentage = totalBooks > 0 ? (notStartedCount / totalBooks) * 100 : 0;

    return {
      totalBooks,
      doneCount,
      progressCount,
      notStartedCount,
      donePercentage,
      progressPercentage,
      notStartedPercentage,
    };
  }, [allBooks]); // 5. Ganti `books` -> `allBooks` di dependency array

  return stats;
}