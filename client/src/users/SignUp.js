import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from './access/firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { verifyBusinessEmail } from '../utils/verifyBusinessEmail';


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
  const [alertInfo, setAlertInfo] = useState({ message: '', severity: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };


const handleSubmit = async (event) => {
  event.preventDefault();

  // Reset previous alerts
  setAlertInfo({ message: '', severity: 'info' });

  let errorMessage = [];
  // Validate personal email
  if (!validateEmail(userData.email)) {
    errorMessage.push('a valid personal email address');
  }

  // Validate phone based on userType and add specific format instruction if invalid
  if (userType !== 'Job Seeker' && !validatePhone(userData.businessPhone)) {
    errorMessage.push('a valid phone number in the format 123-456-7890');
  }

  // Attempt to verify the business email for Employer and Recruiter, if applicable
  if (userType === 'Employer' || userType === 'Recruiter') {
    try {
      const verificationResult = await verifyBusinessEmail(userData.businessEmail);
      if (!verificationResult.success) {
        errorMessage.push(verificationResult.message);
      }
    } catch (error) {
      console.error("Error verifying business email:", error);
      errorMessage.push('Failed to verify business email. Please try again.');
    }
  }

  // If there are any validation or verification errors, show them and stop the form submission
  if (errorMessage.length > 0) {
    setAlertInfo({
      message: `Please correct the following: ${errorMessage.join(', ')}.`,
      severity: 'error',
    });
    return;
  }

  // Proceed with user creation process if validations and verifications pass
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const user = userCredential.user;

    let collectionName = '';
    switch (userType) {
      case 'Employer':
        collectionName = 'employers';
        break;
      case 'Recruiter':
        collectionName = 'recruiters';
        break;
      default:
        collectionName = 'jobseekers';
    }

    await addDoc(collection(db, collectionName), {
      ...userData,
      uid: user.uid,
      createdAt: new Date(),
    });

    setAlertInfo({
      message: `Welcome aboard Chain Hire platform as a ${userType}, you are now successfully signed up!`,
      severity: 'success',
    });
  } catch (error) {
    console.error("Error signing up:", error);
    setAlertInfo({
      message: error.message,
      severity: 'error',
    });
  }
};


// Correct email regex pattern
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Function to check if the email is valid
function validateEmail(email) {
  return emailPattern.test(email);
}

// Utility function to validate phone number (US format)
function validatePhone(phone) {
  const re = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  return re.test(String(phone));
}

  const renderUserTypeFields = () => {
    switch (userType) {
      case 'Employer':
      case 'Recruiter':
        return (
          <>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="companyName"
                label="Company Name"
                value={userData.companyName}
                onChange={handleChange}
                helperText="Microsoft"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="firstName"
                label="First Name"
                value={userData.firstName}
                onChange={handleChange}
                helperText="Sarah"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="lastName"
                label="Last Name"
                value={userData.lastName}
                onChange={handleChange}
                helperText="Smith"
              />
            </Grid>
                 <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="employeeID"
                label="Employee ID"
                value={userData.employeeID}
                onChange={handleChange}
                helperText="1234567"
              />
            </Grid>
             <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="positionTitle"
                label="Position Title"
                value={userData.positionTitle}
                onChange={handleChange}
                helperText="HR Manager"
              />
            </Grid>
             <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Business Email"
                name="businessEmail"
                type="email"
                value={userData.businessEmail}
                onChange={handleChange}
                helperText="sarahsmith@microsoft.com"
              />
            </Grid>
             <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="businessPhone"
                label="Business Phone"
                name="businessPhone"
                type="tel"
                inputProps={{ 
                pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" // Example pattern for US phone numbers: 123-456-7890
                }}
                value={userData.businessPhone}
                onChange={handleChange}
                helperText="Format: 123-456-7890"
              /> 
            </Grid>
          </>
        );
      case 'Job Seeker':
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={DefaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: "100px", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign up</Typography>
          <FormControl component="fieldset" sx={{ mt: 3 }}>
            <FormLabel component="legend">User Type</FormLabel>
            <RadioGroup row name="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
              <FormControlLabel value="Job Seeker" control={<Radio />} label="Job Seeker" />
         
              <FormControlLabel value="Employer" control={<Radio />} label="Employer" />
              <FormControlLabel value="Recruiter" control={<Radio />} label="Recruiter" />
            </RadioGroup>
          </FormControl>
          {alertInfo.message && (
            <Alert severity={alertInfo.severity} sx={{ width: '100%', mt: 2 }}>
              {alertInfo.message}
            </Alert>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={userData.email}
                  onChange={handleChange}
                  helperText="mickeymouse@gmail.com"
                />             
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </Grid>
              {renderUserTypeFields()}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
