import React, { useEffect } from 'react';


const ProfileIcon = ({ imageUrl, userName }) => {

  
    const [imageLoaded, setImageLoaded] = React.useState(true);

    const handleError = () => {
        setImageLoaded(false); // Set to false if image fails to load
    };
  
    
   
    return (
        <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-blue-950 text-white font-bold text-3xl`} >
            {imageLoaded && imageUrl ? (
                <img
                    src={imageUrl}
                    alt={userName}
                    className="w-full h-full rounded-full object-cover"
                    onError={handleError} // If image fails to load, hide it and show initial
                />
            ) : (
                <span>{userName.charAt(0).toUpperCase()}</span> // Show first character of username
                
            )}
        </div>
    );
};

export default ProfileIcon;


