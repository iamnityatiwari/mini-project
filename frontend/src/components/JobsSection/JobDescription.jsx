import React, { useEffect, useState } from "react";
import { MdBookmark, MdShare, MdPrint } from "react-icons/md";
// { job, handlePrint, handleShare } props
import { useLocation, useParams } from 'react-router-dom';
import axios from "axios";

const JobDescription = () => {
  // console.log("reached the page");
  const locations = useLocation();
  
  const jobId = new URLSearchParams(locations.search).get('job');

  // const {jobId} = useParams(); 
  // console.log("jobId: ",jobId);
  const [job, setJob] = useState({});

  // console.log("kbsabfjasvjhavkhbkasbdkas",jobId); 
  
  if(!jobId)return;

  useEffect (()=>{
    // console.log("Before the start");
    axios.get(`http://localhost:3000/job/getjob/${jobId}`, {withCredentials: true})
    .then(result=>{
      setJob(result.data);
      // console.log("JobData: ",job);
    })
    .catch(err=>console.log(err));
  }, []);
  
  // console.log(job.skillsRequired);
  
  const handleShare = ()=>{

  }
  const handlePrint = ()=>{

  }
  const [saved, setSaved] = useState(false);

  const handleApply = () => {
    alert(`Applied for ${job.role} at ${job.companyName}`);
  };

  const handleSaveForLater = () => {
    
    setSaved(!saved);
    alert(`Job ${saved ? "removed from" : "saved to"} saved jobs.`);
  };

  return (
      <div className="flex justify-center w-full min-h-screen bg-slate-300 dark:bg-slate-950">
      {/* A4 Styled Job Detail Page */}
      <div className="bg-white dark:bg-slate-800 dark:text-white p-8 max-w-3xl w-full h-full shadow-lg rounded-lg overflow-y-auto relative flex flex-col mt-20 mx-2 mb-5">
        {/* Top Section: Company Picture and Logo */}
          <div className="flex justify-between mb-6">
            {/* Company Picture on the Top Left */}
            <div className="w-1/4">
              <img src={job.companyPicture} alt="Company" className="w-full h-auto rounded-lg" />
            </div>

            {/* Company Logo and Name on the Top Right */}
            <div className="w-1/2 text-right">
              {/* <img src={companyLogo || } alt="Company Logo" className="w-20 h-20 mx-auto" /> */}
              <h2 className="text-3xl font-bold mt-2">{job.companyName}</h2>
            </div>
          </div>

        {/* Job Details Section */}
          <div className="text-gray-700 dark:text-gray-300">
            <h3 className="text-2xl font-semibold mb-2">{job.role}</h3>
            <p className="text-lg mb-1">
              {job.location}, {job.city} - <span className="capitalize">{job.jobType}</span>
            </p>
            <p className="text-lg mb-1">Salary: {job.salary}</p>
            <p className="text-lg mb-1">Experience: {job.experience}</p>
            <p className="text-lg mb-1">Qualification: {job.qualification}</p>
            <p className="text-lg mb-1">
              Skills Required: {!(job.skillsRequired===undefined) ? job.skillsRequired.join(", ") : "No specifications"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Deadline: {job.deadline}</p>

            {/* Job Description */}
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-2">Job Description</h4>
              <p className="text-sm leading-relaxed">{job.description}</p>
            </div>
          </div>

        {/* Bottom Action Toolbar */}
        {/* <div className="fixed bottom-0  bg-white max-w-3xl dark:bg-slate-800 border-t dark:border-gray-700 py-2 flex justify-around items-center text-gray-600 dark:text-gray-300"> */}
          <div className="flex justify-between">
            <button disabled={true}
              onClick={handleSaveForLater}
              className="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <MdBookmark className={saved ? "text-blue-500 dark:text-blue-400" : ""} />
              <span>{saved ? "Saved" : "Save"}</span>
            </button>

          {/* <button
            onClick={handleShare ? handleShare : () => alert("Share feature not implemented")}
            className="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <MdShare />
            <span>Share</span>
          </button> */}

          {/* <button
            onClick={handlePrint ? handlePrint : () => alert("Print feature not implemented")}
            className="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <MdPrint />
            <span>Print</span>
          </button> */}

            <button
              disabled={true}
              onClick={handleApply}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default JobDescription;
