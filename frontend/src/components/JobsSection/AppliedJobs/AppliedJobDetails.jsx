import React, { useEffect, useState } from "react";

const AppliedJobDetails = ({hadlerModal, job}) => {


  return (
      <div className="flex fixed top-16 left-0 right-0 bottom-0 w-full min-h-screen bg-white dark:bg-gray-800 z-20 justify-center">
         
          
     
        <div className="bg-white dark:bg-slate-800 dark:text-white p-8 max-w-3xl w-full h-full shadow-lg rounded-lg overflow-y-auto relative flex flex-col ">
        <div className="fixed cursor-pointer top-20 text-blue-600" onClick={()=>{hadlerModal(false)}}>Back</div>


            <div className="flex justify-between mb-6 my-10">
            
                <div className="w-1/4">
                <img src={job.companyPicture} alt="Company" className="w-full h-auto rounded-lg" />
                </div>

                <div className="w-1/2 text-right">
        
                <h2 className="text-3xl font-bold mt-2">{job.companyName}</h2>
                </div>
            </div>

     
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

            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-2">Job Description</h4>
              <p className="text-sm leading-relaxed">{job.description}</p>
            </div>
          </div>

    
        </div>
    
    </div>
  );
};

export default AppliedJobDetails;
