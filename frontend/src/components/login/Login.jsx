import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error message

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/"); // Adjust path as needed
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Set specific error message from response
      } else {
        setError("Something went wrong. Please try again."); // Set generic error message
      }
    }
  };

  // Particles initialization function
  const particlesInit = async (main) => {
    await loadFull(main); // Load tsparticles with all available features
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-bl from-blue-500 via-purple-600 to-pink-500 overflow-hidden ">
      <Particles
        id="tsparticles"
        init={particlesInit} // Initialize particles
        options={{
          particles: {
            number: { value: 50 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.2 },
            size: { value: 3, random: true },
            move: { direction: "top", speed: 0.5 },
          },
        }}
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="absolute z-10  bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-tl-[80px] rounded-br-[80px] rounded-bl-[130px] rounded-tr-[130px] shadow-lg p-8 size-96 rotate-45 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <div className="absolute -rotate-[19deg] rounded-tl-[180px] rounded-br-[180px] rounded-bl-[150px] rounded-tr-[150px] z-10  bg-white bg-opacity-20  backdrop-filter backdrop-blur-md  shadow-md p-8 size-96 "></div>
      <div className="relative z-10 p-8 w-80  ">
      
        <div className="flex justify-center -mt-12 mb-4">
          <img src="/src/assets/loginbox3bg.png" alt="Logo" className="size-24 rounded-full bg-gradient-to-r from-purple-600  to-pink-500" />
        </div>
        <h2 className="text-center text-white text-2xl font-semibold mb-6">Welcome, Hero!</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center border-b border-gray-300 py-2 mb-4">
            <input
              type="text"
              placeholder="Enter your username"
              className="bg-transparent w-full text-white placeholder-gray-300 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2 mb-6">
            <input
              type="password"
              placeholder="Enter your password"
              className="bg-transparent w-full text-white placeholder-gray-300 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-2 rounded-full shadow-lg hover:from-purple-700 hover:to-pink-600 transition"
          >
            Assemble
          </button>
        </form>
        {/* Display error message */}
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
        <p className="text-center text-white text-sm mt-6">
          Not part of the Avengers yet? <Link to="/signup" className="text-blue-300">Sign up</Link>
        </p>
      </div>
      
    </div>
  );
}

export default Login;
