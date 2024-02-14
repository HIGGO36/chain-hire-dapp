import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

const defaultTheme = createTheme();

export default function SignUp({ onSignUpSuccess }) {
  const [alertInfo, setAlertInfo] = useState({ message: '', severity: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setAlertInfo({ message: 'Account successfully created!', severity: 'success' });
      console.log("Sign up successful!"); // Log sign up success
      // Call the onSignUpSuccess prop function to notify App.js of successful sign-up
      onSignUpSuccess();
    } catch (error) {
      console.error("Error signing up:", error);
      setAlertInfo({ message: error.message, severity: 'error' });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
          <Typography component="h1" variant="h5">Sign up</Typography>
          {alertInfo.message && (<Alert severity={alertInfo.severity} sx={{ width: '100%', mt: 2 }}>{alertInfo.message}</Alert>)}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {/* Your form fields */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
