// components/SignUpForm.js
import React from 'react';
import { EmailField, PasswordField, CompanyNameField, FirstNameField, LastNameField, EmployeeIDField, PositionTitleField, BusinessEmailField, BusinessPhoneField } from '../utils/signupFormFields'; 
import UserTypeSelection from './UserTypeSelection';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const SignUpForm = ({ userType, setUserType, userData, handleChange, handleSubmit, alertInfo }) => (
  <>
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">Sign up</Typography>
    <UserTypeSelection userType={userType} setUserType={setUserType} />
    {alertInfo.message && (
      <Alert severity={alertInfo.severity} sx={{ width: '100%', mt: 2 }}>
        {alertInfo.message}
      </Alert>
    )}
    <Box component="form" noValidate onSubmit={e => e.preventDefault()} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <EmailField email={userData.email} handleChange={handleChange} />
        <PasswordField password={userData.password} handleChange={handleChange} />
        {userType !== 'Job Seeker' && (
          <>
            <CompanyNameField companyName={userData.companyName} handleChange={handleChange} />
            <FirstNameField firstName={userData.firstName} handleChange={handleChange} />
            <LastNameField lastName={userData.lastName} handleChange={handleChange} />
            <EmployeeIDField employeeID={userData.employeeID} handleChange={handleChange} />
            <PositionTitleField positionTitle={userData.positionTitle} handleChange={handleChange} />
            <BusinessEmailField businessEmail={userData.businessEmail} handleChange={handleChange} />
            <BusinessPhoneField businessPhone={userData.businessPhone} handleChange={handleChange} />
          </>
        )}
      </Grid>
      <Button type="submit" fullWidth variant="contained" onClick={() => handleSubmit(userData, userType)} sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  </>
);

export default SignUpForm;
