import './App.css';
import { Outlet } from 'react-router-dom';
import CustomerData from './Store/LoginUserDataProvider';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from './components/Heading/Heading';
import { DarkandLightTheme } from './DarkandLightTheme';
import ConnectionLocal from './Store/ConnectionProvide';
function App() {
    const { userData, userHandler, isLogin, handlerLogin } = useContext(CustomerData);

    const [loading, setLoading] = useState(true); // Loading state
    
  const {setconnectionList,setRequestList,setSendList, connectionList, setSuggestions} = useContext(ConnectionLocal);

    useEffect(() => {
        // Fetch the login status and user data from the backend
        axios.get('http://localhost:3000/auth/isLogin', { withCredentials: true })
            .then(response => {
                // console.log(response);
                const { isLoggedIn, user } = response.data;
                // console.log(isLoggedIn);

                handlerLogin(isLoggedIn);
                
                if (isLoggedIn) {
                    userHandler(user);
                }
                
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch(error => {
                // console.log('Error checking login status:', error);
                setLoading(false); // Ensure loading is false even if there's an error
            });
    }, []);

   // getting all connections of current user

   useEffect(() => {
    const fetchConnections = () => {
      if (!userData) return;
      axios.get(`http://localhost:3000/connection/getConnections/${userData.username}`, { withCredentials: true })
        .then(result => {
          // console.log("Reached to find the result", result);
          const connections = result.data[0]?.connections || [];
          const pendingRequests = result.data[1]?.pendingRequests || [];
          const receivedRequests = result.data[2]?.receivedRequests || [];
          
          // console.log("The data from result", connections, pendingRequests, receivedRequests);
          setconnectionList(connections);
          setSendList(pendingRequests);
          setRequestList(receivedRequests);
        });
    };
    fetchConnections(); // Initial fetch when component mounts
    
    const interval = setInterval(fetchConnections, 5 * 60 * 1000); // Refresh every 5 minutes
    
    return () => clearInterval(interval); // Cleanup on component unmount
}, [userData]);


// const username = userData.username;
// console.log("abhjavfjsva");
useEffect(() => {
    if (!userData) return;
    const fetchConnections = async () => {
      try {
        // console.log("Fetching connection suggestions...");
        const users = await axios.get(`http://localhost:3000/connection/getallConnections/${userData.username}`, { withCredentials: true });
        // console.log(users.data);
        setSuggestions(users.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchConnections();
  }, [userData]);
  



    return (
        <>
        
            {loading ? ( // Show loading screen if still loading
                <div className="flex items-center justify-center min-h-screen bg-slate-300 dark:bg-slate-950">
                    <p className="text-xl text-gray-600 dark:text-gray-300">Loading...</p>
                </div>
            ) : (
                <>
                 <div className='fixed top-0 left-0 right-0 bottom-0 h-screen bg-slate-300 dark:bg-slate-950 -z-10'></div>
                <div className="bg-slate-300 dark:bg-slate-950">
                    <DarkandLightTheme />
                    <Navbar />
                    <Outlet />
                    
                </div>
                </>
            )}
        </>
    );
}

export default App;
