// 👇 TAMBAHKAN IMPORT ANDA DI SINI
import { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';  // <-- Sesuaikan path ini
import { STATUSES } from '../context/BookContext'; // <-- Sesuaikan path ini

function BookForm({ bookToEdit, onDone }) {
  const { addBook, updateBook } = useBooks();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('not_started');

  // Mengisi form saat mode 'edit' atau mengosongkan saat mode 'add'
  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setStatus(bookToEdit.status);
    } else {
      // Reset untuk mode 'add'
      setTitle('');
      setAuthor('');
      setStatus('not_started');
    }
  }, [bookToEdit]); // <-- Dependency yang benar

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) {
      console.error('Please fill in both title and author.');
      return;
    }

    const bookData = { title, author, status };

    if (bookToEdit) {
      // Mode Edit
      updateBook(bookToEdit.id, bookData);
    } else {
      // Mode Tambah
      addBook(bookData);
    }
    
    onDone(); // Menutup modal setelah submit
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="The Great Gatsby"
          disabled={!!bookToEdit} // Opsional: nonaktifkan jika mengedit
        />
      </div>
      <div>
        <label htmlFor="author" className="mb-1 block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="F. Scott Fitzgerald"
          disabled={!!bookToEdit} // Opsional: nonaktifkan jika mengedit
        />
      </div>
      <div>
        <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {Object.entries(STATUSES).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={onDone}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          {bookToEdit ? 'Save Changes' : 'Add Book'}
        </button>
      </div>
    </form>
  );
}

export default BookForm; // <-- Jangan lupa export