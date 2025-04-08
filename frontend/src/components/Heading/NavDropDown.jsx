import React, { useState, useRef, useEffect,useContext } from 'react';
// import img from '../../assets/avengers.jpg';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import YourProfile from '../YourProfile';
import CustomerData from '../../Store/LoginUserDataProvider';


const NavDropDown = () => {
  


  const {userData,userHandler, handlerLogin, isLogin} = useContext(CustomerData);

 
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // console.log("before ");
      await axios.get("http://localhost:3000/auth/logout", { withCredentials: true });
      // console.log("after ");
      // Redirect to login page after successful logout
      handlerLogin(false);
      userHandler(null);
      navigate("/");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong")
      }
    }
  };

  const handleProfile = async() => {

    try{
      // console.log("reached profile");
      await axios.get(`http://localhost:3000/user/profile/${userData.username}`, {withCredentials: true});
      // console.log(isLogin," ",userData," ",removerData);
      navigate('/profile', { 
        state: {
          profileData: userData,
          isLogins: isLogin
        }
      });
      // return <YourProfile userData={userData} />
    }catch(err){
      if (err.response) {
        // console.log(err)
        alert(err.response.data.message);
      } else {
        alert("Something went wrong")
      }
      console.log(err.message);
    }
  }

  return (
    <div className="relative inline-block text-left top-1" ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full size-10 rounded-full shadow-sm text-sm font-medium text-gray-700 ring-white ring"
        >
          <img src={userData.profilePicture} alt="" className="size-10 rounded-full min-w-10" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-sm border dark:border-slate-800 bg-white dark:bg-black dark:text-white ring-1 ring-black ring-opacity-5 dark:shadow-white">
          <div className="divide-y dark:divide-slate-800" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">

          <button
              onClick={handleProfile}
              className="w-full rounded-t-md block px-4 py-2 text-sm text-gray-700 dark:text-purple-100 hover:bg-gray-100 dark:hover:bg-slate-800 text-left"
              role="menuitem"
            >
              Profile
            </button>  


            {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-purple-100 hover:bg-gray-100 dark:hover:bg-slate-800" role="menuitem">
              Settings
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-purple-100 hover:bg-gray-100 dark:hover:bg-slate-800" role="menuitem">
              Add Cart
            </a> */}
            <button
              onClick={handleLogout}
              className="w-full rounded-b-md block px-4 py-2 text-sm text-gray-700 dark:text-purple-100 hover:bg-gray-100 dark:hover:bg-slate-800    text-left"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropDown;
