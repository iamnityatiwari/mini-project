/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import CoverPic from './CoverPic';
import axios from 'axios';

import NameAndBio from './NameAndBio';
import Modal from './EditModel';

function ProfileSection({userId}) {
// console.log(userId);
  const [file, setFile] = useState("");
  
  const [profile, setProfile] = useState({
    username: 'Dummy User',
    name: 'Dummy User',
    bio: 'In love with you',
    gender: 'male',
    profilePicture: 'https://via.placeholder.com/150',
    coverPicture: 'https://via.placeholder.com/600x200',
    email: 'johndoe@example.com'
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/profilePage/${userId}`, { withCredentials: true });
        // Set the fetched skills data in the state
        // console.log(response.data.coverPicture.length);
          setProfile((prevProfile) => {
            // Filter out null or undefined values from response.data
            const validData = Object.fromEntries(
              Object.entries(response.data).filter(([key, value]) => value != null)
            );
            
            return {
              ...prevProfile,
              ...validData, // Only update with non-null and non-undefined values
              profilePicture: validData.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyqC7jaYkUxXArH-BrVsMkPgT7fDVfhJC9MRYosWZ32LPIA1NDcuLRUR4&s', 
              coverPicture: validData.coverPicture || 'https://via.placeholder.com/600x200',
            };
          });
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchProfile(); // Call the function to fetch the skills
  }, [userId]);


  // handleImageChange Function
  const handleImageChange = async (e, imageType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append(imageType.toString(), file); // Change key based on backend expectation

    // Optional: Preview the image before upload
    const reader = new FileReader();
    reader.onload = () => {
        setFile((prevFile) => ({
            ...prevFile,
            [imageType]: reader.result,
        }));
    };
    reader.readAsDataURL(file);

    try {
        const response = await axios.post(
            `http://localhost:3000/user/${imageType}/${userId}`,
            formData,
            {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        );

        // console.log(response);

        // Update the profile state with the new image URL from response
        setProfile((prevProfile) => ({
            ...prevProfile,
            [imageType]: response.data.profilePicture, // Adjust key as per your response structure
        }));
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const setChangeProfileInfo = () => {
      axios.post(`http://localhost:3000/user/edit/${userId}`, profile, {withCredentials: true})
      .then(result=>{
        alert(result.data.message);
      })
      .catch(err=>console.log(err));
  }

  function capitalizeFirstLetter(str) {
    if (!str) return str; // Return an empty string or undefined if the input is falsy
    return str.charAt(0).toUpperCase() + str.slice(1);
}

  return (
    <div className="max-w-2xl w-full md:mx-auto p-6 bg-white dark:bg-black  shadow-sky-700 shadow-md  rounded-lg relative top-20  ">
      <div className="relative ">
        {/* Cover Picture */}
          <div className="w-full h-64 border-4 dark:border-gray-500 dark:bg-gray-800 rounded-lg ">
            <CoverPic 
              coverPicture={profile.coverPicture}
              
            />
          </div>


        <button
          onClick={() => setIsCoverModalOpen(true)}
          className="absolute top-2 right-2 px-2 py-1 bg-gray-700 text-white rounded-md"
        >
          Edit Cover
        </button>

        {/* Profile Picture */}
        <div className="absolute top-48 left-6 z-20">
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="relative w-28 h-28 rounded-full border-4 p-1 bg-gray-700 text-white text-sm"
        >
          <img 
            src={profile.profilePicture} 
            alt="Profile"
            className="rounded-full w-full h-full object-cover bg-center" 
          />
        </button>
        </div>




      <div className="mt-16 text-center">
        {/*  Name and Bio */}
        <NameAndBio
          name={capitalizeFirstLetter(profile.name)}
          bio={profile.bio}
        />

        <button
          onClick={() => setIsInfoModalOpen(true)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Edit Profile Info
        </button>
      </div>

      {/* Profile Content */}
      <div className="mt-6 px-10 flex justify-between items-center">
        <div className="w-1/2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-purple-500">Username:</h2>
            <p className="text-md text-gray-500 mb-4 relative left-10 dark:text-white">{profile.username}</p>

            <h2 className="text-lg font-semibold text-gray-800 dark:text-purple-500">Email:</h2>
            <p className="text-md text-gray-500 mb-4 relative left-10 dark:text-white">{profile.email}</p>
        </div>

        <div className="w-1/2 top-0">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-purple-500">Gender:</h2>
            <p className="text-md text-gray-500 mb-4 relative left-10 dark:text-white">{capitalizeFirstLetter(profile.gender)}</p>
        </div>
      </div>





      {/* Edit Cover Picture Modal */}
      <Modal isOpen={isCoverModalOpen} onClose={() => setIsCoverModalOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">Edit Cover Picture</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 'coverPicture')}
          className="mt-2"
        />
        <button
          onClick={() => setIsCoverModalOpen(false)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
        >
          Save Cover Picture
        </button>
      </Modal>




        <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
            <h3 className="text-xl font-semibold mb-4">Edit Profile Picture</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'profilePicture')}
              className="mt-2"
            />
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
            >
              Save Profile Picture
            </button>
        </Modal>


      {/* Edit Profile Picture Modal */}
      {/* <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">Edit Profile Picture</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 'profilePicture')}
          className="mt-2"
        />
        <button
      onClick={() => {
            // const formData = new FormData();
            // formData.append("file", file);
            // formData.append("fileType", file);
            // console.log(file)
            // console.log(formData);

              setIsProfileModalOpen(false)}}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
        >
          Save Profile Picture
        </button>
      </Modal> */}

      {/* Edit Profile Info Modal */}
      <Modal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">Edit Profile Information</h3>
        <div className="mb-4">  
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <input
            type="text"
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          onClick={() => {
            setChangeProfileInfo(),
            setIsInfoModalOpen(false);}}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
        >
          Save Changes
        </button>
      </Modal>
    </div>
    </div>
  );
}

export default ProfileSection;
