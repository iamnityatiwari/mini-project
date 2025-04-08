import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoginUserDataProvider } from './Store/LoginUserDataProvider.jsx'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './components/login/Login';
import Home from './components/Home';
import Signup from './components/signup/signup';
import Network from './components/Network';
import Jobs from './components/Jobs';
import Notifications from './components/Notifications';
import Message from './components/Message';
import YourProfile from './components/YourProfile';
import Test from './components/Test/Test';
import { Error } from './Error.jsx'
import CreatAndShowjob from './components/JobsSection/CreatAndShowJob/CreatAndShowjob.jsx'
import CreateJob from './components/JobsSection/CreatAndShowJob/CreateJob.jsx'
import PastJob from './components/JobsSection/CreatAndShowJob/PastJob.jsx'
import { LoginUserCreatsJobsDataProvider } from './Store/LoginUserCreatsJobsDataProvider.jsx'
import JobDescription from './components/JobsSection/JobDescription.jsx'
import { ConnectionProvide } from './Store/ConnectionProvide.jsx'
import ConnectionDetails from './components/Connections/ConnectionDetails.jsx'
import SaveJob from './components/JobsSection/saveJob/saveJob.jsx'
import AppliedJobs from './components/JobsSection/AppliedJobs/AppliedJobs.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App />,
     errorElement : <Error/>, 
    children : [
      { path: '/', element: <Home /> },
      { path: '/networks', element: <Network /> },
      { path: '/jobs', element: <Jobs /> },
      { path: '/jobDetails', element: <JobDescription /> },
      { path: '/message', element: <Message /> },
      // { path: '/notifications', element: <Notifications /> },
      { path: '/profile', element: <YourProfile/> },
      { path: '/savedJobs', element: <SaveJob/>},
      { path: '/appliedJobs', element: <AppliedJobs/>},
      { path: '/job', element: <CreatAndShowjob/>,
          children :[
             {path: 'createJob',  element: <CreateJob/>},
             {path: 'pastJob', element: <PastJob/>},
          ]
       },
      ]
   },
  
   {path:'/u',
    children:[
      {path:':userid', element: <ConnectionDetails/>}
    ]
   },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/test', element: <Test/> }
]);










createRoot(document.getElementById('root')).render(

  <LoginUserDataProvider>
    <LoginUserCreatsJobsDataProvider>
      <ConnectionProvide>
      {/* <StrictMode> */}
      <RouterProvider router={router} />
      {/* </StrictMode> */}
      </ConnectionProvide>
      </LoginUserCreatsJobsDataProvider>
  </LoginUserDataProvider>

)
