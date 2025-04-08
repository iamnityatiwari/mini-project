import React, { useState, useEffect } from "react";
import { MdBookmark } from "react-icons/md";
import AOS from 'aos'; // Import AOS for initialization
import 'aos/dist/aos.css'; // Import the AOS CSS for animations
import { Link } from "react-router-dom";
import axios from "axios";


const CompactJobPostCard = ({ job, postedBy , username}) => {
  const {
    companyName,
    companyLogo,
    role,
    salary,
    location,
    city,
    jobType,
    skillsRequired,
    experience,
    qualification,
    createdBy,
    deadline,
    description,

  } = job;
  let firstChar=''
  if(typeof(companyName) !== 'undefined')
  firstChar = companyName.toString().charAt(0).toUpperCase();

  // console.log('fist',firstChar);
  const [saved, setSaved] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveForLater = (e) => {
    e.stopPropagation();
    axios.get(`http://localhost:3000/job/savejob/${job._id}`, {withCredentials: true})
    .then(result=>{
      setSaved(!saved);
      alert(`Job ${saved ? "removed from" : "saved to"} your saved jobs.`);
    })
    .catch(err=>console.log(err));
  };

  const handleApply = (e) => {
    e.stopPropagation();
    axios.get(`http://localhost:3000/job/applyjob/${job._id}`, {withCredentials: true})
    .then(result=>{
      // console.log(result);
      // console.log(result);
      alert(result.data);
    })
    .catch(err=>console.log(err));
  };


  



    // Initialize AOS animation
    useEffect(() => {
      AOS.init({
          duration: 800, // Duration of the animation
          easing: 'ease-in-out', // Easing function for the animation
          once: false, // Only animate once when scrolled into view
          offset:200,
      });
  }, []);

  return (
    <>
      <div  data-aos="fade-up"
     data-aos-anchor-placement="top-bottom" data-aos-delay="100"
        className="relative w-full bg-white dark:bg-black dark:text-orange-600 rounded-lg p-4 cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white  "
       
      >
        <div className="absolute top-2 right-2">
          <Link to={`/jobDetails?job=${job._id}`}
            
            className="dark:bg-green-800 text-white px-3 py-1 rounded-md hover:bg-green-700 bg-green-600"
          >
            View Details
          </Link>
        </div>

        <div className="flex items-center mb-2">
          {!(typeof(companyLogo) === 'undefined') ?<img 
            src={companyLogo}
            alt={`${companyName} logo`}
            className="h-12 w-12 rounded-full bg-gray-400 mr-2"
          />:<div className="h-12 w-12 rounded-full bg-amber-950 mr-2 flex justify-center items-center font-bold text-3xl dark:text-slate-950 text-black"> 
          {firstChar}
          </div>}
          <div>
            <h3 className="text-lg md:text-2xl font-bold text-blue-900 dark:text-orange-600">{companyName}</h3>
            <p className="text-sm text-gray-500 dark:text-orange-400">Posted by: {postedBy}</p>
          </div>
        </div>

        <div className="overflow-y-auto max-h-32">
          <p className="text-lg text-gray-800 dark:text-purple-600 font-medium">{role}</p>
          <p className="text-sm text-gray-500 dark:text-white">{salary}</p>
          <p className="text-sm text-gray-500 dark:text-white">{location}, {city}</p>
          <p className="text-xs text-gray-500 dark:text-white">Deadline: {new Date(deadline).getDate()+'/'+new Date(deadline).getMonth() + '/'+ new Date(deadline).getFullYear()}</p>
        </div>

        <div className="absolute bottom-2 right-2 flex space-x-2">
          <button
            onClick={handleSaveForLater}
            className={`flex items-center ${saved ? "text-blue-500" : "text-black dark:text-white"} `}
          >
            <MdBookmark className={`mr-1`} />
            {saved ? "Saved" : "Save"}
          </button>

          <button
            onClick={handleApply}
            className="dark:bg-blue-800 text-white px-4 py-1 rounded-md hover:bg-blue-700 bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>

    </>
  );
};

export default CompactJobPostCard;
