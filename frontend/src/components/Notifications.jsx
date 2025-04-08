import React from 'react'
import Navbar from './Heading/Heading'
import  {useContext } from 'react'

import CustomerData from '../Store/LoginUserDataProvider'

const Notifications = () => {

  const {userData,userHandler,isLogin, handlerLogin} = useContext(CustomerData);

    // console.log("not::",userData);
    // console.log("mylogin:",isLogin)
  return (
    <div className='text-red-600'>Notific
    </div>
  )
}

export default Notifications