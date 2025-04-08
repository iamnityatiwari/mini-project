

import React, { useState } from 'react'
import Style from './Modal.module.css';
import { useEffect } from 'react'


const Modal = ({ setModalHandler}) => {

 useEffect(()=>{
    document.body.style.overflowY = "hidden";
    return ()=>{
        document.body.style.overflowY = "scroll";
    }
 }, [])


  return (
    <>

      <div className={Style.modal_wrapper} onClick={setModalHandler}></div>
      <div className={Style.modal_container}>
          <h2 className='text-lg font-semibold relative -top-3'>You have not login</h2>
         <div className='flex space-x-2 my-3 text-white'>
            <button onClick={setModalHandler} className='border-2 rounded-lg px-4 bg-red-500 hover:bg-red-600 box-content py-0.5'>Cancel</button>
            <a href='/login' className='border-2 rounded-lg px-4 bg-green-500 hover:bg-green-600 box-content py-0.5'>login</a>
         </div> 
      
       </div>
    </>
   
  
  )
}

export default Modal