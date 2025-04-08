import React from 'react'
import { CiCircleRemove } from "react-icons/ci";
const AddSkills = ({title,removeHandler}) => {
  return (
    <div className='space-y-2'>
                    <span className="btn-primary inline-flex items-center ml-2 mb-2 capitalize">
                        {title}
                        <button onClick={removeHandler}> 
                        <CiCircleRemove className="ml-1 relative left-3 "  size={24} />
                        </button>
                    </span>
                    
                    
    </div>
  )
}

export default AddSkills