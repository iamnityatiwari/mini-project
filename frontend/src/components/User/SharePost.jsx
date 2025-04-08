import React, { useEffect, useRef } from 'react';
import { FaTimes, FaCircle } from 'react-icons/fa';

function SharePost({ availableUsers, onClose, onShare }) {
  return <div></div>
  const modalRef = useRef(null); // Reference to the modal container

  useEffect(() => {
    // Function to handle click outside the modal
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close the modal if clicked outside
      }
    };

    // Add event listener for clicks outside
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      {/* Larger container size and padding */}
      <div
        ref={modalRef} // Attach the reference to the modal container
        className="bg-slate-100 dark:bg-slate-950 rounded-lg p-6 w-2/5 max-w-lg shadow-md relative shadow-black dark:shadow-white"
      >
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-orange-500">Share Post With:</h2>
        
        {/* Added max-h-96 for a scrollable container */}
        <ul className="space-y-3 max-h-96 overflow-y-auto text-black dark:text-white">
          {availableUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between py-2 "
            >
              <div className="flex items-center space-x-4 overflow-hidden">
                {/* Profile Picture */}
                <img
                  src={user.profileUrl}
                  alt={`${user.name}'s profile`}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                
                {/* Status and Name Container */}
                <div className="flex items-center space-x-2">
                  {/* Status Indicator with Fixed Size */}
                  <FaCircle
                    className={`${user.isOnline ? 'text-green-500' : 'text-red-500'}`}
                    style={{ fontSize: '0.9rem' }} // Slightly larger status icon
                  />

                  {/* User Name with Truncate */}
                  <span className="text-base font-medium truncate max-w-[150px]">
                    {user.name}
                  </span>
                </div>
              </div>

              {/* Share Button */}
              <button
                onClick={() => onShare(user.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                Share
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>
      </div>
    </div>
  );
}

export default SharePost;
