import React from 'react';
import { FaExclamationTriangle, FaTimes, FaCheck } from 'react-icons/fa';

const DeleteModal = ({ isOpen, onClose, onConfirm, bookTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative glass-effect rounded-2xl p-8 max-w-md w-full mx-auto transform animate-scale-in">
        {/* Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">
            Hapus Buku?
          </h3>
          
          <p className="text-gray-300 text-lg">
            Apakah Anda yakin ingin menghapus 
            <span className="font-semibold text-purple-300 block mt-1">
              "{bookTitle}"
            </span>
            dari koleksi Anda?
          </p>

          <p className="text-yellow-400 text-sm flex items-center justify-center space-x-1">
            <FaExclamationTriangle className="w-3 h-3" />
            <span>Tindakan ini tidak dapat dibatalkan</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 mt-8">
          <button
            onClick={onClose}
            className="btn btn-secondary flex-1 flex items-center justify-center space-x-2"
          >
            <FaTimes className="w-4 h-4" />
            <span>Batal</span>
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger flex-1 flex items-center justify-center space-x-2 transform hover:scale-105"
          >
            <FaCheck className="w-4 h-4" />
            <span>Ya, Hapus</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;