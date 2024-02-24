// src/users/profile/JobSeekerDashboard.js
import React, { useState } from 'react';
import { CssBaseline, Box, Container, Grid, ThemeProvider, createTheme, Paper } from '@mui/material';
import { DashboardAppBar } from './components/DashboardAppBar';
import { DashboardDrawer } from './components/DashboardDrawer';
import Chart from '../components/Chart';
import Deposits from '../components/Deposits';
import Orders from '../components/Orders';
import Copyright from '../components/Copyright';

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = useState(true);

  const toggleDrawerOpen = () => setOpen(true);
  const toggleDrawerClose = () => setOpen(false);

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
