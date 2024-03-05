// src/users/profile/components/DashboardAppBar.js
import React from 'react';
import { Toolbar, IconButton, Typography, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBarStyled } from './styles/AppBarStyles'; 
import SignOutButton from './SignOutButton'; 

export const DashboardAppBar = ({ open, handleDrawerOpen }) => (
  <AppBarStyled position="absolute" open={open}>
    <Toolbar sx={{ pr: '24px', background: '#5779A7' }}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>
      <Typography component="h1" variant="h6" color="inherit" fontSize="20px" fontWeight="650" noWrap sx={{ flexGrow: 1 }}>
        ChainHire.io
      </Typography>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <SignOutButton />
    </Toolbar>
  </AppBarStyled>
);
