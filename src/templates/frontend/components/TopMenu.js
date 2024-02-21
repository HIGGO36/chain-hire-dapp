import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Box, Button, Container, Drawer, IconButton, MenuItem, Toolbar, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';

function TopMenu({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation(); // Add this line

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const offset = theme.spacing(8);
      const targetScroll = sectionElement.offsetTop - offset;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: 'transparent', mt: 2 }}>
      <Container maxWidth="lg">
        <Toolbar sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          borderRadius: '999px', 
          bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)', 
          backdropFilter: 'blur(24px)', 
          border: '1px solid', 
          borderColor: 'divider'
        }}>
          {/* Logo and Menu Items */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            {/* Your logo here */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2 }}>
              {['features', 'testimonials', 'highlights', 'pricing', 'faq'].map((section) => (
                <MenuItem key={section} onClick={() => scrollToSection(section)}>
                  <Typography textAlign="center">{section.charAt(0).toUpperCase() + section.slice(1)}</Typography>
                </MenuItem>
              ))}
            </Box>
          </Box>

          {/* Toggle and Sign In/Up Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            {location.pathname !== '/signin' && <Button variant="outlined" onClick={() => navigate('/signin')}>Sign In</Button>}
            {location.pathname !== '/signup' && <Button variant="contained" onClick={() => navigate('/signup')}>Sign Up</Button>}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ ml: 2, display: { sm: 'none' } }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250, p: 2 }}>
              {['features', 'testimonials', 'highlights', 'pricing', 'faq'].map((section) => (
                <MenuItem key={section} onClick={() => scrollToSection(section)}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </MenuItem>
              ))}
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

TopMenu.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default TopMenu;
