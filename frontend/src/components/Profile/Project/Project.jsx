import React, { useState,useEffect } from 'react';
import { IoIosAddCircleOutline, IoIosTrash } from "react-icons/io";
import Section from "../Section";
import axios from 'axios';

const Project = ({userId}) => {
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', tags: '' });
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const addProject = () => {
    if (newProject.title && newProject.description) {
      const newProjectWithFile = { ...newProject};
      axios.post(`http://localhost:3000/user/addProject`, newProjectWithFile, {withCredentials: true})
      .then(result=>{
        // console.log("fuckup", result);
        setProjects(result.data);
        setAllProjects(result.data);
        setNewProject({ title: '', description: '', tags: '' });
        setFile(null);
        setShowForm(false);
      })
      .catch(err=>console.log(err));
    }
  };

  useEffect(()=>{
    // console.log("in the useEffect");
    axios.get(`http://localhost:3000/user/getProject`, {withCredentials: true})
    .then(result=>{
      // console.log("this is project", result);
      setAllProjects(result.data);
      // console.log(allProjects);
    })
    .catch(err=>console.log(err));
  },[]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const deleteProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <Section title="Project" onAddClick={toggleForm}>
      <div className="py-8 px-4 relative">
        {/* Display Projects */}
        {allProjects.map((project, index) => (
          <div key={index} className="flex flex-col dark:bg-slate-950 rounded-lg  bg-slate-200 shadow shadow-black dark:shadow-white">
            

              {/* Left Side - Image or Video */}
              {/* <div className="flex flex-col items-center md:items-end md:w-1/2">
                <div className="border border-gray-700 rounded-lg overflow-hidden w-full md:w-3/4">
                  {project.file && project.file.type.startsWith('video') ? (
                    <video controls src={URL.createObjectURL(project.file)} className="w-full" />
                  ) : (
                    <img src={URL.createObjectURL(project.file)} alt={`${project.title} screenshot`} className="w-full" />
                  )}
                </div>
                </div> */}

           
            
                {/* Right Side - Description */}
                <div className="space-y-4 ">
                  <div className="text-xl p-2 px-4 font-semibold text-purple-500 flex justify-center items-center">{project.title}</div>
                  <p className="text-md flex justify-center flex-wrap ">{project.description}</p>
                  <div className="flex flex-wrap gap-2 m-4">
                    {/* {console.log(project.tags)} */}
                    {project.tags.split(',').map((tag, i) => (
                      
                      tag.length>0 &&  <span key={i} className="bg-sky-700 opacity-75 px-2.5 py-0.5 m-2 rounded-full text-sm">{`${tag.trim()}`}</span> 
                    
                    ))}
                  </div>
                </div>

                {/* Delete Icon */}
                <button
                  onClick={() => deleteProject(index)}
                  className=" p-2  text-red-400 hover:text-red-500"
                > Remove
                  {/* <IoIosTrash size={20} color='blue' /> */}
                </button>
          </div>
        ))}

        {/* Popup form for adding project */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-gray-800">
              <h2 className="text-2xl font-bold mb-4 text-center">Add a New Project</h2>
              <input
                type="text"
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full p-2 mb-4 rounded border border-gray-300 text-gray-800"
              />
              <textarea
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full p-2 mb-4 rounded border border-gray-300 text-gray-800"
              />
              <input
                type="text"
                placeholder="Project Tags (comma-separated)"
                value={newProject.tags}
                onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                className="w-full p-2 mb-4 rounded border border-gray-300 text-gray-800"
              />
              {/* <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="w-full p-2 mb-4 text-gray-800"
              /> */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={addProject}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Project;
