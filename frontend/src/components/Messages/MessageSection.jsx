import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ChatSection from './ChatSectioin'
import axios from 'axios';

const MessageSection = ({ userData }) => {
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [messages, setMessages] = useState({});
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/connections/${userData.username}`, { withCredentials: true })
      .then((response) => {
        setConnections(response.data);
      })
      .catch((error) => console.error("Error fetching connections:", error));
  }, [userData.username]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("receiveMessage", (message) => {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [message.sender]: [...(prevMessages[message.sender] || []), message],
        }));
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("receiveMessage");
      }
    };
  }, []);


  // Open chat with selected connection
  const openChat = async (connection) => {
    setSelectedConnection(connection);
  
    const roomId = [userData.username, connection.username].sort().join("-");
  
    // Join the room via Socket.IO
    socketRef.current.emit("joinRoom", roomId);
  
    // Fetch message history
    try {
      const response = await axios.get(`http://localhost:3000/messages/${roomId}`);
      setMessages((prevMessages) => ({
        ...prevMessages,
        [connection.username]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching message history:", error);
    }
  };
  

  // Send a message to the backend and update local messages
  const sendMessage = (text) => {
    const roomId = [userData.username, selectedConnection.username].sort().join("-");
    const newMessage = { id: Date.now(), text, sender: userData.username, receiver: selectedConnection.username };

    socketRef.current.emit("sendMessage", { roomId, message: newMessage });

    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedConnection.username]: [...(prevMessages[selectedConnection.username] || []), newMessage],
    }));
  };

  const closeChat = () => {
    setSelectedConnection(null);
  };

  return (
    <>
     
    <div className="flex h-screen pt-16  ">
      {/* Connections List on the Left */}
      <div className="md:w-1/4 w-2/5  bg-white dark:bg-slate-800 border-r-2 border-gray-300 dark:border-gray-600 ">
        <h2 className="text-2xl font-semibold  flex justify-center items-center dark:bg-gray-900 py-5 dark:text-purple-500 shadow shadow-blue-600">Connections</h2>
        {/* <div className='w-full dark:bg-slate-700 bg-slate-300  h-1 rounded-full border-none outline-none '></div> */}
        <div className="space-y-2  flex flex-col ">
          {connections.map((connection, index) => (
            <div    onClick={() => openChat(connection)} key={index} className='flex  justify-start items-center m-2 mx-4  cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-900 p-2 rounded-md'>
              <div className='size-10 rounded-full bg-slate-500 flex justify-center items-center text-2xl font-bold '>{
                connection.username.charAt(0).toUpperCase()
                }</div>
              <div
                key={connection.username}

                className="px-2    text-center dark:text-purple-400"
              >
                {connection.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section on the Right */}
      {selectedConnection && (
        <div className=" md:w-3/4 w-3/5">
          <ChatSection
            selectedConnection={selectedConnection}
            messages={messages[selectedConnection.username] || []}
            onClose={closeChat}
            onSendMessage={sendMessage}
          />
        </div>
      )}
    </div>
    </>
  );
};

export default MessageSection;