import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Modal, Backdrop, Fade } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// Enhanced custom styles for the UserProfileBox and its contents
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    maxWidth: '80%', // Allows the modal to be responsive to screen size
    bgcolor: 'background.paper', // Use a theme color that contrasts well with the text
    border: '2px solid #000', // More visible border
    boxShadow: 24, // Use Material-UI's shadow for consistency
    p: 4,
    borderRadius: 3, // Smoothed corners
    overflow: 'auto', // Ensures content is scrollable if it overflows
    maxHeight: '80vh', // Prevents the modal from being too tall
};

const UserProfileBox = ({ onSave, onCancel, editMode, setEditMode }) => {
    const [userData, setUserData] = useState({});
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged(user => {
            if (user) {
                user.getIdToken().then(idToken => {
                    fetch('http://localhost:3001/api/users/profile', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${idToken}`,
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(response => {
                        if (!response.ok) throw new Error('Could not fetch user data');
                        return response.json();
                    })
                    .then(data => {
                        setUserData(data || {});
                        setEditMode(false); // Ensure fields are not editable until "Edit" is clicked
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                        alert('Error fetching user data. Please try again later.');
                    });
                });
            } else {
                console.log("User not signed in or session expired");
                setUserData({});
            }
        });
    // }, []);
    }, [setEditMode]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({ ...prevData, [name]: value }));
    };

    const handlePasswordReset = () => {
        const auth = getAuth();
        if (auth.currentUser) {
            const emailAddress = auth.currentUser.email;
            sendPasswordResetEmail(auth, emailAddress).then(() => {
                alert('Password reset email sent successfully.');
            }).catch((error) => {
                console.error("Error sending password reset email:", error);
                alert('Failed to send password reset email. Please try again later.');
            });
        }
    };

    const excludedFields = ['userType', 'businessEmail'];

    return (
        <>
            <Button variant="outlined" onClick={() => { setOpenModal(true); setEditMode(true); }}>Edit Profile</Button>
            <Modal
                open={openModal}
                onClose={() => { setOpenModal(false); setEditMode(false); }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={openModal}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" gutterBottom>User Profile</Typography>
                        {Object.entries(userData).filter(([key]) => !excludedFields.includes(key)).map(([key, value]) => (
                            <TextField
                                key={key}
                                label={key.charAt(0).toUpperCase() + key.slice(1)}
                                name={key}
                                value={value || ''}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                                disabled={!editMode}
                            />
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button variant="contained" color="primary" onClick={() => { onSave(userData); setOpenModal(false); setEditMode(false); }}>Save</Button>
                            <Button variant="outlined" color="secondary" onClick={() => { setOpenModal(false); setEditMode(false); }}>Cancel</Button>
                            <Button variant="outlined" color="warning" onClick={handlePasswordReset}>Reset Password</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );

};

export default UserProfileBox;
