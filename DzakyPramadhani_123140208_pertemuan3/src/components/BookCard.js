import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import DeleteModal from './DeleteModal';
import { 
  FaBook, 
  FaEdit, 
  FaTrash, 
  FaUserEdit,
  FaCheckCircle,
  FaBookReader,
  FaShoppingCart
} from 'react-icons/fa';
import { 
  HiBookmark, 
  HiUser, 
  HiPencil, 
  HiTrash 
} from 'react-icons/hi';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const { deleteBook } = useBooks();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/edit/${book.id}`);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteBook(book.id);
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'owned':
        return { 
          text: 'Dimiliki', 
          icon: <FaCheckCircle className="w-4 h-4" />,
          color: 'text-green-400',
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/30'
        };
      case 'reading':
        return { 
          text: 'Sedang Dibaca', 
          icon: <FaBookReader className="w-4 h-4" />,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/20',
          borderColor: 'border-yellow-500/30'
        };
      case 'wishlist':
        return { 
          text: 'Ingin Dibeli', 
          icon: <FaShoppingCart className="w-4 h-4" />,
          color: 'text-blue-400',
          bgColor: 'bg-blue-500/20',
          borderColor: 'border-blue-500/30'
        };
      default:
        return { 
          text: status, 
          icon: <FaBook className="w-4 h-4" />,
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/20',
          borderColor: 'border-gray-500/30'
        };
    }
  };

  const statusInfo = getStatusInfo(book.status);

  return (
    <>
      <div className="card group hover:shadow-xl hover:shadow-purple-500/10">
        {/* Header dengan status indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${statusInfo.bgColor} ${statusInfo.borderColor} border`}>
              {statusInfo.icon}
            </div>
            <div>
              <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color} ${statusInfo.borderColor} border`}>
                {statusInfo.icon}
                <span>{statusInfo.text}</span>
              </span>
            </div>
          </div>
          <div className="text-gray-400 group-hover:text-purple-300 transition-colors">
            <FaBook className="w-5 h-5" />
          </div>
        </div>

        {/* Book Title */}
        <h3 className="text-lg font-bold text-white line-clamp-2 mb-3 group-hover:text-purple-100 transition-colors">
          {book.title}
        </h3>
        
        {/* Author */}
        <div className="flex items-center space-x-2 mb-6">
          <HiUser className="w-4 h-4 text-gray-400" />
          <p className="text-gray-300 text-sm">
            Oleh: <span className="text-purple-300 font-medium">{book.author}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-gray-700/50">
          <button 
            onClick={handleEdit}
            className="btn btn-warning flex-1 group/edit flex items-center justify-center space-x-2"
          >
            <HiPencil className="w-4 h-4 group-hover/edit:scale-110 transition-transform" />
            <span>Edit</span>
          </button>
          <button 
            onClick={handleDeleteClick}
            className="btn btn-danger flex-1 group/delete flex items-center justify-center space-x-2"
          >
            <HiTrash className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
            <span>Hapus</span>
          </button>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        bookTitle={book.title}
      />
    </>
  );
};

export default BookCard;