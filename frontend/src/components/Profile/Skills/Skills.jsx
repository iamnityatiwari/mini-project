import React, { useState, useEffect } from 'react';
import Section from '../Section';
import AddSkills from './AddSkills';
import Modal from './Modal'; // Import the Modal component
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from 'axios';

const Skills = ({userId}) => {

  const [skills, setSkills] = useState(['React']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/skills/${userId}`, { withCredentials: true });
        // Set the fetched skills data in the state
        setSkills([...response.data]); // Assuming the response contains skills in `response.data.skills`
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills(); // Call the function to fetch the skills
  }, [userId]); 

  const addSkillHandler = (newSkill) => {
    axios.get(`http://localhost:3000/user/${userId}/${newSkill}`,{withCredentials: true})
    .then(newSkills=>{ 
      // console.log(typeof(newSkills));
      // console.log(newSkills);
      setSkills([...newSkills.data]);
      // setSkills((prevSkills) => prevSkills.filter(skill => skill !== skillToRemove));
    })
    .catch(err=>console.log(err))
    // setSkills((prevSkills) => [...prevSkills, newSkill]);
  };  

  const removeSkillHandler = (skillToRemove) => {
    axios.delete(`http://localhost:3000/user/${userId}/${skillToRemove}`,{withCredentials: true})
    .then(newSkills=>{ 
      // console.log(newSkills);
      setSkills([...newSkills.data]);
      // setSkills((prevSkills) => prevSkills.filter(skill => skill !== skillToRemove));
    })
    .catch(err=>console.log(err))
  };
 
  return (
    <>
      <Section title='Skills' onAddClick={() => setIsModalOpen(true)}>

        {/* Render skills */}
        <div className=" flex flex-wrap"> {/* Added spacing between skills */}
          {skills.map((skill) => (
            <AddSkills
              key={skill}
              title={skill}
              removeHandler={() => removeSkillHandler(skill)}
            />
          ))}
        </div>

        {/* Modal for adding new skill */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAddSkill={addSkillHandler} 
          skills = {skills}
        />
      </Section>

    </>
  );
};

export default Skills;
