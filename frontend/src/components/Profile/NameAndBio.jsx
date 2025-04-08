import React from 'react'

const NameAndBio = ({name, bio }) => {
  return (
   
           <div className="text-center mt-10">

          <p className="text-3xl   md:text-4xl font-bold text-gray-600 dark:text-orange-600 mt-2 capitalize">{name}</p>
       
          <p className="text-sm text-gray-600  dark:text-orange-400 capitalize ">{bio}</p>
      

      
           </div>

  )
}

export default NameAndBio