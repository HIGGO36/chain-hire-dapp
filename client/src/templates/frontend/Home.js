import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TopMenu from '../frontend/components/TopMenu';
import Hero from '../frontend/components/Hero';
import LogoCollection from '../frontend/components/LogoCollection';
import Highlights from '../frontend/components/Highlights';
import Pricing from '../frontend/components/Pricing';
import Features from '../frontend/components/Features';
import Testimonials from '../frontend/components/Testimonials';
import FAQ from '../frontend/components/FAQ';
import Footer from '../frontend/components/Footer';
import GetLPTheme from '../frontend/components/GetLPTheme';

export default function Home() {
  const [mode, setMode] = React.useState('dark');
  const LPtheme = createTheme(GetLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <TopMenu mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
