import React from 'react';
import { Paper } from '@mui/material';

const DashboardPaper = ({ children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: '#F3EED1', // Hyper orange background color
        border: '20px solid green', // Hyper green border
        borderRadius: '20px', // Border radius
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)', // 3D embossed look
        padding: '20px', // Padding
        position: 'relative', // Ensure z-index works correctly
        overflow: 'hidden', // Hide overflow
      }}
    >
      {children}
    </Paper>
  );
};

export default DashboardPaper;
