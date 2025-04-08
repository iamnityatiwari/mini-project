import React from 'react'
import TextToggle from './TextToggle'

const ContentSection = ({img,desc}) => {
  return (
    <>
      <TextToggle desc={desc}/>


      <div className="flex justify-center items-center  dark:bg-black bg-white text-gray-600 text-center">
      <div className="flex flex-wrap">
  {img && img.length > 0 ? (
    img.map((image, index) => (
      <img 
        key={index}
        src={image} 
        alt={`image-${index}`} 
        className="bg-center bg-cover bg-no-repeat max-h-80 m-2" 
      />
    ))
  ) : (
    <p>No images available</p> // Display this if no images are available
  )}
</div>


          
        </div>
    </>
   
  )
}

export default ContentSection