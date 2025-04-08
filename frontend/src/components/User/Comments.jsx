import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaComment } from 'react-icons/fa';

const Comments = ({ comments, onClose, onAddComment, profilePicture }) => {
  const [newComment, setNewComment] = useState('');
  const commentsEndRef = useRef(null); // Reference to the end of the comments list
  const modalRef = useRef(null); // Reference to the modal container

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      onAddComment({
        text: newComment,
        profileImage: profilePicture, // Placeholder or replace with actual profile image
      });
      setNewComment('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  // Scroll to the latest comment when a new one is added
  useEffect(() => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);

  // Handle clicks outside the modal to close it
  useEffect(() => {
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div
        ref={modalRef} // Attach the reference to the modal container
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg relative transform transition-all"
      >
        <FaTimes
          className="absolute top-3 right-3 cursor-pointer text-gray-500 dark:text-gray-300 hover:text-red-500"
          onClick={onClose}
          size={20}
        />
        
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">Comments</h2>
        
        {/* Display Previous Comments */}
        <div className="space-y-0 max-h-60 overflow-y-auto mb-4 pr-2">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 "
                style={{ maxWidth: '100%' }}
              >
                <img
                  src={comment.profilePicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                />
                <div className="inline-block max-w-full text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                  {comment.text}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No comments yet.</p>
          )}
          {/* Dummy div to scroll to the end */}
          <div ref={commentsEndRef} />
        </div>
        
        {/* Add New Comment */}
        <div className="flex items-start space-x-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a comment..."
            className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            rows={1}
            style={{ lineHeight: '1.5' }}
          />
          <button
            onClick={handleCommentSubmit}
            className="text-blue-500 hover:text-blue-600 transition-all duration-150"
          >
            <FaComment size={40} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
