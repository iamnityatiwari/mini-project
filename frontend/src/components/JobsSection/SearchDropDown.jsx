import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline, IoIosArrowDown } from "react-icons/io";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { jobTitles, companies, states, roles } from './CreatAndShowJob/data';

const SearchDropDown = ({ username, handleJobFilterClick }) => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    // Job title, company, and role states
    const [selectedJobTitle, setSelectedJobTitle] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    // Location states
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [locations, setLocations] = useState([]);

    // Handlers for job dropdowns
    const handleJobTitleChange = (e) => setSelectedJobTitle(e.target.value);
    const handleCompanyChange = (e) => setSelectedCompany(e.target.value);
    const handleRoleChange = (e) => setSelectedRole(e.target.value);

    // Handlers for location dropdowns
    const handleCountryChange = (e) => {
        const country = e.target.value;
        setSelectedCountry(country);
        setSelectedState('');
        setSelectedCity('');
        setLocations([]);
    };

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setSelectedCity('');
        setLocations(states[selectedCountry][state] || []);
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const formData = {
        selectedCompany,
        selectedCountry,
        selectedJobTitle,
        selectedRole,
        selectedState,
        selectedCity, // Include selected city in the form data
    };

    const onFilterClick = () => {
        handleJobFilterClick(formData);
    };

    return (
        <>
            <button 
                onClick={toggleMobileMenu} 
                className="text-gray-800 dark:text-white text-xl flex items-center justify-between sm:w-2/3 w-full m-auto bg-slate-50 dark:bg-gray-900 p-4 md:hidden shadow-lg z-50"
            >   
                <h1 className="text-xl font-semibold dark:text-white">Job Filter</h1>
                <IoIosArrowDown />
            </button>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 sm:w-2/3 m-auto sm:h-2/3 bg-slate-50 dark:bg-gray-900 p-6 z-50 overflow-y-auto transition-opacity duration-300 ease-in-out top-20">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
                    >
                        Close
                    </button>

                    <div className="space-y-4">
                        <div className="space-y-3">
                            <select 
                                id="country" 
                                value={selectedCountry} 
                                onChange={handleCountryChange} 
                                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Select a country</option>
                                <option value="usa">United States</option>
                                <option value="india">India</option>
                                <option value="germany">Germany</option>
                                <option value="japan">Japan</option>
                                <option value="uk">United Kingdom</option>
                                <option value="australia">Australia</option>
                            </select>

                            <select 
                                id="state" 
                                value={selectedState} 
                                onChange={handleStateChange} 
                                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                                disabled={!selectedCountry}
                            >
                                <option value="">Select a state</option>
                                {selectedCountry && Object.keys(states[selectedCountry]).map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>

                            <select 
                                id="city" 
                                value={selectedCity} 
                                onChange={handleCityChange} 
                                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                                disabled={!selectedState}
                            >
                                <option value="">Select a city</option>
                                {locations.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <select 
                                id="jobTitle" 
                                value={selectedJobTitle} 
                                onChange={handleJobTitleChange} 
                                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Select a job title</option>
                                {jobTitles.map(title => (
                                    <option key={title} value={title}>{title}</option>
                                ))}
                            </select>

                            <select 
                                id="company" 
                                value={selectedCompany} 
                                onChange={handleCompanyChange} 
                                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Select a company</option>
                                {companies.map(company => (
                                    <option key={company} value={company}>{company}</option>
                                ))}
                            </select>

                            <select 
                                id="role" 
                                value={selectedRole} 
                                onChange={handleRoleChange} 
                                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Select a role</option>
                                {roles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>

                        <button onClick={onFilterClick} className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Filter
                        </button>
                    </div>
                </div>
            )}

            <div data-aos="fade-in" data-aos-delay="500" className="md:flex flex-col absolute hidden space-y-3 text-center">
                <div className='p-4 bg-slate-50 dark:bg-black dark:text-black rounded-lg cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white space-y-3'>
                    <select 
                        id="country" 
                        value={selectedCountry} 
                        onChange={handleCountryChange} 
                        className="block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select a country</option>
                        <option value="usa">United States</option>
                        <option value="india">India</option>
                        <option value="germany">Germany</option>
                        <option value="japan">Japan</option>
                        <option value="uk">United Kingdom</option>
                        <option value="australia">Australia</option>
                    </select>
                    <select 
                        id="state" 
                        value={selectedState} 
                        onChange={handleStateChange} 
                        className="block w-full p-2 border border-gray-300 rounded"
                        disabled={!selectedCountry}
                    >
                        <option value="">Select a state</option>
                        {selectedCountry && Object.keys(states[selectedCountry]).map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    <select 
                        id="city" 
                        value={selectedCity} 
                        onChange={handleCityChange} 
                        className="block w-full p-2 border border-gray-300 rounded"
                        disabled={!selectedState}
                    >
                        <option value="">Select a city</option>
                        {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div className='p-4 bg-slate-50 dark:bg-black dark:text-black rounded-lg cursor-pointer shadow-md shadow-black dark:shadow-md dark:shadow-white space-y-3'>
                    <select 
                        id="jobTitle" 
                        value={selectedJobTitle} 
                        onChange={handleJobTitleChange} 
                        className="block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select a job title</option>
                        {jobTitles.map(title => (
                            <option key={title} value={title}>{title}</option>
                        ))}
                    </select>
                    <select 
                        id="company" 
                        value={selectedCompany} 
                        onChange={handleCompanyChange} 
                        className="block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select a company</option>
                        {companies.map(company => (
                            <option key={company} value={company}>{company}</option>
                        ))}
                    </select>
                    <select 
                        id="role" 
                        value={selectedRole} 
                        onChange={handleRoleChange} 
                        className="block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select a role</option>
                        {roles.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>

                <button onClick={onFilterClick} className="block w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Filter
                </button>
            </div>
        </>
    );
};

export default SearchDropDown;
