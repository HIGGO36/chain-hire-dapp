import React, { useState } from 'react';
import useFormSubmission from './hooks/useFormSubmission';
import SignUpForm from './components/SignUpForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const DefaultTheme = createTheme();

export default function SignUp() {
  const [userType, setUserType] = useState('Job Seeker');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    companyName: '',
    firstName: '',
    lastName: '',
    employeeID: '',
    positionTitle: '',
    businessEmail: '',
    businessPhone: '',
  });

  const { handleSubmit, alertInfo } = useFormSubmission();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <ThemeProvider theme={DefaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SignUpForm 
            userType={userType} 
            setUserType={setUserType} 
            userData={userData} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            alertInfo={alertInfo} 
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
