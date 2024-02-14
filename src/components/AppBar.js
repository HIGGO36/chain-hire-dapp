import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function MenuAppBar() {
  const [auth, setAuth] = useState(false); // Initially set to false
  const [anchorEl, setAnchorEl] = useState(null);
  const [hideSwitch, setHideSwitch] = useState(false); // Initially set to false

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth(true); // If user is authenticated, set auth state to true
        setHideSwitch(true); // Hide the switch after successful sign-in
      } else {
        setAuth(false); // If user is not authenticated, set auth state to false
        setHideSwitch(false); // Show the switch if the user is not authenticated
      }
    });
    return unsubscribe;
  }, []);

  const handleChange = (event) => {
    setAuth(event.target.checked); // Update auth state based on switch change
    if (!event.target.checked) {
      const auth = getAuth();
      signOut(auth); // Sign out if the switch is turned off
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chain Hire B2B-Marketplace
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
          {auth && (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={auth}
                    onChange={handleChange}
                    aria-label="login switch"
                    className="MuiSwitch-root MuiSwitch-sizeMedium css-julti5-MuiSwitch-root"
                    style={{ display: hideSwitch ? 'none' : 'inline-flex' }} // Conditionally hide the switch based on hideSwitch state
                  />
                }
                label={auth ? 'Logout' : 'Login'}
              />
            </FormGroup>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
