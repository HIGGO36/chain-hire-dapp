// components/UserTypeSelection.js
import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const UserTypeSelection = ({ userType, setUserType }) => (
  <FormControl component="fieldset" sx={{ mt: 3 }}>
    <FormLabel component="legend">User Type</FormLabel>
    <RadioGroup
      row
      name="userType"
      value={userType}
      onChange={(e) => setUserType(e.target.value)}
    >
      <FormControlLabel value="Job Seeker" control={<Radio />} label="Job Seeker" />
      <FormControlLabel value="Employer" control={<Radio />} label="Employer" />
      <FormControlLabel value="Recruiter" control={<Radio />} label="Recruiter" />
    </RadioGroup>
  </FormControl>
);

export default UserTypeSelection;
