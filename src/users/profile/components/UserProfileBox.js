import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Modal, Backdrop, Fade } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const modalStyle = {
    position: 'absolute',
    top: '51%',
    left: '50.5%',
    transform: 'translate(-50%, -50%)',
    width: '82%',
    maxWidth: '100%',
    margin: '20px',
    padding: '26px',
    backgroundColor: 'black', 
    color: 'white', 
    border: '10px solid white', 
    borderRadius: '20%', 
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)', 
    overflow: 'hidden',
};

const userProfileButtonStyle = {
    margin: '4px 1.9%',
    minWidth: '96%',
    color: 'black', 
    backgroundColor: '#96FD8D', 
    borderRadius: '50%', 
    padding: '10px', 
    marginBottom: '20px', 
    fontWeight: '600',
};

const UserProfileBox = ({ userId, onSave, onCancel, editMode, setEditMode }) => {
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
                        setEditMode(false);
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
    }, [userId, setEditMode]);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(\d{3}\)-\d{3}-\d{4}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Check for email format
        if (name === 'email' && !emailRegex.test(value)) {
            alert('Invalid email format. Please use a valid email address.');
            return;
        }
        // Check for phone format
        if (name === 'telephone' && !phoneRegex.test(value)) {
            alert('Invalid telephone number format. Please use the format (XXX)-XXX-XXXX.');
            return;
        }
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

    // Determine excluded fields based on userType
    let excludedFields = ['userType', 'businessEmail'];
    if (userData.userType === 'Job Seeker') {
        excludedFields = Object.keys(userData).filter(key => key !== 'email');
    }

    return (
        <>
            <Button sx={userProfileButtonStyle} variant="outlined" onClick={() => { setOpenModal(true); setEditMode(true); }}>Edit Profile</Button>
 
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
                        <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}> {/* Added container for scrollability */}
                            {Object.entries(userData).filter(([key]) => !excludedFields.includes(key)).map(([key, value]) => (
                                <Box key={key} sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                                    <Typography variant="subtitle1" sx={{ color: 'yellow' }}>{key.charAt(0).toUpperCase()                                        + key.slice(1)}</Typography>
                                    <TextField
                                        value={value || ''}
                                        name={key}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        variant="outlined"
                                        sx={{ backgroundColor: '#f0f0f0', mt: 1 }} // Changed background color to light grey
                                    />
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button variant="contained" color="primary" onClick={() => { onSave(userData); setOpenModal(false); setEditMode(false); }}>Save</Button>
                            <Button variant="outlined" color="secondary" onClick={()=> { setOpenModal(false); setEditMode(false); }}>Cancel</Button>
                            <Button variant="outlined" color="warning" onClick={handlePasswordReset}>Reset Password</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default UserProfileBox;

