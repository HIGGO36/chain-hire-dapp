import React from 'react';
import { Paper } from '@mui/material';

const DashboardPaper = ({ children }) => {
  return (
    <Paper
      elevation={0}
          sx={{
        backgroundColor: '#F3EED1', 
        border: '20px solid green', 
        borderRadius: '20px', 
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)', 
        padding: '20px', 
        position: 'relative', 
        overflow: 'hidden', 
      }}
    >
      {children}
    </Paper>
  );
};

export default DashboardPaper;
