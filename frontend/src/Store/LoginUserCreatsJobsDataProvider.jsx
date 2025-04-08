import React, { createContext, useState, useContext, useEffect } from 'react';
import CustomerData from './LoginUserDataProvider';
import axios from 'axios';
export const CreatedJobData = createContext();

export const LoginUserCreatsJobsDataProvider = ({ children }) => {


  const {userData} = useContext(CustomerData);

  //  console.log("jbvjhasbkhabskbas",userData);

  const [createdJob, setCreatedJob] = useState([]); // Fixed typo here

  useEffect(() => {
    if (!userData) return; // If userData is not yet available, don't run the effect
    // console.log("goibg");
    axios.get(`http://localhost:3000/job/getJobs/${userData.username}`, { withCredentials: true })
      .then(jobs => {
        // console.log(jobs);
        setCreatedJob(jobs.data);
      })
      .catch(err => console.log(err));
  }, [userData]);



  // console.log(Array.isArray(createdJob));

  const handlerStoreData = (newJobCreateData) => {
    // console.log(newJobCreateData);
    axios.post(`http://localhost:3000/job/postjob`, newJobCreateData, {withCredentials: true})
    .then(result=>{
      if(result.status === 200){
        alert("Posted successfully");
      }
      else {
        alert("Error in Posting")
      }
    })
    .catch(err=>console.log(err));

    setCreatedJob((currentItems) => {
      // console.log(currentItems);
      return [...currentItems, newJobCreateData];
    });

  };

  return (
    <CreatedJobData.Provider value={{ createdJob, handlerStoreData }}>
      {children}
    </CreatedJobData.Provider>
  );
};
