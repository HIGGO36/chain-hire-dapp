// src/users/profile/EmployerDashboard.js
import React, { useState, useEffect } from 'react';
import { CssBaseline, Box, Container, Grid, ThemeProvider, createTheme, Paper } from '@mui/material';
import { DashboardAppBar } from './components/DashboardAppBar';
import { DashboardDrawer } from './components/DashboardDrawer';
import Chart from '../components/Chart';
import Deposits from '../components/Deposits';
import Orders from '../components/Orders';
import Copyright from '../components/Copyright';
import UserProfileBox from './components/UserProfileBox';
import { getAuth } from "firebase/auth"; 

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [userData, setUserData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [editMode, setEditMode] = useState(false);

  const toggleDrawerOpen = () => setOpen(true);
  const toggleDrawerClose = () => setOpen(false);

  useEffect(() => {
    
  const fetchUserProfile = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      const response = await fetch('http://localhost:3001/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      // Assuming the server now directly returns the user data
      const userData = await response.json();
      setUserData(userData);
      setOriginalData(userData);
    }
  };

  fetchUserProfile().catch(console.error);
}, []);


// Inside handleSave for updating user profile
const handleSave = async (editedData) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    const response = await fetch('http://localhost:3001/api/users/profile', {
      method: 'PUT', 
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update profile: ${errorText}`);
    }

    // Assuming the server responds with the updated user data
    const {userData} = await response.json(); // Make sure to destructure userData from response
    setUserData(userData);
    setOriginalData(userData);
    setEditMode(false);
  }
};

const handleCancel = () => {
  setUserData(originalData);
  setEditMode(false);
};

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardAppBar open={open} handleDrawerOpen={toggleDrawerOpen} />
        <DashboardDrawer open={open} handleDrawerClose={toggleDrawerClose} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          }}
        >
          {/* Add a Toolbar to give content below the app bar */}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3, minHeight: 'calc(100vh - 64px - 48px)', borderRadius: 2 }}>
              <Grid container spacing={3}>

                  <UserProfileBox
                  userData={userData}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  />

                
                {/* <UserProfileBox userData={userData} onSave={handleSave} onCancel={handleCancel} /> */}

                <Grid item xs={12} md={8} lg={9}><Chart /></Grid>
                <Grid item xs={12} md={4} lg={3}><Deposits /></Grid>
                <Grid item xs={12}><Orders /></Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
