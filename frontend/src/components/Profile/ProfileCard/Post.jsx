import React, { useState } from 'react';
import axios from 'axios';

const Post = ({setShowSendPost}) => {
  const [text, setText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);


  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedFiles(files);
    setPreviewUrls(fileUrls);
    setShowSendPost(true); // Show modal when files are selected
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    // Create FormData to send files and text content
    const formData = new FormData();
    
    // Append text content
    formData.append('description', text);
  
    // Append each selected file to FormData
    selectedFiles.forEach((file) => {
      formData.append('images', file); // 'images' can be the field name for files in the backend
    });
    // console.log(formData);
    try {
      // Make the POST request to backend endpoint to create a new post
      const response = await axios.post('http://localhost:3000/post/createPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for sending files
        },
        withCredentials: true, // Include cookies if needed for session handling
      });
  
      // console.log('Post created successfully:', response.data);
  
      // Clear the form after successful submission
      setText('');
      setSelectedFiles([]);
      setPreviewUrls([]);
      setShowSendPost(false); // Close SendPost modal after submission
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    
      
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg relative overflow-y-auto">
            <button onClick={() => setShowSendPost(false)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
              &times;
            </button>
            
            <h2 className="text-2xl font-semibold text-center mb-4">Create Post</h2>

            {/* Text Input */}
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Write something..."
              className="w-full p-3 mb-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
            ></textarea>

            {/* File Upload */}
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1">Add Images or Video</label>
              <input
                type="file"
                accept="image/*, video/*"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Preview Section */}
            {previewUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="w-24 h-24 relative">
                    <img src={url} alt={`preview ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                  </div>
                ))}
              </div>
            )}

            {/* Post Button */}
            <div className="text-center mt-4">
              <button onClick={handleSubmit} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
                Post
              </button>
            </div>
          </div>
        </div>
      
    
  );
};

export default Post;
