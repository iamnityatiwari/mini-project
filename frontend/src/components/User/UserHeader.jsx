import React, { useState } from 'react'
import ProfileIcon from './loadProfileIcon'
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';



const UserHeader = ({onHandler, isConnection, name, bio, img, isLogin, username}) => {
  // console.log(name, bio);
  // const navigate = useNavigate();
  const [showModal, setModal] = useState(false);


  const handleClick = (e) => {
    // console.log("isLogin:", isLogin);  // Check if isLogin is recognized correctly
    if (isLogin) {
      onHandler();
    } else {
      setModal(true);
    
      // //  Confirm this log prints
      //  alert('you have not login');
      // try {
      //   navigate('/login');
      // } catch (error) {
      //   // console.error("Navigation error:", error);
      //   // Alternative navigation if navigate fails
        
      //   window.location.href = '/login';
      // }  
    }
  };

  return (

    <>
      
      <div className="flex flex-row items-center justify-between px-4 p-2 font-serif bg-slate-200 dark:bg-slate-800 ">
        {/* Profile Picture and Info */}
        <div className="flex items-center mb-4 sm:mb-0  font-mono">
          <div className="w-12 h-12 rounded-full mr-3  ">

          <ProfileIcon userName={name} imageUrl={img}/>
          </div>
          <div>

            <p className="font-semibold text-2xl font-serif ">
              <Link to={`/u/${username}`} className='text-sky-950 shodow capitalize dark:text-purple-500'>
                {name}
              </Link>
              {/* <button className="text-blue-600 font-medium text-sm mx-3" onClick={handleClick}>
                {!isConnection ? 'follow' : 'unfollow'}</button> */}
            </p>
            <p className="text-sm dark:text-orange-500">{bio}</p>
            {/* <p className="text-xs">{skill} </p> */}
          </div>
        </div>
      </div>

      {(showModal  && <Modal  setModalHandler={()=>{setModal(false)}}/>)}
    
    </>


   
  )
}

export default UserHeader