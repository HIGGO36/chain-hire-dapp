import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton'; 
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

function ToggleColorMode({ mode, toggleColorMode }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <IconButton
        onClick={toggleColorMode}
        size="small"
        aria-label={mode === 'dark' ? 'Activate light mode' : 'Activate dark mode'} 
        sx={{ padding: '4px' }}
      >
        {mode === 'dark' ? <WbSunnyRoundedIcon /> : <ModeNightRoundedIcon />}
      </IconButton>
    </Box>
  );
}

ToggleColorMode.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default ToggleColorMode;
