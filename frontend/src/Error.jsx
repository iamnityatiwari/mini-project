import React from 'react'
import { useRouteError } from 'react-router-dom';
export const Error = () => {

    let error = useRouteError();
    // console.error(error.status);
  return (
    <div className='absolute top-1/3 left-1/3 right-1/3 bottom-1/3 flex flex-col justify-center items-center text-3xl text-red-500'>{error.status}<span className='text-lg text-black'>Something went wrong</span></div>
  )
}
