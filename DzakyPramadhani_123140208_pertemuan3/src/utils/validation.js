export const validateBookForm = (book) => {
  const errors = {};

  if (!book.title.trim()) {
    errors.title = 'Judul buku harus diisi';
  } else if (book.title.trim().length < 2) {
    errors.title = 'Judul buku minimal 2 karakter';
  }

  if (!book.author.trim()) {
    errors.author = 'Penulis harus diisi';
  } else if (book.author.trim().length < 2) {
    errors.author = 'Nama penulis minimal 2 karakter';
  }

  if (!book.status) {
    errors.status = 'Status harus dipilih';
  }

  return errors;
};