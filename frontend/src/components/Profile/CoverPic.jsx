import React from 'react'

const CoverPic = ({coverPicture,handleImageChange,editField,setEditField}) => {

  
  return (
     <> 
        
             <img
        src={coverPicture}
        alt="Cover"
        className="h-full w-full  object-center object-cover"
      />
       
     </>
  )
}

export default CoverPic