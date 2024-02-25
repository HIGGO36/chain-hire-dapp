import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Paper, Typography } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const UserProfileBox = ({ onSave, onCancel, editMode, setEditMode }) => {
    const [userData, setUserData] = useState({});
  
    useEffect(() => {
        const fetchUserData = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const idToken = await user.getIdToken();
                try {
                    const response = await fetch('http://localhost:3001/api/users/profile', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${idToken}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Could not fetch user data');
                    }

                    const data = await response.json();
                    setUserData(data || {});
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    alert('Error fetching user data. Please try again later.');
                }
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({ ...prevData, [name]: value }));
    };

const handlePasswordReset = () => {
    const auth = getAuth();
    const emailAddress = auth.currentUser.email;

    sendPasswordResetEmail(auth, emailAddress).then(() => {
        alert('Password reset email sent successfully.');
    }).catch((error) => {
        console.error("Error sending password reset email:", error);
        alert('Failed to send password reset email. Please try again later.');
    });
};

    // Fields to exclude from rendering
    const excludedFields = ['userType'];

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderColor: 'darkgreen' }}>
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
                {!editMode ? (
                    <Button variant="outlined" onClick={() => setEditMode(true)}>Edit Profile</Button>
                ) : (
                    <>
                        <Button variant="contained" color="primary" onClick={() => onSave(userData)}>Save</Button>
                        <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
                        <Button variant="outlined" color="warning" onClick={handlePasswordReset}>Reset Password</Button>
                    </>
                )}
            </Box>
        </Paper>
    );
};

export default UserProfileBox;
