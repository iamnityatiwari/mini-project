import React, { useState } from 'react'
import { useContext } from 'react';
import CustomerData from '../../../Store/LoginUserDataProvider';
const PostButton =({view, setShowSendPost}) => {
    const {userData,isLogin} = useContext(CustomerData);
        
   
  return (
    <> 
        {isLogin === true ?(
            <div   onClick={view === 'pc' ? () => setShowSendPost(true) : undefined} className={`flex  flex-wrap items-center  ${view === 'pc'? 'flex-col dark:bg-black bg-white rounded-md shadow shadow-blue-500 text-xl  w-full   py-10 ':'flex-row justify-between  h-full '}`}>
                {view !=='pc' && <>
                      <img src={userData.profilePicture} alt="pic" className='bg-gray-600 size-16  rounded-full ring-2 ring-offset-2 relative  left-2 my-2'  />
                      <div className='flex flex-col flex-wrap max-w-96 my-2'>
                        <div className='text-center text-xl sm:text-3xl dark:text-orange-600 font-semibold'>{userData.name}</div>
                        <div className="text-center text-sm mt-1 my-2">
                        {userData.bio
                            ? `${userData.bio.slice(0, 25)}${userData.bio.length > 25 ? '...' : ''}`
                            : 'Bio section'}
                        </div>

                     </div>
                </>}
                <div onClick={()=>{setShowSendPost(true)}} className={`${view === 'pc' ? ' ' : 'mr-2'} bg-gray-700 text-white px-7 rounded-lg cursor-pointer py-1 dark:bg-gradient-to-r from-purple-500 to-indigo-500 dark:hover:bg-gradient-to-l transition-colors ease-in-out duration-100 delay-75 hover:bg-gray-600`}>
                Post
               </div>



           </div>
        ):(
           
            <div className={` ${view === 'pc'? ' h-40   dark:bg-black bg-white shadow shadow-blue-500 rounded-md text-xl': ' h-full'} flex justify-center items-center `}>
               Welcome 
            </div>
         
        )}
       
 
      

    </>
  )
}

export default PostButton