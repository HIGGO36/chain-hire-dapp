import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Modal, Backdrop, Fade } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const userProfileButtonStyle = {
  display: 'block',
  margin: '10px auto',
  minWidth: '60%',
  color: 'white',
  fontSize: '14px',
  backgroundColor: '#6467F0',
  border: '2px solid #515A5C',
  borderRadius: '5px',
  padding: '15px',
  marginBottom: '20px',
  fontWeight: '600',
  '&:hover': {
    backgroundColor: '#5558F0',
  },
};

const UserProfileBox = () => {
  const [userData, setUserData] = useState({});
  const [open, setOpen] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const idToken = await user.getIdToken(true);
      fetch(`http://localhost:3001/api/users/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error('Error fetching user data:', error));
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser?.uid]);

const handleSave = async () => {
const idToken = await auth.currentUser.getIdToken(true);
fetch(`http://localhost:3001/api/users/profile`, {
method: 'PUT',
headers: {
'Authorization': `Bearer ${idToken}`,
'Content-Type': 'application/json',
},
body: JSON.stringify(userData),
})
.then(response => {
if (response.ok) {
alert('Profile updated successfully');
setOpen(false);
} else {
alert('Failed to update profile');
}
})
.catch(error => console.error("Error updating user data:", error));
};

const handleChange = (event) => {
const { name, value } = event.target;
setUserData(prev => ({ ...prev, [name]: value }));
};

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const handlePasswordReset = () => {
if (auth.currentUser) {
sendPasswordResetEmail(auth, auth.currentUser.email)
.then(() => alert("Password reset email sent successfully."))
.catch(error => {
console.error("Error sending password reset email: ", error);
alert("Error sending password reset email.");
});
}
};

return (
<>
<Button onClick={handleOpen} style={userProfileButtonStyle}>Edit Profile</Button>
<Modal
open={open}
onClose={handleClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
closeAfterTransition
BackdropComponent={Backdrop}
BackdropProps={{ timeout: 500 }}
>
<Fade in={open}>
<Box sx={modalStyle}>
<Typography id="modal-modal-title" variant="h6" component="h2">
Edit Profile
</Typography>
{Object.entries(userData).map(([key, value]) => (
<TextField
key={key}
fullWidth
margin="dense"
label={key.charAt(0).toUpperCase() + key.slice(1)}
variant="outlined"
name={key}
value={value}
onChange={handleChange}
/>
))}
<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
<Button onClick={handleSave} sx={{ mr: 1 }}>Save</Button>
<Button onClick={handleClose} color="error">Cancel</Button>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
<Button onClick={handlePasswordReset} color="warning">Reset Password</Button>
</Box>
</Box>
</Fade>
</Modal>
</>
);
};

export default UserProfileBox;
