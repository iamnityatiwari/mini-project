// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-40 mx-2 border border-gray-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button onClick={onClose} className="relative -top-3 text-gray-400 hover:text-gray-600 z-50">✕</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
