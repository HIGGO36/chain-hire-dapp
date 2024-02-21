import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useFirebaseAuth';
import AlertMessage from './components/AlertMessage'; 
import TextInputField from './components/TextInputField'; 
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const DefaultTheme = createTheme();

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, authState } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await signIn(email, password); // signIn is assumed to be an async function
        if (result === 'success') {
            navigate('/dashboard'); // Redirect to Dashboard on success
        } else {
            // Optionally handle the failure case, maybe set an error message
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
                    {authState.error && <AlertMessage info={{ message: authState.error, severity: 'error' }} />}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextInputField id="email" label="Email Address" name="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInputField id="password" label="Password" type="password" name="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
