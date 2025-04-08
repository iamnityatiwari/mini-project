import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

import React from 'react'
import { useState,useEffect } from "react";

export const DarkandLightTheme = () => {
       
  

//to toggle theme 
const [theme, setTheme] = useState(null);

useEffect(()=>{
   if(window.matchMedia('(prefers-color-scheme: dark)').matches){
     setTheme('dark');
   }else{
     setTheme('light');
   }
}, []);


useEffect(()=>{
 if(theme === 'dark'){
    document.documentElement.classList.add('dark');
 }else{
   document.documentElement.classList.remove('dark');
 }
 
}, [theme]);

const handleThemeSwitch = ()=>{
  setTheme(theme === 'dark' ? 'light' : 'dark');
}

  
  return (
   
    <button
    className='text-black bg-white dark:bg-black dark:text-white
    rounded-full p-3 flex justify-center items-center z-[100] fixed bottom-14 right-5 cursor-pointer text-sm ring-offset-2 ring-2'
    onClick={handleThemeSwitch}
  >
    {theme === 'dark' ? <MdOutlineDarkMode size={25} /> : <MdOutlineLightMode size={25} />}
  </button>
  )
}
