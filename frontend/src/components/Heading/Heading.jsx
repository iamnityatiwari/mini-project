import React, { useState, useEffect,useContext } from "react";
import { FaHome, FaUserFriends, FaBriefcase, FaEnvelope, FaBell, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; // Link for client-side routing
import Search from "./Search";
import Logo from "./Logo";
import { NavIcon } from "./NavIcon";
import { MobileIcon } from "./MobileIcon";
import img from "../../assets/logo1-removebg-preview.png";
import NavDropDown from "./NavDropDown";
import CustomerData from "../../Store/LoginUserDataProvider";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { MdOutlineLogout } from "react-icons/md";


function Navbar() {

  const {userData,userHandler, handlerLogin, isLogin} = useContext(CustomerData);
  const navigate = useNavigate();
  // console.log("navBar",userData);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation(); // Get the current path
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);


  const TitleIconObject = [
    { IconTitle: "Home", Icon: FaHome, url: "/" },
    { IconTitle: "Network", Icon: FaUserFriends, url: "/networks" },
    { IconTitle: "Jobs", Icon: FaBriefcase, url: "/jobs" },
    { IconTitle: "Messaging", Icon: FaEnvelope, url: "/message" },
    // { IconTitle: "Notifications", Icon: FaBell, url: "/notifications" },
  ];

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (value) {
      fetchSearchResults(value);
    } else {
      // Clear previous search results if query is empty
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.post("http://localhost:3000/user/searchAll", {
        searchQuery: query,
      });
      setSearchResults(response.data.users || []);
      setShowDropdown(true);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setShowDropdown(false);
    }
  };

  const handleResultClick = (user) => {
    <Link to={`/u/${user.username}`}>a</Link>
    // console.log("Selected user:", user);
    setShowDropdown(false);
  }; 

  //handlelogout option copied by NabDropDown
  const handleLogout = async () => {
    try {
      // console.log("before ");
      await axios.get("http://localhost:3000/auth/logout", { withCredentials: true });
      // console.log("after ");
      // Redirect to login page after successful logout
      setIsOpen(false)
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

  return (
    <nav className="bg-slate-500 dark:bg-blue-950 border-b border-primary-color px-4 sm:px-8 py-2 shadow-md fixed w-full top-0 z-[60] text-Light-Beige">
      <div className="flex items-center justify-between">
              {/* Logo */}
              <Logo logoName={img} />

              {/* Search Bar */}
              <div className="relative w-full max-w-md mx-4">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
              <Search handleSearchChange={handleSearchChange} searchQuery={searchQuery} />
            </form>

            {showDropdown && searchResults.length > 0 && (
              <>
              <div onClick={()=>setShowDropdown(false)} className="fixed top-0 left-0 right-0 bottom-0 z-10"></div>
              <ul className="absolute left-5 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1 z-10">
                {searchResults.map((user) => (
                  <li
                    key={user._id}
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleResultClick(user)}
                  >
                    <Link to={`/u/${user.username}`} className="font-semibold text-black">{user.name}</Link>
                    {/* <span className="text-gray-600"> ({user.username})</span> */}
                  </li>
                ))}
              </ul>
              </>
            )}

            {searchQuery && searchResults.length === 0 && (
              <>
              
              <p className="absolute left-5 w-full mt-1 bg-gray-100 text-gray-600 border border-gray-300 rounded-md py-2 px-4 shadow-lg z-10">
                No results found for {searchQuery}
              </p>
              </>
            )}

      </div>


        {/* Icons with Tooltips Below for Desktop */}
        {isLogin ? (
          <div className="hidden md:flex space-x-6 items-center text-Light-Beige relative">
            {TitleIconObject.map((item) => (
              <NavIcon
                key={item.IconTitle}
                Icon={item.Icon}
                IconTitle={item.IconTitle}
                url={item.url}
                isActive={location.pathname === item.url} // Check if the current path matches
              />
            ))}
            <div className="relative">
               <NavDropDown />
            </div>
          </div>
        ) : (
          <div className="flex space-x-6 items-center text-Light-Beige relative">
            <NavIcon
              key={TitleIconObject[0].IconTitle}
              Icon={TitleIconObject[0].Icon}
              IconTitle={TitleIconObject[0].IconTitle}
              url={TitleIconObject[0].url}
              isActive={location.pathname === TitleIconObject[0].url} // Check if the current path matches
            />
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 size-10 border-none text-sm p-1 mx-1 flex justify-center items-center rounded-full text-white box-content relative cursor-pointer"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-gradient-to-r from-sky-500 to-indigo-500 size-10 border-none text-sm p-1 mx-1 flex justify-center items-center rounded-full text-white box-content relative cursor-pointer"
              >
                Signup
              </Link>
            </div>
          </div>
        )}

        {/* Hamburger Icon for Mobile */}
        {isLogin && (
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-Light-Beige focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="5 3 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 text-Light-Beige">
        
          {TitleIconObject.map((item) => (
            
            <MobileIcon
              key={item.IconTitle}
              Icon={item.Icon}
              IconTitle={item.IconTitle}
              url={item.url}
              isActive={location.pathname === item.url} // Check for active path in mobile view
              closeOn={()=>{setIsOpen(false)}}
              />
         
          ))}
       

          <MobileIcon
            key={"profile"}
            Icon={FaUserCircle}
            IconTitle={"Profile"}
            url={"/profile"}
            isActive={location.pathname === "/profile"}
            closeOn={()=>{setIsOpen(false)}}
          />
           

          {/*  */}
          
           <div className="flex items-center cursor-pointer text-sm font-serif hover:text-white p-1" onClick={handleLogout}><MdOutlineLogout className="mr-1 " size={20}/>logout</div>

           
        </div>
      )}
    </nav>
  );
}

export default Navbar;
