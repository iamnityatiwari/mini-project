import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileSection from './Profile/Profile';
import Skills from './Profile/Skills/Skills';
import Project from './Profile/Project/Project';
import Experience from './Profile/Experience/Experience';
import Education from './Profile/Education/Education';
import CustomerData from '../Store/LoginUserDataProvider';
import axios from 'axios';


const YourProfile = () => {
    const { userData, isLogin } = useContext(CustomerData);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [connections, setConnections] = useState([]);

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
                {/* Popup box for not logged-in message */}
           
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
        return <div>Loading..........</div>
    }

    useEffect(()=>{
        axios.get(`http://localhost:3000/user/connections/${userData.username}`, {withCredentials: true})
        .then(result=>{
            // console.log(result);
            setConnections(result.data);
        })
        .catch()
    }, [])

    function capitalizeFirstLetter(str) {
        if (!str) return str; // Return an empty string or undefined if the input is falsy
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
   

    return (
        <>
           


            {/* Profile content */}
            {userData ? (
                <div className="flex md:justify-center md:space-x-10 justify-center ">
                    <div className="relative top-20 h-96 w-60 hidden md:flex flex-col rounded-lg p-5 bg-white dark:bg-black text-black dark:text-white shadow shadow-blue-500">
                        <div className="text-xl font-semibold border-b-2 dark:border-blue-950 pb-2 dark:text-purple-500">
                            Connections:
                            <span className="ml-2 font-san text-2xl relative top-0.5 dark:text-red-500 ">
                                {connections.length > 0 ? `${connections.length}`: ''}
                            </span>
                        </div>
                        <div 
                            className="flex-col space-y-4 overflow-y-auto text-start flex"
                            style={{ maxHeight: '50vh' }}  // Set max height to half the screen height
                        >
                            {connections.length > 0 ? (
                                connections.map((connection, index) => (
                                    <Link key={index} to={`/u/${connection.username}`} className='dark:text-orange-500'>{capitalizeFirstLetter(connection.name)}</Link>
                                ))
                            ) : (
                                <div>No connections available</div>
                            )}
                        </div>
                    </div>

                    <div className='lg:w-2/3 md:w-3/5 w-[90%] '>
                        <ProfileSection userId={userData._id} />
                        <Skills userId={userData._id} />
                        <Project userId={userData._id} />
                        <Experience userId={userData._id} />
                        <Education userId={userData._id} />
                    </div>
                </div>
            ) : (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    Loading...
                </div>
            )}
        </>
    );
};


export default YourProfile;
