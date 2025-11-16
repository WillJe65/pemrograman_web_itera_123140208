import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import BookForm from '../components/BookForm';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allBooks, updateBook } = useBooks();

  const bookToEdit = allBooks.find(book => book.id === id);

  const handleSubmit = (bookData) => {
    updateBook({ ...bookData, id });
    navigate('/');
  };

  if (!bookToEdit) {
    return (
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-glow">Edit Buku</h1>
        <div className="glass-effect rounded-2xl p-8">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-2xl font-semibold text-red-300 mb-4">Buku tidak ditemukan</h3>
          <p className="text-gray-300 mb-6">Buku yang ingin Anda edit tidak ditemukan dalam koleksi.</p>
          <button 
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white text-glow">
          Edit Buku
        </h1>
        <p className="text-xl text-purple-200">
          Perbarui detail buku "{bookToEdit.title}"
        </p>
      </div>
      <BookForm 
        onSubmit={handleSubmit} 
        initialData={bookToEdit} 
        isEditing={true} 
      />
    </div>
  );
};

export default EditBook;