import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { BookProvider } from './contexts/BookContext';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import { FaHome, FaPlus, FaBook } from 'react-icons/fa';

function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="glass-effect border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center py-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <FaBook className="text-2xl text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Manajemen Buku Pribadi
            </h1>
          </div>
          <div className="flex space-x-3">
            <NavLink 
              to="/" 
              className={`nav-link flex items-center space-x-2 ${
                isActive('/') ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              <FaHome className="w-4 h-4" />
              <span>Beranda</span>
            </NavLink>
            <NavLink 
              to="/add" 
              className={`nav-link flex items-center space-x-2 ${
                isActive('/add') ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              <FaPlus className="w-4 h-4" />
              <span>Tambah Buku</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BookProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
          </Routes>
        </main>
      </div>
    </BookProvider>
  );
}

export default App;