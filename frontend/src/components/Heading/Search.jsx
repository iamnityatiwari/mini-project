import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const Search = (props) =>{
     const navigate = useNavigate();
     const handle = (e)=>{
          // e.preventDefault();
          // console.log(props.searchQuery)
          if(props.searchQuery.length>0)
          navigate(`/u/${props.searchQuery}`)
          else if(props.searchQuery.length === 0){
            alert('Enter the username');
          }
     }
    {/* Search Bar */}
   return <>
       <input
      type="text"
      placeholder="Search Users..."
      value={props.searchQuery}
      onChange={props.handleSearchChange}
      className="w-full py-2 px-4 border border-gray-300 text-black rounded-l-md focus:outline-none focus:ring focus:border-blue-300 ml-10"
    />
    <button onClick={handle}
      type="submit"
      className="py-2  px-4 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none"
    > 
      <CiSearch size={26}/>
    </button>
   </>
   
  
}

export default Search;