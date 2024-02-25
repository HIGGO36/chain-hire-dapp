import React, { useState, useEffect } from 'react';
import { CssBaseline, Box, Container, Grid, ThemeProvider, createTheme, Paper } from '@mui/material';
import { DashboardAppBar } from './components/DashboardAppBar';
import { DashboardDrawer } from './components/DashboardDrawer';
import Chart from '../components/Chart';
import Deposits from '../components/Deposits';
import Orders from '../components/Orders';
import Copyright from '../components/Copyright';
import UserProfileBox from './components/UserProfileBox';
import { getAuth } from 'firebase/auth';

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
          }}>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3, minHeight: 'calc(100vh - 64px - 48px)', borderRadius: 2 }}>
              <Grid container spacing={3}>
                {/* Insert UserProfileBox with props */}
                <UserProfileBox userData={userData} onSave={handleSave} onCancel={handleCancel} editMode={editMode} setEditMode={setEditMode} />
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