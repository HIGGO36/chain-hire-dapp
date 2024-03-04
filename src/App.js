import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './templates/frontend/Home';
import UsersSignIn from './users/UsersSignIn';
import UserSignUp from './users/UserSignUp';
import JobSeekerDashboard from './users/profile/JobSeekerDashboard';
import EmployerDashboard from './users/profile/EmployerDashboard';
import RecruiterDashboard from './users/profile/RecruiterDashboard';
import JobRoleNFTWallet from './users/profile/JobRoleNFTWallet';


function App() {
  return (
    // If need a context/provider for user state, use it here. 
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<UsersSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/jobseekerdashboard" element={<JobSeekerDashboard />} />
        <Route path="/employerdashboard" element={<EmployerDashboard />} />
        <Route path="/recruiterdashboard" element={<RecruiterDashboard />} />
        <Route path="/JobRoleNFTWallet" element={<JobRoleNFTWallet />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
