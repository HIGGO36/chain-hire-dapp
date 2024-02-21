import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './users/hooks/useFirebaseAuth';
import Home from './templates/frontend/Home';
import UsersSignIn from './users/UsersSignIn';
import UserSignUp from './users/UserSignUp';
import Dashboard from './users/profile/Dashboard';

function App() {
  return (
    <AuthProvider> {/* Wrap the Router with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<UsersSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
