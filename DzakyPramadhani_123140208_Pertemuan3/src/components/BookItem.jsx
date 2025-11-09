// 👇 TAMBAHKAN IMPORT ANDA DI SINI
import { useBooks } from '../context/BookContext'; // <-- Sesuaikan path ini
import { STATUSES } from '../context/BookContext'; // <-- Sesuaikan path ini

function BookItem({ book, onEdit }) {
  const { deleteBook } = useBooks();

  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'not_started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100';
    }
  };
  
  const handleDelete = () => {
      deleteBook(book.id);
  }

  return (
    <li className="flex flex-col rounded-lg bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        <span
          className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(book.status)}`}
        >
          {STATUSES[book.status]} {/* <-- STATUSES digunakan di sini */}
        </span>
      </div>
      <div className="mt-4 flex justify-end gap-2 border-t pt-4">
        <button
          onClick={onEdit}
          className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default BookItem; // <-- Pastikan Anda juga mengekspor komponennya