import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    gender: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/auth/signup", formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  function capitalizeFirstLetter(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-bl from-blue-500 via-purple-600 to-pink-500  overflow-hidden">
      <div className="absolute z-10 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-tl-[80px] rounded-br-[80px] rounded-bl-[130px] rounded-tr-[130px] shadow-lg p-8 rotate-45 bg-gradient-to-r from-blue-500 to-pink-500 size-[500px]"></div>
      <div className="absolute -rotate-12 rounded-tl-[150px] rounded-br-[150px] rounded-bl-[130px] rounded-tr-[130px] z-10 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg size-[480px] shadow-md p-8 "></div>
      <div className="relative z-10 p-8 w-96">
        <div className="flex justify-center mb-4">
          <img src="/src/assets/loginbox3bg.png" alt="Avengers Logo" className="size-28 rounded-full bg-gradient-to-r from-purple-600 to-pink-500" />
        </div>
        <h2 className="text-center text-white text-2xl font-semibold mb-6">Join the Avengers!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={capitalizeFirstLetter(formData.name)}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-white mb-1">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-white mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-white mb-1">Gender</label>
            <div className="flex space-x-4">
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Male
              </label>
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-2 rounded-full shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200"
          >
            Sign Up
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
        <p className="text-center text-white text-sm mt-6">
          Already part of the Avengers? <Link to="/login" className="text-blue-300">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
