
import React, { useContext ,useState,useEffect} from 'react'
import Navbar from './Heading/Heading'

import CustomerData from '../Store/LoginUserDataProvider';

import MessageSection from './Messages/MessageSection';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
const Message = () => {

  const {userData,isLogin} = useContext(CustomerData);
 
  //  console.log("message::"+userData);
  //  console.log("myLogin: ", isLogin)
    
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
  
    <div className='w-full bg-slate-300 dark:bg-slate-950   '>
       <div className=''>
      <MessageSection userData={userData}/>
      </div>
   
    </div>
   
  )
}

export default Message