import React, { useState, useEffect } from 'react';
import Navbar from './Heading/Heading';

import CompactJobPostCard from './JobsSection/CompactJobPostCard';
import SearchDropDown from './JobsSection/SearchDropDown';
import { IoReturnUpBackOutline } from "react-icons/io5"
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import CustomerData from '../Store/LoginUserDataProvider';
import axios from 'axios';
import AppliedJobs from './JobsSection/AppliedJobs/AppliedJobs';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';


const Jobs = () => {
  const [showAppliedJobs, setAppliedJobs] = useState(false);
  
  const [allJobs, setAllJobs] = useState([{}]);
  const {userData,isLogin} = useContext(CustomerData);
  

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

  const ToggleShowJobs = (set)=>{
    setAppliedJobs(set);
}

  useEffect(() => {
   
    if (!isLogin) {
        setShowPopup(true);
        const timer = setTimeout(() => {
            navigate('/');
        }, 2000);
        return () => clearTimeout(timer);
    }
}, [isLogin, navigate]);




// Inside the useEffect to toggle scroll state
useEffect(() => {
  if (showAppliedJobs) {
    document.body.classList.add('overflow-hidden'); // Add no-scroll class
  } else {
    document.body.classList.remove('overflow-hidden'); // Remove it
  }
  return () => document.body.classList.remove('overflow-hidden'); // Cleanup on unmount
}, [showAppliedJobs]);

  





  useEffect(()=>{
    axios.get(`http://localhost:3000/job/alljobs`, {withCredentials : true})
    .then(jobs=>{
      // console.log("Getting the all jobs here",jobs);
      setAllJobs(jobs.data);
      // console.log(allJobs);
    })
    .catch(err=>console.log(err));
  }, [])


  // console.log("jobs",userData);
  // console.log("my login",isLogin)
  const handleSavedJobsClick = () => {
    navigate('/savedJobs');
  };
  const handleApplyJobClick = ()=>{
    navigate('/appliedJobs');
  }
  
  
  const handleJobFilterClick = (obj) => {
    // console.log("this is obj", obj);
    axios.post(`http://localhost:3000/job/filterjob`, obj, {withCredentials : true})
    .then(jobs=>{
      // console.log(jobs);
      setAllJobs(jobs.data);
      // console.log(allJobs);
    })
    .catch(err=>console.log(err));
  };





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
   <>
  
    <div className='w-full min-h-screen bg-slate-300 dark:bg-slate-950'>
     
      {/* <div className='dark:text-white text-center relative top-6 bg-slate-100 dark:bg-slate-600 md:w-1/3 sm:w-1/2 w-4/5  m-auto rounded-full py-1 text-3xl'>
      <Link to={'/'} className=' absolute bg-purple-300 dark:bg-purple-500 text-black dark:text-white text-sm md:text-base right-3/4 px-2 rounded-full py-1 md:top-1.5 top-2'>go Home</Link>Job Post</div> */}
     
      <div className='relative  mx-5   top-20 space-y-2'>
          <div className=" sm:w-2/3 m-auto lg:hidden grid grid-cols-2 gap-2">

            <Link to={`/job/createJob?user=${userData.username}`} className="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 ">
             
                  Create Job+
            
            </Link>

            <button onClick={handleApplyJobClick} className='block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 '>Applied Jobs </button>

            <Link to={`/job/pastjob?user=${userData.username}`}className="block w-full px-4 py-2 bg-gray-200 dark:bg-sky-950 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-sky-800 text-gray-800 dark:text-white ">
                  Past  Job
            </Link>
            
            <button onClick={handleSavedJobsClick} className='block w-full px-4 py-2 bg-gray-200 dark:bg-sky-950 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-sky-800 text-gray-800 dark:text-white '>Save Jobs</button>
          </div>
          <div className='md:hidden'>
          <SearchDropDown username={userData.username} handleJobFilterClick={handleJobFilterClick}/>
          </div>
      </div>
      <div className="flex  relative top-20 justify-center">
          
          <div className='relative  md:w-1/5 md:mx-4  hidden  lg:flex lg:flex-col top-5 space-y-5 text-center max-w-60'>
                <Link to={`/job/createJob?user=${userData.username}`} className="px-6 py-2 bg-slate-50 dark:bg-sky-950 hover:bg-slate-300 dark:hover:bg-sky-800 dark:text-white rounded-lg cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white space-y-3">
                    Create Job+
                </Link> 
                <Link to={`/job/pastJob?user=${userData.username}`} className="px-6 py-2 bg-slate-50 dark:bg-sky-950 dark:text-white hover:bg-slate-300 dark:hover:bg-sky-800 rounded-lg cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white space-y-3">
                    Past Job
                </Link > 
                <div onClick={handleApplyJobClick} className="px-6 py-2 bg-slate-50 dark:bg-sky-950 dark:text-white hover:bg-slate-300 dark:hover:bg-sky-800 rounded-lg cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white space-y-3">Applied Jobs </div>


                <div onClick={handleSavedJobsClick} className="px-6 py-2 bg-slate-50 dark:bg-sky-950 dark:text-white hover:bg-slate-300 dark:hover:bg-sky-800 rounded-lg cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white space-y-3">Saved Jobs</div>
          </div>
          
         <div className='flex flex-col items-center space-y-10 p-4 sm:w-2/3 w-full max-w-3xl'>
         {allJobs.map((job)=> 
            <CompactJobPostCard  job={job} postedBy={job.postedBy} username = {userData.username}/>
          )}
         </div>
        
        {/* You can add more CompactJobPostCard components here */}


         <div className='relative  md:w-1/5 md:mx-4  hidden  md:flex -top-1 space-y-5 text-center max-w-60'>
          <SearchDropDown username={userData.username} handleJobFilterClick={handleJobFilterClick}/>
         </div>
        
      </div>
      <div className='relative -top-20 h-32 -z-50'></div>
       

       {/* {showAppliedJobs &&  <div className="z-10 fixed top-0 right-0 bottom-0 left-0 bg-slate-300 w-full h-full flex  pt-16 dark:bg-slate-950  justify-center">
           
           <AppliedJobs ToggleShowJobs={ToggleShowJobs}/>
        </div>} */}
    </div>
   </>
  );
};

export default Jobs;
