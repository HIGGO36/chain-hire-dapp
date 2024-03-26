import React, { useState } from 'react';
import { useUser } from './../../src/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import AlertMessage from './components/AlertMessage';
import TextInputField from './components/TextInputField';
import { Avatar, Box, Button, CssBaseline, Container, Typography, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../users/access/firebase/firebaseConfig'; 
import CircularProgress from '@mui/material/CircularProgress';

const DefaultTheme = createTheme();

function SignIn() {
    const { setUserType } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertInfo, setAlertInfo] = useState({ message: '', severity: '' });
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const navigate = useNavigate();

    const auth = getAuth(app);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true); // Set isSubmitting to true when form submission starts
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            // Send the token to your server
            const response = await fetch('http://localhost:3001/api/users/verifyToken', {
           
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: token }),
            credentials: 'include',
            });


            const result = await response.json();

            if (result.success) {
                const formattedUserType = result.userType.replace(/\s+/g, '').toLowerCase();
                setUserType(formattedUserType); 
                navigate(`/${formattedUserType}dashboard`);
            } else {
                setAlertInfo({ message: result.message || "Sign-in failed. Please try again.", severity: "error" });
            }

            
        } catch (error) {
            console.error("Sign-in error:", error);
            setAlertInfo({ message: "Network or server error during sign-in.", severity: "error" });
        } finally {
            setIsSubmitting(false); // Set isSubmitting to false after form submission completes
        }
    };

    return (
        <ThemeProvider theme={DefaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    {alertInfo.message && <AlertMessage info={alertInfo} />}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextInputField id="email" label="Email Address" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInputField id="password" label="Password" type="password" name="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            {isSubmitting ? (
                                <CircularProgress size={24} color="inherit" /> // Render loading spinner if isSubmitting is true
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;
