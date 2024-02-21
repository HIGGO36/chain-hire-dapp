// utils/signupFormFields.js
import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export const EmailField = ({ handleChange, email }) => (
  <Grid item xs={12}>
    <TextField
      required
      fullWidth
      id="email"
      label="Email Address"
      type="email"
      name="email"
      autoComplete="email"
      value={email}
      onChange={handleChange}
      helperText="Please enter your personal email address"
    />
  </Grid>
);

export const PasswordField = ({ handleChange, password }) => (
  <Grid item xs={12}>
    <TextField
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="new-password"
      value={password}
      onChange={handleChange}
      helperText="Requires a minimum of 6 characters"
    />
  </Grid>
);

export const CompanyNameField = ({ handleChange, companyName }) => (
  <Grid item xs={12}>
    <TextField
      required
      fullWidth
      id="companyName"
      label="Company Name"
      name="companyName"
      value={companyName}
      onChange={handleChange}
      helperText="Please enter your company name"
    />
  </Grid>
);

export const FirstNameField = ({ handleChange, firstName }) => (
  <Grid item xs={12} sm={6}>
    <TextField
      required
      fullWidth
      id="firstName"
      label="First Name"
      name="firstName"
      value={firstName}
      onChange={handleChange}
    />
  </Grid>
);

export const LastNameField = ({ handleChange, lastName }) => (
  <Grid item xs={12} sm={6}>
    <TextField
      required
      fullWidth
      id="lastName"
      label="Last Name"
      name="lastName"
      value={lastName}
      onChange={handleChange}
    />
  </Grid>
);

export const EmployeeIDField = ({ handleChange, employeeID }) => (
  <Grid item xs={12} sm={6}>
    <TextField
      required
      fullWidth
      id="employeeID"
      label="Employee ID"
      name="employeeID"
      value={employeeID}
      onChange={handleChange}
      helperText="Your unique employee ID"
    />
  </Grid>
);

export const PositionTitleField = ({ handleChange, positionTitle }) => (
  <Grid item xs={12} sm={6}>
    <TextField
      required
      fullWidth
      id="positionTitle"
      label="Position Title"
      name="positionTitle"
      value={positionTitle}
      onChange={handleChange}
      helperText="Your position title within the company"
    />
  </Grid>
);

export const BusinessEmailField = ({ handleChange, businessEmail }) => (
  <Grid item xs={12}>
    <TextField
      required
      fullWidth
      id="businessEmail"
      label="Business Email"
      type="email"
      name="businessEmail"
      value={businessEmail}
      onChange={handleChange}
      helperText="Your business email address"
    />
  </Grid>
);

export const BusinessPhoneField = ({ handleChange, businessPhone }) => (
  <Grid item xs={12}>
    <TextField
      required
      fullWidth
      id="businessPhone"
      label="Business Phone"
      type="tel"
      name="businessPhone"
      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      value={businessPhone}
      onChange={handleChange}
      helperText="Your business phone number in format: (123)-456-7890"
    />
  </Grid>
);
