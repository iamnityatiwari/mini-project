import React, { useState,useEffect, useContext } from 'react';
import { FaHeart, FaComment, FaShare, FaTimes } from 'react-icons/fa';
import LikeCommentShere from './LikeCommentShere';
import UserHeader from './UserHeader';
import ContentSection from './ContentSection';
import Comments from './Comments';
import SharePost from './SharePost';

import AOS from 'aos'; // Import AOS for initialization


import axios from 'axios';
import CustomerData from '../../Store/LoginUserDataProvider';
// Dummy user data for sharing (replace with real user data from props or state)

function UserPost({ UserProfile, isLogin, myconnect }) {

  const {userData} = useContext(CustomerData);
  const [connection, setConnection] = useState(false);
  const [isVisibleCard, setIsVisibleCard] = useState(true);
  const [CommentVisible, setCommentVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);

  // States for tracking Like, Comment, Share actions
  const [isLiked, setIsLiked] = useState(false);
  const [likeCounnt, setLikeCount] = useState(0);
  const [isCommented, setIsCommented] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const connectionHandler = () => {
    setConnection(!connection);
  };

  const removeCard = () => {
    setIsVisibleCard(false);
  };

  const setCommentHandler = () => {
    setCommentVisible(true);
  };

  const addComment = (newComment) => {
    axios.post(`http://localhost:3000/post/comment/${UserProfile._id}`,{text: newComment, profilePicture: userData.profilePicture}, {withCredentials: true})
      .then(result=>{
        console.log("This is result data",result);
        setComments(result.data);
      })
      .catch(err=>console.log(err));
  };

  const toggleShareModal = () => {
    setIsShareModalVisible(!isShareModalVisible);
  };

  const shareWithUser = (userId) => {
    console.log(`Shared with user ID: ${userId}`);
    // Implement actual sharing logic here
    toggleShareModal(); // Close the modal after sharing
  };


   // Initialize AOS animation
   useEffect(() => {
    AOS.init({
        duration: 800, // Duration of the animation
        easing: 'ease-in-out', // Easing function for the animation
        once: false, // Only animate once when scrolled into view
        offset:50,
    });
}, []);

  // Like, Comment, Share handlers

  const handleLike = () => { 
    if (isLogin) {
      axios.get(`http://localhost:3000/post/like/${UserProfile._id}`, {withCredentials: true})
        .then(result => {
          setLikeCount(result.data.likesCount);
          if(result.data.result == -1)setIsLiked(false);
          else setIsLiked(true);

          // setIsLiked(!isLiked); // Toggle the like state
        })
        .catch(err => console.log(err));
    } else {
      console.log('Please log in to like');
    }
  };

  const handleComment = () => {
    if (isLogin) {
    setCommentHandler(); // Open the comment section
    axios.get( `http://localhost:3000/post/getComments/${UserProfile._id}`, {withCredentials: true})
    .then(result=>{
      setComments(result.data);
      setIsCommented(true); // Mark as commented
    })
    .catch(err=>console.log(err));
    } else {
      console.log('Please log in to comment');
    }
  };

  const handleShare = () => {
    if (isLogin) {
      toggleShareModal(); // Open the share modal
      setIsShared(true); // Mark as shared
    } else {
      console.log('Please log in to share');
    }
  };


  if (!isVisibleCard) {
    return null;
  }

  return (
    <>
      <div  data-aos="zoom-in"
      data-aos-delay="100" className=" relative w-full md:mx-auto shadow-blue-300 border-none rounded-lg shadow-md overflow-hidden bg-white dark:bg-black inline-block mb-8 mt-2 text-black ">
        <FaTimes
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer"
          onClick={removeCard}
          size={18}
        />

       {myconnect === true? <div></div> : (<UserHeader
          onHandler={connectionHandler}
          username = {UserProfile.username}
          isConnection={connection}
          name={UserProfile.name}
          bio={UserProfile.bio}
          img={UserProfile.profileUrl}
          isLogin={isLogin}
        />)}

        <ContentSection img={UserProfile.images} desc={UserProfile.description} />

        <div className="flex justify-around text-sm font-serif border-t-2 dark:border-slate-900 divide-x dark:divide-slate-900">
          <LikeCommentShere
            Icon={FaHeart}
            title={'Like'}
            col={isLiked ? 'red' : 'white'} // Change color based on like state
            isLogin={isLogin}
            ClickHandler={handleLike}
           
          />
          <LikeCommentShere
            Icon={FaComment}
            title={'Comment'}
            col={isCommented ? 'green' : 'green'} // Change color based on comment state
            isLogin={isLogin}
            ClickHandler={handleComment}
          />
          <LikeCommentShere
            Icon={FaShare}
            title={'Share'}
            col={isShared ? 'blue' : 'blue'} // Change color based on share state
            isLogin={isLogin}
            ClickHandler={handleShare}
          />
        </div>
      </div>

      {CommentVisible && (
        <Comments
          comments={comments}
          onClose={() => setCommentVisible(false)}
          onAddComment={addComment}
          profilePicture = {userData.profilePicture}
        />
      )}

      {isShareModalVisible && (
        <SharePost
          availableUsers={availableUsers}
          onClose={toggleShareModal}
          onShare={shareWithUser}
        />
      )}
    </>
  );
}

export default UserPost;
