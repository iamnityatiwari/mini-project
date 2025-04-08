/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Section from '../Section';
import axios from 'axios';


const Education = ({userId}) => {

  const [educationList, setEducationList] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/e/${userId}`, { withCredentials: true });
        // Set the fetched skills data in the state
        setEducationList([...response.data]); // Assuming the response contains skills in `response.data.skills`
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchEducation(); // Call the function to fetch the skills
  }, [userId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddEducation = () => {
    try{
      
      // console.log( formData.schoolName.length)
      if (formData.schoolName.trim().length === 0) {
        throw new Error('School name is required.');
      }else if(formData.startDate.length === 0){
        throw new Error('you did not fill start date')
      }else if(formData.endDate.length === 0){
        throw new Error('You did not fill end date');
      } 
        // console.log(formData);
      axios.post(`http://localhost:3000/user/e/${userId}`, formData ,{withCredentials: true})
      .then(response=>{
        // console.log(response.data);
        setEducationList([...response.data]);
      })
      .catch(err=>console.log(err));
      // setEducationList([...educationList, formData]);
      setFormData({ schoolName: '', startDate: '', endDate: '' });
      setFormVisible(false);       
        
    }catch(error){
      alert(error.message)
    }
    
  };

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const handleRemoveEducation = (index) => {
    axios.delete(`http://localhost:3000/user/e/${userId}/${index}`,{withCredentials: true})
    .then(newEdu=>{ 
      // console.log(newEdu);
      setEducationList([...newEdu.data]);
      // setSkills((prevSkills) => prevSkills.filter(skill => skill !== skillToRemove));
    })
    .catch(err=>console.log(err))
    // setEducationList(educationList.filter((_, i) => i !== index));
  };

  return (
    <Section title={'Education'} onAddClick={() => setFormVisible(true)}>
      {/* Display list of education entries */}
      {educationList.map((education, index) => (
        <div key={index} className="bg-slate-300 shadow-black dark:bg-slate-950  dark:shadow-white p-4 mb-6 rounded shadow mx-3"> {/* Increased mb-4 to mb-6 */}
          <p><strong>School Name:</strong> {capitalizeFirstLetter(education.schoolName)}</p>
          <p><strong>Start Year:</strong> {new Date(education.startDate).getFullYear()}</p>
          <p><strong>End Year:</strong> {new Date(education.endDate).getFullYear()}</p>
          <button
            onClick={() => handleRemoveEducation(index)}
            className="mt-2 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}

    
     

      {/* Popup form for adding education */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:text-black p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Add Education</h3>
            <label className="block mb-2">
              <span className="text-gray-700">School Name</span>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded"
                placeholder="Enter school name"
             required />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Start Date</span>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">End Date</span>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded"
              />
            </label>
            <div className="flex justify-end">
              <button
                onClick={() => setFormVisible(false)}
                className="text-gray-600 mr-4"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEducation}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Education;
