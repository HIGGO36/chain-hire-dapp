// src/users/profile/RecruiterDashboard.js
import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth"; 
import { CssBaseline, Box, Container, ThemeProvider, createTheme } from '@mui/material';
import { DashboardAppBar } from './components/DashboardAppBar';
import { DashboardDrawer } from './components/DashboardDrawer';
import UserProfileBox from './components/UserProfileBox';
import RecruiterPortal from './components/RecruiterPortal';
import Copyright from '../components/Copyright';
import ScrollingBar from './components/ScrollingBar'; 

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
try {
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
const data = await response.json();
setUserData(data);
setOriginalData(data);
} catch (error) {
console.error('Error fetching user data:', error);
}
}
};

fetchUserProfile();
}, []);

const handleSave = async (editedData) => {
const auth = getAuth();
const user = auth.currentUser;
if (user) {
const token = await user.getIdToken();
try {
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
const updatedData = await response.json();
setUserData(updatedData);
setOriginalData(updatedData);
setEditMode(false);
} catch (error) {
console.error('Error updating user data:', error);
}
}
};

const handleCancel = () => {
setUserData(originalData);
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
<Box sx={{ display: 'flex'}}>
<CssBaseline />
<DashboardAppBar open={open} handleDrawerOpen={toggleDrawerOpen} />
<DashboardDrawer open={open} handleDrawerClose={toggleDrawerClose} />
  <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', margin: '50px 0px 20px 0px', background: 'linear-gradient(to right, #9FA8AC, #FFFFFF)'}} >
<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
<ScrollingBar userData={userData} /> {/* Add the ScrollingBar component here */}
<RecruiterPortal portalStyle={{ display: 'flex', justifyContent: 'center', marginTop: '20px', minHeight: '420px' }} />
<UserProfileBox userData={userData} onSave={handleSave} onCancel={handleCancel} editMode={editMode} setEditMode={setEditMode} style={userProfileBoxStyle}/>
<Copyright sx={{ pt: 4 }} />
</Container>
</Box>
</Box>
</ThemeProvider>
);
}
