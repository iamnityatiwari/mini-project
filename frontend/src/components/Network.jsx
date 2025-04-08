import React, {useEffect} from 'react'
import Navbar from './Heading/Heading'
import {useContext} from 'react';
import CustomerData from '../Store/LoginUserDataProvider';
import Connection from './Connections/Connections';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';


const Network = () => {
  const {userData,userHandler,isLogin, handlerLogin} = useContext(CustomerData);


//  console.log("network",userData);
//  console.log("my login",isLogin)
const navigate = useNavigate();
const [showPopup, setShowPopup] = useState(false);

//loading
const [loading, setLoading] = useState(true); // State to track loading
const placeholderCount = 6; // Number of placeholders 
useEffect(() => {
  // Set an interval to simulate loading
  const interval = setInterval(() => {
    setLoading(false); // Set loading to false after 3 seconds
  }, 1000); // 3 seconds (3000ms)

  // Clear the interval when the component is unmounted
  return () => clearInterval(interval);
}, []);


useEffect(() => {
 
  if (!isLogin) {
      setShowPopup(true);
      const timer = setTimeout(() => {
          navigate('/');
      }, 2000);
      return () => clearTimeout(timer);
  }
}, [isLogin, navigate]);

if(showPopup){
  return(
    <>
       <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                      <p className="text-lg font-semibold mb-4">You are not logged in</p>
                      <p className="text-gray-600">Redirecting to home page...</p>
                  </div>
         </div>
    </>
  )
}

if(!isLogin){
  return <Loading/>
}else if(loading){
  return <Loading/>
}


  return (
    <div className=' w-full bg-slate-300 dark:bg-slate-950 min-h-screen relative top-0 left-0 right-0 bottom-0 pt-20 '>
      <div className=' text-white '>
        <Connection/>
      </div>
     
    </div>
  )
}

export default Network