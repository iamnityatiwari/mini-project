import React, { useEffect, useState } from 'react';
import ApplicantsList from './ApplicantsList';
import axios from 'axios';

const JobCard = ({ role, salary, location, city, jobType, deadline, postedBy, ind ,_id}) => {
  
   const [showApplicantsList, setShow] = useState(false);
   const [SelectedStudent,setSelectedStudent] = useState(false)
    const [applicantList, setApplicantList] = useState([[]]);

   useEffect(()=>{
    axios.get(`http://localhost:3000/job/getJobs/${postedBy}`, {withCredentials: true})
    .then(jobs=>{
      // console.log("this is jobs",jobs.data);
      setApplicantList(jobs.data[ind].applications);
      // console.log(applicantList);
    })
    .catch(err=>console.log(err));
   },[] ) 

   
  const Completed = ()=>{
    setSelectedStudent(true);
  }
   
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-black max-w-xl  w-full  ">
      <h2 className="text-2xl font-semibold mb-2 text-blue-600 ">{role}</h2>
      <p className="text-lg font-medium text-gray-900 dark:text-gray-200">Salary: {salary || 'Not specified'}</p>
      <p className="text-gray-600 dark:text-gray-200">Location: {location || 'Remote'}</p>
      <p className="text-gray-600 dark:text-gray-200">City: {city}</p>
      <p className="text-gray-600 dark:text-gray-200">Job Type: {jobType}</p>
      <p className="text-red-500 mt-2">Application Deadline: {new Date(deadline).getDate()+'/'+new Date(deadline).getMonth() + '/'+ new Date(deadline).getFullYear()|| 'Open until filled'}</p>

      <div className='flex justify-center mt-2'>
        <div className='cursor-pointer text-black dark:text-white ring-1 ring-green-500 ring-offset-2 ring-offset-blue-400 dark:hover:bg-slate-800 hover:bg-slate-100 px-5  py-1 rounded-md' onClick={()=>setShow(true)}>
          { !SelectedStudent ?  <p>Apllicants list</p>:<p>Selected List</p> }
        </div>
         {showApplicantsList && <div className='dark:bg-gray-800 bg-white  fixed top-16 right-0 left-0 bottom-0 z-10 '>
        
          <ApplicantsList data={applicantList} setShow={setShow} Completed={Completed} SelectedStudent={SelectedStudent} jobId = {_id}/>
          </div>}
      </div>
    </div>
  );
};

export default JobCard;
