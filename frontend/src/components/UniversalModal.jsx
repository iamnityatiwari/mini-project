

import React  from 'react'

import { useEffect } from 'react'


const UniversalModal = ({ unsetModalHandler, children, _top, _left, _buttom, _right}) => {

 useEffect(()=>{
    document.body.style.overflowY = "hidden";
    return ()=>{
        document.body.style.overflowY = "scroll";
    }
 }, [])


  return (
    <>

      <div className='fixed top-0 right-0 left-0 bottom-0 z-40 bg-slate-50 opacity-5' onClick={unsetModalHandler}></div>
      <div className={`fixed top-1/2 left-1/2 bg-white z-50 p-10 rounded-xl m-4 shadow-md shadow-black -translate-x-1/2 -translate-y-1/2`}>
         {/* <div>Hellow</div> */}
           {children}
       </div>
    </>
   
  
  )
}

export default UniversalModal