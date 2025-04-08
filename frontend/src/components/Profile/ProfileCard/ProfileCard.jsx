/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './ProfileCard.module.css'


const ProfileCard = ({ profileImage, coverImage, name, description, isLogin }) => {
  
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isOverlayVisibleCover, setOverlayVisibleCover] = useState(false);

  function handleCoverButtonClick() {
    setOverlayVisibleCover(true);
  }

  function handleOverlayButtonCover() {
    setOverlayVisibleCover(false);
  }

  function handleButtonClick() {
    setOverlayVisible(true);
  }

  const handleOverlayClick = () => {
    setOverlayVisible(false);
  };

  return (
    <div className={`${styles.profileContainer}  md:mx-0 mx-4 dark:bg-black shadow shadow-blue-500`}>
      <div className={`${styles.profileCard} `}>
        <img
          className={`${styles.coverPhoto} bg-gray-400 shadow shadow-blue-500`}
          src={coverImage}
          alt="Cover"
          onClick={handleCoverButtonClick}
        />
        <img
          className={`${styles.profilePhoto} bg-gray-500 shadow shadow-blue-500 ring-2 ring-offset-2 `}
          src={profileImage}
          alt="Profile"
          onClick={handleButtonClick}
        />
      </div>

      {isLogin ?(
         <div className={`${styles.bioSection} dark:bg-slate-950 shadow shadow-blue-500`}>
         <ul>
           <li className="text-center text-2xl font-semibold">
             <h2 className='dark:text-white'>{name}</h2>
           </li>
           <li className="text-center font-semibold dark:text-white">
  {description.length > 40 ? `${description.slice(0, 40)}...` : description}
</li>

         </ul>
       </div>
      ): (
       <button className="mt-5 flex flex-col space-y-2">
          <a href="/login" className="px-5 p-1 text-center  text-xl  text-white box-content rounded-full relative  bg-green-500 hover:bg-green-600  left-1">  {/*-top-1 left-7  */}
              Login
          </a>
          <a href="/signup" className=' bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-l hover:from-sky-600 hover:to-indigo-600 px-6 text-center p-1 border-b-2 text-xl rounded-full text-white relative box-content right-2'>
             Signup     
          </a>
        </button>

      
      ) }
     

      {isOverlayVisible && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <img className={styles.fullScreenImage} src={profileImage} alt="Full Screen" />
        </div>
      )}

      {isOverlayVisibleCover && (
        <div className={styles.overlay} onClick={handleOverlayButtonCover}>
          <img className={styles.fullScreenImage} src={coverImage} alt="Full Screen" />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
