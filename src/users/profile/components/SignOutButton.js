// src/users/profile/components/SignOutButton.js
import React from 'react';
import { IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {

      // Make an API call to the server to handle sign-out
      await fetch('http://localhost:3001/api/users/signout', {

      // await fetch('https://young-ravine-47125-71f43e0f6395.herokuapp.com/api/users/signout', {
          
            //  await fetch('/api/users/signout', {
        method: 'POST', // Assuming you're using a POST request for sign-out
        // Include credentials if your endpoint requires authentication
        credentials: 'include', 
      });
      // Navigate to sign-in page upon successful sign-out
      navigate('/signin');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <IconButton color="inherit" onClick={handleSignOut}>
      <ExitToAppIcon />
    </IconButton>
  );
};

export default SignOutButton;
