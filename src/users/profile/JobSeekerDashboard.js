// src/users/profile/JobSeekerDashboard.js
import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth"; 
import { CssBaseline, Box, Container, ThemeProvider, createTheme } from '@mui/material';
import { DashboardAppBar } from './components/DashboardAppBar';
import { DashboardDrawer } from './components/DashboardDrawer';
import DashboardPaper from './components/DashboardPaper';
import UserProfileBox from './components/UserProfileBox';
import JobSeekerPortal from './components/JobSeekerPortal';
import Copyright from '../components/Copyright';
import ScrollingBar from './components/ScrollingBar'; 

const defaultTheme = createTheme();

export default function JobSeekerDashboard() {
  const [open, setOpen] = useState(true);
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);

  // Correctly defined toggle functions
  const toggleDrawerOpen = () => setOpen(true);
  const toggleDrawerClose = () => setOpen(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(true);
        const response = await fetch('http://localhost:3001/api/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Failed to fetch user profile');
          return;
        }

        const data = await response.json();
        setUserData(data);
      }
    };

    fetchUserProfile().catch(console.error);
  }, []);

  const handleSave = async (editedData) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      const response = await fetch('http://localhost:3001/api/users/profile', { // Adjust this endpoint as needed
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }

      // Update local state with saved data
      setUserData(editedData);
      setEditMode(false); // Exit edit mode
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

    // Define inline styles for UserProfileBox
  const userProfileBoxStyle = {
    display: 'flex',
    flexDirection: 'row', 
    minWidth: '100%', 
  };

return (
<ThemeProvider theme={defaultTheme}>
<Box sx={{ display: 'flex' }}>
<CssBaseline />
<DashboardAppBar open={open} handleDrawerOpen={toggleDrawerOpen} />
<DashboardDrawer open={open} handleDrawerClose={toggleDrawerClose} />
<Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto',
backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],}} >
<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
{/* Use DashboardPaper component */}
<DashboardPaper>
<ScrollingBar userData={userData} /> {/* Add the ScrollingBar component here */}
{/* <OvalPortal onConnect={handleConnect} userType={userType} portalStyle={{ display: 'flex', justifyContent: 'center', marginTop: '20px', minHeight: '420px' }} /> */}
<JobSeekerPortal portalStyle={{ display: 'flex', justifyContent: 'center', marginTop: '20px', minHeight: '420px' }} />
<UserProfileBox
userData={userData}
onSave={handleSave}
onCancel={handleCancel}
editMode={editMode}
setEditMode={setEditMode}
style={userProfileBoxStyle}/>
<Copyright sx={{ pt: 4 }} />
</DashboardPaper>
</Container>
</Box>
</Box>
</ThemeProvider>
);
}