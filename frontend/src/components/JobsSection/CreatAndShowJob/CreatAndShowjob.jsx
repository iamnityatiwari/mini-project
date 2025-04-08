import React, { useState } from 'react'
import JobPostingForm from './JobPostingForm'
import JobCard from './jobCard';
import { Outlet } from 'react-router-dom';
import CreateJob from './CreateJob';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import CustomerData from '../../../Store/LoginUserDataProvider';



const CreatAndShowjob = () => {
  

  const [toggleButton, setToggleButton] = useState(true);
  const {userData} = useContext(CustomerData);
  // console.log("Patent ,",userData)
  

  return (
    <>
    
    <div className='fixed md:text-2xl sm:text-xl text-sm text-center top-20  left-1/2  -translate-x-1/2 translate-y-2 z-10 grid grid-cols-2 shadow-md border-2 border-sky-500 shadow-sky-500 rounded-full'>
      <Link to={`createJob?user=${userData.username}`}>
      <button className={` px-4 py-1 w-full rounded-l-full ${toggleButton ? 'bg-sky-400' : 'bg-white'}`} onClick={()=>setToggleButton(true)}>Create Job+</button></Link>
      <Link to={`pastJob?user=${userData.username}`}>
      <button className={` px-4 py-1 w-full h-full rounded-r-full ${!toggleButton ? 'bg-sky-400' : 'bg-white'}`} onClick={()=>setToggleButton(false)}> Past Jobs</button>
      </Link>
    </div>
  

    <Outlet/>
    </>
    
  )
}

export default CreatAndShowjob