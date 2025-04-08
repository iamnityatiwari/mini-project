import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const Section = (props) => {
  return (
    <div className="max-w-2xl md:mx-auto my-4 mx-2 p-6 bg-white text-black dark:bg-black dark:text-white  shadow-lg shadow-sky-700 rounded-lg relative top-20 ">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center bg-slate-400 py-2 rounded-xl">
        {props.title}
      </h2>

      <div className={`flex flex-wrap transition-all duration-100 mb-12`}>
        {props.children}
      </div>

      {/* Add Icon Button in Bottom Right Corner */}
      <div className="absolute bottom-4 right-4 z-10">
        <button
          onClick={props.onAddClick} // Trigger the add functionality
          className="rounded-full p-2 text-xl font-semibold bg-green-500 hover:bg-green-600 text-white dark:text-black"
        >
          <IoIosAddCircleOutline size={40}/>
        </button>
      </div>
    </div>
  );
};

export default Section;
