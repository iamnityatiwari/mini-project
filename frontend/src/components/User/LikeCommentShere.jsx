import React from 'react'

const LikeCommentShere = ({Icon, title, col, isLogin, ClickHandler}) => {
  let color = col;
   if(title === 'Like'){
       color = 'text-red-600'
   }else if(title === 'Share'){
       color = 'text-blue-600'
   }else{
        color = 'text-green-600'
   }
  return (
      
        
       <button onClick={ClickHandler} className="flex w-1/3 p-3 justify-center hover:bg-blue-50  dark:hover:bg-slate-900
     ">
          <Icon   className={`hover:${col} hover:scale-150 ${col === 'white'? 'dark:text-slate-100 text-slate-500': `${color}`}`}/>
          {/* <span>{title}</span> */}
        </button>
  )
}

export default LikeCommentShere