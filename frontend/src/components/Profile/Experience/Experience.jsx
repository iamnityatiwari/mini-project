import React, { useState, useEffect } from 'react';
import Section from '../Section';
import axios from 'axios';
const Experience = ({userId}) => {
  const [experienceList, setExperienceList] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/exp/${userId}`, { withCredentials: true });
        // Set the fetched skills data in the state
        setExperienceList([...response.data]); // Assuming the response contains skills in `response.data.skills`
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchExperience(); // Call the function to fetch the skills
  }, [userId]);

  const handleAddExperience = () => {


    try {
      // Check if jobTitle and companyName are filled out correctly
      if (formData.jobTitle.trim().length === 0 && formData.companyName.trim().length === 0) {
        throw new Error('You did not fill both Job Title and Company Name');
      } else if (formData.jobTitle.trim().length === 0) {
        throw new Error('You did not fill Job Title');
      } else if (formData.companyName.trim().length === 0) {
        throw new Error('You did not fill Company Name');
      } else if(formData.startDate.length === 0) {
        throw new Error('You  did not fill startDate')
      } else if( formData.endDate.length === 0){
        throw new Error('You did not fill endDate')
      } else if(formData.startDate >formData.endDate){
        throw new Error('You set endDate before startDate')
      }
      
      axios.post(`http://localhost:3000/user/exp/${userId}`, formData ,{withCredentials: true})
      .then(response=>{
        // console.log(response.data);
        setExperienceList([...response.data]);
      })
      .catch(err=>console.log(err));

      // If all validations pass, add experience to the list
      setExperienceList([...experienceList, formData]);
      setFormData({ jobTitle: '', companyName: '', startDate: '', endDate: '' });
      setFormVisible(false);
  
    } catch (error) {
      // Display the specific error message
      alert(error.message);
    }
    
  };

  const handleRemoveExperience = (index) => {
    axios.delete(`http://localhost:3000/user/exp/${userId}/${index}`,{withCredentials: true})
    .then(newExp=>{ 
      // console.log(newExp);
      setExperienceList([...newExp.data]);
      // setSkills((prevSkills) => prevSkills.filter(skill => skill !== skillToRemove));
    })
    .catch(err=>console.log(err))
    setExperienceList(experienceList.filter((_, i) => i !== index));
  };

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <Section title={'Work Experience'} onAddClick={() => setFormVisible(true)}>
      {/* Display list of job entries */}
      {experienceList.map((experience, index) => (
        <div key={index} className="bg-slate-300 shadow-black dark:bg-slate-950 dark:shadow-white p-4 mb-6 mx-3 rounded shadow">
          <p><strong>Job Title:</strong> {capitalizeFirstLetter(experience.jobTitle)}</p>
          <p><strong>Company Name:</strong> {capitalizeFirstLetter(experience.companyName)}</p>
          <p><strong>Start Date:</strong> {new Date(experience.startDate).getFullYear()|| 'No start date'}</p>
          <p><strong>End Date:</strong> {new Date(experience.endDate).getFullYear() || 'Ongoing'}</p>
          <button
            onClick={() => handleRemoveExperience(index)}
            className="mt-2 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Popup form for adding experience */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 dark:text-black">
            <h3 className="text-lg font-semibold mb-4">Add Work Experience</h3>
            <form action='#'>
            <label className="block mb-2">
              <span className="text-gray-700">Job Title</span>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded"
                placeholder="Enter job title"
                required
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Company Name</span>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded"
                placeholder="Enter company name"
                required
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Start Date</span>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded"
                required
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
                required
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
                onClick={handleAddExperience}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
             
            </div>
            </form>
          </div>
        </div>
        
      )}
    </Section>
  );
};

export default Experience;
