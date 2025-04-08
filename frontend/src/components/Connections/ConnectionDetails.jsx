import React, { useEffect, useState } from "react";
import { DarkandLightTheme } from "../../DarkandLightTheme";
import { useParams } from "react-router-dom";
import UserPost from "../User/UserPost";
import axios from "axios";
const ConnectionDetails = () => {

  const params = useParams();
  const username = params.userid;
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // First, fetch user data
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3000/user/profile/${username}`, { withCredentials: true });
        if (!userResponse.data) {
          setNotFound(true);
          return;
        }
        setUser(userResponse.data);

        // If user is found, fetch their posts
        const postsResponse = await axios.get(`http://localhost:3000/post/getUserPosts/${username}`, { withCredentials: true });
        setPosts(postsResponse.data || []);
      } catch (error) {
        setNotFound(true);
      }
    };

    fetchUser();
  }, [username]);

  if (notFound) {
    return <div className="flex text-5xl text-red-600 font-semibold justify-center items-center h-screen">User not found</div>;
  }

  return (
    <>
    <div className="min-h-screen bg-slate-300 dark:bg-slate-950 p-6">
      <div className=" bg-white dark:bg-black p-6 rounded-lg shadow-md max-w-4xl mx-auto space-y-4 dark:shadow-sky-700">
        {/* Cover Picture */}
        <div className="relative top-3 ">
          <img
            src={user.coverPicture}
            alt="Cover"
            className="w-full md:h-60  object-cover rounded-lg shadow-md dark:shadow-md dark:shadow-slate-500"
          />
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center relative md:-top-20 sm:-top-14 -top-12">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="md:size-32 sm:size-28 size-20 rounded-full border-4 border-white dark:border-gray-600 shadow-md"
          />
        </div>

        {/* User Name and Location */}
        <div className="text-center relative md:-top-16 -top-10">
        <h3 className="text-3xl font-semibold text-gray-800 dark:text-purple-600 mb-1">
          {user.name}
        </h3>
          <p className="text-gray-600 dark:text-orange-500 text-sm mb-4">{user.location || "No address given."}</p>
        </div>
      
        {/* Skills Section */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800 dark:text-sky-600">Skills</h4>
          <p className="text-gray-600 text-sm dark:text-white">
            {user.skills && user.skills.length > 0 
              ? user.skills.join(", ") 
              : "N/A"}
          </p>
        </div>

        {/* Experience Section */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800 dark:text-sky-600">Experience</h4>
          <div className="text-gray-600 text-sm dark:text-white">
            {user.experience && user.experience.length > 0 
              ? user.experience.map((exp, index) => (
                  <div key={index} className="mb-2">
                    <p><strong>Job Title:</strong> {exp.jobTitle}</p>
                    <p><strong>Company:</strong> {exp.companyName}</p>
                  </div>
                ))
              : "No experience provided"}
          </div>
        </div>


          {/* Education Section */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800 dark:text-sky-600">Education</h4>
            <div className="text-gray-600 text-sm dark:text-white">
              {user.education && user.education.length > 0 
                ? user.education.map((edu, index) => (
                    <div key={index} className="mb-2">
                      <p><strong>School:</strong> {edu.schoolName}</p>
                    </div>
                  ))
                : "No education info provided"}
            </div>
          </div>


        {/* Projects Section */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800 dark:text-sky-600">Projects</h4>
          <div className="text-gray-600 text-sm dark:text-white">
            {user.projects && user.projects.length > 0 
              ? user.projects.map((project) => (
                  <div key={project._id} className="mb-2">
                    <p><strong>Title:</strong> {project.title}</p>
                    <p><strong>Description:</strong> {project.description}</p>
                  </div>
                ))
              : "No projects listed"}
          </div>
        </div>




        {/* Bio Section */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800  dark:text-sky-600">Bio</h4>
          <p className="text-gray-600 text-sm dark:text-white">{user.bio || "No bio provided."}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6 dark:border-blue-700"></div>

       
      
      </div>
    </div>
    <div className=" bg-slate-300 dark:bg-slate-950 p-6">
      <div className=" bg-white dark:bg-black p-6 rounded-lg shadow-md max-w-4xl mx-auto space-y-6  dark:text-sky-600 dark:shadow-sky-700">
        Post
        {posts.length > 0 ? (
          posts.map(item => (
            <UserPost key={item._id} UserProfile={item} isLogin={true} myconnect={true} />
          ))
        ) : (
          <p className="text-center text-gray-600">No posts available</p>
        )}
      </div>  
    </div>
    <DarkandLightTheme/>
    </>
  );
};

export default ConnectionDetails;
