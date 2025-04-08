

import React from 'react'
import { createContext, useState } from 'react'
const CustomerData = createContext();

export const LoginUserDataProvider=({children})=>{


      //to store userData
        const [userData, setUserData] = useState(null);
        const [isLogin, setIsLogin] = useState(false);

        const userHandler = (data)=>{
            setUserData(data)
        } 

        const handlerLogin =(login)=>{
            setIsLogin(login)
        }
        
        
        return <CustomerData.Provider value={ {userData,userHandler,isLogin,handlerLogin}}>
            {children}
        </CustomerData.Provider>

}

export default CustomerData