import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const ScrollingBar = ({ userData }) => {
  const [persistedUserData, setPersistedUserData] = useState({
    userType: localStorage.getItem('userType') || '',
    email: localStorage.getItem('email') || ''
  });

  // Update persistedUserData whenever userData changes
  useEffect(() => {
    if (userData.userType && userData.email) {
      setPersistedUserData({
        userType: userData.userType,
        email: userData.email
      });
      // Store userType and email in localStorage for persistence
      localStorage.setItem('userType', userData.userType);
      localStorage.setItem('email', userData.email);
    }
  }, [userData]);

  return (
    <Box
      sx={{
        backgroundColor: 'black',
        border: '4px solid yellow',
        padding: '8px',
        overflowX: 'auto',
        margin: '0 auto',
        borderRadius: '18px',
        width: '70%',
        textAlign: 'center',
        fontSize: '26px',
// }
          }}>
      <span style={{ color: 'white' }}>{persistedUserData.userType} Portal</span>
    </Box>
  );
};

export default ScrollingBar;
