import React, { useContext, useState } from "react";
import { FaEnvelope, FaUserPlus } from "react-icons/fa"; // Importing icons
import ConnectionDetails from "./ConnectionDetails"; // Importing the new component
import ConnectionLocal from "../../Store/ConnectionProvide";
import CustomerData from "../../Store/LoginUserDataProvider";
import axios from "axios";
import { Link } from "react-router-dom";

const Connection = () => {

  const {connectionList, sendList, requestList, suggestions, sendConnectionHandler, requestAccept, handleReject} = useContext(ConnectionLocal);
  const {userData} = useContext(CustomerData);
  
  // Handle opening the modal with user details
  const handleOpenModal = (user) => {

  };

  // Handle closing the modal
  const handleCloseModal = () => {
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center mt-10  lg:items-start items-center">
      {/* Connection Requests Section */}
      <div className="lg:w-1/3 w-full bg-white dark:bg-black p-4 border rounded-md shadow-md mx-2 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-purple-500">Connection Requests</h2>
        {requestList.length > 0 ? (
          requestList.map((request,index) => (
            <div key={index} className="flex justify-between items-center bg-slate-300 dark:bg-slate-950  text-black dark:text-orange-500 p-3 mb-3 rounded-md shadow-sm dark:shadow-sky-300 shadow-blue-900">
              <div>
                <Link to={`/u/${request.username}`}
                  className="font-medium cursor-pointer hover:text-blue-500"
                 
                >
                  {request.name}
                </Link>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => requestAccept(request)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No connection requests at the moment.</p>
        )}
      </div>

      {/* Current Connections Section */}
      <div className="lg:w-1/3 w-full bg-white dark:bg-black p-4 border rounded-md shadow-md mx-2 mt-4 lg:mt-0  max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-purple-500">Your Connections</h2>
        {connectionList.length > 0 ? (
          connectionList.map((connection, index) => (
            <div key={index} className="flex justify-between items-center bg-slate-300 dark:bg-slate-950  text-black dark:text-orange-500 p-3 mb-3 rounded-md shadow-sm dark:shadow-sky-300 shadow-blue-900">
              <div className="flex items-center space-x-2">
                {/* Online/Offline Status Dot */}
                <span
                  className={`h-3 w-3 rounded-full ${connection.isOnline ? "bg-green-600" : "bg-red-600"}`}
                  title={connection.isOnline ? "Online" : "Offline"}
                ></span>
                <Link to={`/u/${connection.username}`}
                  className="font-medium cursor-pointer hover:text-blue-500"
                  
                >
                  {connection.name}
                </Link>
              </div>
              <button
                // onClick={() => handleMessage(connection)}
                className="text-blue-500 hover:text-blue-600"
              >
                <FaEnvelope size={20} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You have no connections yet.</p>
        )}
      </div>

      {/* Suggestions Section */}
      <div className="lg:w-1/3 w-full bg-white dark:bg-black p-4 border rounded-md shadow-md mx-2 mt-4 lg:mt-0  max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-purple-500">Suggestions</h2>
        {suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex justify-between items-center bg-slate-300 dark:bg-slate-950  text-black dark:text-orange-500 p-3 mb-3 rounded-md shadow-sm dark:shadow-sky-300 shadow-blue-900">
              <Link to={`/u/${suggestion.username}`}
                className="font-medium cursor-pointer hover:text-blue-500"
               
              >
                {suggestion.name}
              </Link>
              <button
                onClick={() => sendConnectionHandler(suggestion.username)}
                className="text-green-500 hover:text-green-600"
              >
                <FaUserPlus size={20} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No suggestions available.</p>
        )}
      </div>

      {/* User Details Modal */}
      {/* {modalVisible && currentUser && ( */}
        {/* <ConnectionDetails user={currentUser} onClose={handleCloseModal} /> */}
      {/* )}  */}
    </div>
  );
};

export default Connection;
