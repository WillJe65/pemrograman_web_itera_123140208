import React from 'react';
import { useBooks } from '../hooks/useBooks';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import FilterButtons from '../components/FilterButtons';
import { FaBook, FaChartBar } from 'react-icons/fa';

const Home = () => {
  const { books } = useBooks();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <FaBook className="text-4xl text-purple-400" />
          <h1 className="text-5xl font-bold text-white text-glow">
            Manajemen Buku Pribadi
          </h1>
        </div>
        <p className="text-xl text-purple-200">
          Kelola dan lacak koleksi buku pribadi Anda
        </p>
      </div>
      
      {/* Search and Filter Section */}
      <div className="glass-effect rounded-2xl p-6 space-y-4">
        <SearchBar />
        <FilterButtons />
      </div>

      {/* Books Count */}
      {books.length > 0 && (
        <div className="text-center">
          <p className="text-gray-300 text-lg flex items-center justify-center space-x-2">
            <FaChartBar className="w-5 h-5 text-purple-400" />
            <span>
              Menampilkan <span className="font-bold text-purple-300">{books.length}</span> buku
            </span>
          </p>
        </div>
      )}

      {/* Books Grid */}
      {books.length === 0 ? (
        <div className="text-center py-16 glass-effect rounded-2xl">
          <FaBook className="text-8xl mb-6 opacity-50 mx-auto text-gray-400" />
          <h3 className="text-2xl font-semibold text-gray-300 mb-4">
            {books.length === 0 ? 'Tidak ada buku yang ditemukan' : 'Koleksi buku masih kosong'}
          </h3>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            {books.length === 0 
              ? 'Coba ubah pencarian atau filter Anda' 
              : 'Mulai dengan menambahkan buku pertama Anda!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;