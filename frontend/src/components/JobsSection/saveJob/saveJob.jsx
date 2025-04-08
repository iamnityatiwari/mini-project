import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import CompactJobPostCard from '../CompactJobPostCard';
import { useNavigate } from 'react-router-dom';
import CustomerData from '../../../Store/LoginUserDataProvider';



const SaveJob = () =>{
    const navigate = useNavigate();
    const [savedJobs, setSavedjob] = useState([]);
    const {userData} = useContext(CustomerData)
 
    useEffect(()=>{
        axios.get(`http://localhost:3000/Job/getSavedJobs/${userData.username}`, {withCredentials: true})
        .then(result=>{
            console.log("mySave",result)
            setSavedjob(result.data);
        })
        .catch(err=>console.log(err));
    }, []);
   
    return( 
           <div className='flex justify-center relative py-16'>
            <div className="flex w-full flex-col max-h-screen bg-white dark:bg-gray-800 shadow-lg max-w-3xl">
                {/* Header with navigation buttons */}
                <div className="flex justify-between items-center p-2 border-b dark:border-gray-700">
                <button
                    className="text-black dark:text-white"
                    onClick={() => (navigate('/jobs'))}
                >
                    Back
                </button>
        
                
        
                
                </div>
        
        
                {/* Content area */}
                <div className="overflow-y-auto p-4 md:grid gap-10 text-black dark:text-white h-full md:grid-cols-2 flex flex-col items-center">
                {savedJobs.length > 0 ? (
                    savedJobs.map((singleJob, index) => (
                    <CompactJobPostCard key={index} job={singleJob} postedBy={singleJob.postedBy} username={userData.username} />
                    ))
                ) : (
                    <p>No Saved Job</p>
                )}
                </div>
        
            </div>
            </div>)
}

export default SaveJob;