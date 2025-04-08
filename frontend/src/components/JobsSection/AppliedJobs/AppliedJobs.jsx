import React, { useState, useEffect } from 'react';
import AplliedCard from './AppliedCard';
import { FcSearch } from "react-icons/fc";
import axios from 'axios';
import { useContext } from 'react';
import CustomerData from "../../../Store/LoginUserDataProvider";
import { useNavigate } from 'react-router-dom';

const AppliedJobs = () => {
  const { userData } = useContext(CustomerData);
  const [job, setJob] = useState([]);
  const [NoText, setNoText] = useState('');
  const [jobFilter, setJobFilter] = useState('pending'); // track the selected filter (pending, accepted, rejected)
  const navigate = useNavigate();

  // Fetch jobs when component loads or filter changes
  useEffect(() => {
    let url = '';
    switch (jobFilter) {
      case 'accepted':
        url = 'http://localhost:3000/job/getAcceptedJobs';
        break;
      case 'rejected':
        url = 'http://localhost:3000/job/getRejectedJobs'; // You should have this endpoint for rejected jobs
        break;
      default:
        url = 'http://localhost:3000/job/getAppliedJobs';
    }

    axios.get(url, { withCredentials: true })
      .then(response => {
        const fetchedJobs = response.data;
        setJob(fetchedJobs);

        if (fetchedJobs.length === 0) {
          setNoText(`No jobs ${jobFilter}`);
        } else {
          setNoText('');
        }
      })
      .catch(err => console.log(err));
  }, [jobFilter]); // Run the effect when jobFilter changes

  const handleFilterChange = (filter) => {
    setJobFilter(filter);
  };

  return (
    <div className='flex justify-center relative py-16'>
    <div className="flex w-full flex-col max-h-screen bg-white dark:bg-gray-800 shadow-lg max-w-3xl">
      {/* Header with navigation buttons */}
      <div className="flex justify-between items-center p-2 border-b dark:border-gray-700">
        <button
          className="text-black dark:text-white"
          onClick={()=>{navigate('/jobs')}}
        >
          Back
        </button>

        {/* <div className="flex items-center border-b-2 border-gray-300 focus-within:border-blue-500">
          <FcSearch className="text-gray-500 mr-2" />
          <input
            type="search"
            placeholder="Search...."
            className="w-full pr-10 py-2 focus:outline-none dark:focus:bg-gray-800 dark:bg-gray-800 text-sm dark:text-white"
          />
        </div> */}

      </div>

      <div className='flex justify-evenly '>
        <button className='sm:px-2.5 px-1.5 bg-green-500 rounded-md py-1 mt-1' onClick={() => handleFilterChange('accepted')}>Accepted</button>
        <button className='sm:px-2.5 px-1.5 bg-yellow-500 rounded-md py-1 mt-1' onClick={() => handleFilterChange('pending')}>Applied</button>
        <button className='sm:px-2.5 px-1.5 bg-red-500 rounded-md py-1 mt-1' onClick={() => handleFilterChange('rejected')}>Rejected</button>
      </div>

      {/* Content area */}
      <div className="overflow-y-auto p-4 md:grid gap-10 text-black dark:text-white h-full md:grid-cols-2 flex flex-col items-center">
        {job.length > 0 ? (
          job.map((singleJob, index) => (
            <AplliedCard key={index} job={singleJob} postedBy={singleJob.postedBy} username={userData.username} />
          ))
        ) : (
          <p>{NoText}</p>
        )}
      </div>

    </div>
    </div>
  );
};

export default AppliedJobs;
