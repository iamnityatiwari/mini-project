import { createContext, useState , useEffect} from "react";
import React from 'react';
import axios from 'axios';
import CustomerData from './LoginUserDataProvider';
import { useContext } from "react";

const ConnectionLocal = createContext();


export const ConnectionProvide = ({children}) => {
  //you can set UserName
  const {userData} = useContext(CustomerData);  
  // console.log("userData is hisjdkjfbcsahkbdkasjfcsa", userData);
  const [sendList, setSendList] = useState([]);
  const [requestList,setRequestList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [connectionList, setconnectionList] = useState([]);
  
  //suggestion handle
  const unsetSuggestions = (username) =>{
    setSuggestions(a=>{
      return  a.filter(item => item.username !== username)
    })
  };


  //connection list yours

  const connectionHandler = (newConnection)=>{
    //set newConnection 
      setconnectionList(currentItem => {

        return [...currentItem,{id:newConnection.id, name:newConnection.name}]
      })
  }
  const disconnectHandler = (oldConnection)=>{
      

    //disConnection
      setconnectionList(currentItem =>{
        return currentItem.filter(item=> item.id !== oldConnection.id);
      })

  }



  //to request list (koi request kya set request list )

  const requestAccept = async (newRequest)=>{
    // console.log("this is newRequest", newRequest);
    try {
      const result = await axios.post(`http://localhost:3000/connection/acceptRequest/${newRequest.username}`,{ username: newRequest } , {withCredentials: true})
      // console.log(result);
      setRequestList(a=>{
        return  a.filter(item => item.username !== newRequest.username)
      })
      connectionHandler(newRequest);
    } catch (err) {
      console.log(err);
    }
  }

  const handleReject = async(request)=>{
    try {
      const result = await axios.post(`http://localhost:3000/connection/rejectRequest/${request.username}`,{ username: request } , {withCredentials: true})
      // console.log(result);
      setRequestList(a=>{
        return  a.filter(item => item.username !== request.username)
      })
      // connectionHandler(newRequest);
    } catch (err) {
      console.log(err);
    }
  }
  const deleteRequest = (oldRequest)=>{
      //deleteRequest
      setRequests(panddingRequest =>{
         return panddingRequest.filter(user=> user.id !== oldRequest.id)
      })
  }

 

  //I accept request 
  // const requestAccept = (newUser=>{
         
  //       //delete a newUser from  my Request list
  //       deleteRequest(newUser);

  //       //add my Request list 
  //       connectionHandler(newUser);


  //       //to pass refer to myRequestAccept
  // })



  //I Reject Request
  const requestReject = (newUser=>{
      

      //delete a newUser from  my Request list
      deleteRequest(newUser);
  })

  const sendConnectionHandler = async (receiver) => {
    try {
      const result = await axios.post(
        `http://localhost:3000/connection/sendRequest/${receiver}`,
        { username: receiver } , {withCredentials: true}
      );
      // console.log(result);
      unsetSuggestions(receiver);
    } catch (err) {
      console.log(err);
    }
  };

  const objList = {
    requestReject,
    requestAccept,
    deleteRequest,
    // requestHandler,
    disconnectHandler,
    connectionHandler,
    suggestions, setSuggestions,
    sendConnectionHandler,
    handleReject
  }






  return (
    <ConnectionLocal.Provider value={{...objList,connectionList,setconnectionList,requestList,setRequestList,sendList,setSendList}}>
        {children}
    </ConnectionLocal.Provider>
  )
}

export default ConnectionLocal;

