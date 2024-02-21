// src/users/profile/components/SignOutButton.js
import React from 'react';
import { IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../hooks/useFirebaseAuth';

const SignOutButton = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <IconButton color="inherit" onClick={handleSignOut}>
      <ExitToAppIcon />
    </IconButton>
  );
};

export default SignOutButton;
