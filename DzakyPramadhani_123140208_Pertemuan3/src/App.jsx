import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  return (
    <BookProvider>
      <div className="min-h-screen bg-gray-50 font-inter">
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto max-w-6xl p-4">
            <h1 className="text-xl font-semibold text-indigo-600">Private Library</h1>
          </nav>
        </header>
        <main>
          <HomePage />
        </main>
      </div>
    </BookProvider>
  );
}

