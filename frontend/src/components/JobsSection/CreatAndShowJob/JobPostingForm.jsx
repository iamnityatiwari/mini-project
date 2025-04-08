import React, { useContext, useState } from 'react';
import FormComponents from './FormComponents';
import { CreatedJobData } from '../../../Store/LoginUserCreatsJobsDataProvider';

const JobPostingForm = () => {
  const { handlerStoreData } = useContext(CreatedJobData);

  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    salary: '',
    location: '',
    city: '',
    jobType: '',
    skillsRequired: '',
    experience: '',
    qualification: '',
    postedBy: '',
    deadline: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlerStoreData(formData);
    setFormData({
      companyName: '',
      role: '',
      salary: '',
      location: '',
      city: '',
      jobType: '',
      skillsRequired: '',
      experience: '',
      qualification: '',
      deadline: '',
      description: ''
    });
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-center text-black dark:text-white mb-6">Create Job Posting</h1>
      

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <FormComponents title="Company Name" name="companyName" data={formData.companyName} type="text" handleChange={handleChange} isRequired={true} />
        <FormComponents title="Role" name="role" data={formData.role} type="text" handleChange={handleChange} isRequired={true} />
        <FormComponents title="Salary" name="salary" data={formData.salary} type="number" handleChange={handleChange} isRequired={true} />
        <FormComponents title="Location" name="location" data={formData.location} type="text" handleChange={handleChange} isRequired={true} />
        <FormComponents title="City" name="city" data={formData.city} type="text" handleChange={handleChange} isRequired={true} />

        
        <FormComponents title="Job Type" name="jobType" data={formData.jobType} type="select" handleChange={handleChange} isRequired={true} options={['Full-time', 'Part-time', 'Internship']} />
        
        <FormComponents title="Required Skills (comma separated)" name="skillsRequired" data={formData.skillsRequired} type="text" handleChange={handleChange} isRequired={false} />
        <FormComponents title="Experience" name="experience" data={formData.experience} type="text" handleChange={handleChange} isRequired={false} />

        <FormComponents 
          title="Qualification" 
          name="qualification" 
          data={formData.qualification} 
          type="select" 
          handleChange={handleChange} 
          isRequired={true} 
          options={['Intermediate', 'Undergraduate', 'Postgraduate']} 
        />

        <FormComponents title="Application Deadline" name="deadline" data={formData.deadline} type="date" handleChange={handleChange} isRequired={true} />

        <div className="mb-4">
          <label className="block text-gray-700">Job Description <sub className="text-red-600">*</sub></label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;
