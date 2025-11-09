import { BookProvider } from './context/BookContext'; 
import HomePage from './pages/home';         
import './App.css';

export default function App() {
  return (
    // "Bungkus" seluruh aplikasi Anda dengan Provider
    <BookProvider>
      <div className="min-h-screen bg-gray-50 font-inter">
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto max-w-6xl p-4">
            <h1 className="text-xl font-semibold text-indigo-600">Private Library</h1>
          </nav>
        </header>
        <main>
          {/* Render Halaman Utama Anda */}
          <HomePage />
        </main>
      </div>
    </BookProvider>
  );
}