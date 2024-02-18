import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './templates/frontend/Home';
import UsersSignIn from './users/UsersSignIn';
import UserSignUp from './users/UserSignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<UsersSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
