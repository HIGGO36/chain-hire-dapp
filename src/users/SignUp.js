import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormSubmission from './hooks/useFormSubmission';
import SignUpForm from './components/SignUpForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

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

    const navigate = useNavigate();
    const { handleSubmit, alertInfo, isSubmitting } = useFormSubmission(navigate); // Destructure isSubmitting from useFormSubmission

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <ThemeProvider theme={DefaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {isSubmitting ? ( // Render loading spinner if isSubmitting is true
                        <CircularProgress />
                    ) : (
                        <SignUpForm 
                            userType={userType} 
                            setUserType={setUserType} 
                            userData={userData} 
                            handleChange={handleChange} 
                            handleSubmit={() => handleSubmit(userData, userType)} // Updated to pass userData and userType
                            alertInfo={alertInfo}
                        />
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}
