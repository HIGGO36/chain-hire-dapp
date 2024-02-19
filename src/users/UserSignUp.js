// UserSignUp.js
import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import TopMenu from '../templates/frontend/components/TopMenu';
import Footer from '../templates/frontend/components/Footer';
import GetLPTheme from '../templates/frontend/components/GetLPTheme';
import SignUp from './SignUp';

export default function UserSignUp() {
  const [mode, setMode] = useState('dark');
  const theme = createTheme(GetLPTheme(mode));
  const toggleColorMode = () => setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopMenu mode={mode} toggleColorMode={toggleColorMode} />
      <SignUp />
      <Footer />
    </ThemeProvider>
  );
}
