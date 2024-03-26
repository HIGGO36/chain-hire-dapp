import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './../src/contexts/UserContext';
import Home from './templates/frontend/Home';
import UsersSignIn from './users/UsersSignIn';
import UserSignUp from './users/UserSignUp';
import JobSeekerDashboard from './users/profile/JobSeekerDashboard';
import EmployerDashboard from './users/profile/EmployerDashboard';
import RecruiterDashboard from './users/profile/RecruiterDashboard';
import WalletDashboard from './users/profile/WalletDashboard';
import MarketplaceDashboard from './users/profile/MarketplaceDashboard';


function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<UsersSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/jobseekerdashboard" element={<JobSeekerDashboard />} />
        <Route path="/employerdashboard" element={<EmployerDashboard />} />
        <Route path="/recruiterdashboard" element={<RecruiterDashboard />} />
        <Route path="/WalletDashboard" element={<WalletDashboard />} />
        <Route path="/MarketplaceDashboard" element={<MarketplaceDashboard />} />
        {/* Add other routes as needed */}
      </Routes>
      </Router>
      </UserProvider>
  );
}

export default App;
