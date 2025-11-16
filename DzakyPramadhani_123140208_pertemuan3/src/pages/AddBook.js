import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import BookForm from '../components/BookForm';

const AddBook = () => {
  const navigate = useNavigate();
  const { addBook } = useBooks();

  const handleSubmit = (bookData) => {
    addBook(bookData);
    navigate('/');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white text-glow">
          Tambah Buku Baru
        </h1>
        <p className="text-xl text-purple-200">
          Isi detail buku yang ingin ditambahkan ke koleksi Anda
        </p>
      </div>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddBook;