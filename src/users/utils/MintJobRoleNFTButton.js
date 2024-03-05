import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import MintJobRoleNFTForm from './MintJobRoleNFTForm';

const MintJobRoleNFTButton = ({ userAddress, onTokenMinted }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ textAlign: 'center', background: '#B6D3DF'}}>
      <Button
        onClick={handleOpen}
        sx={{
          fontWeight: 600,
          color: '#03364B',
          ':hover': {
            opacity: '50%',
            borderColor: '#0277BD', 
          },
          ':focus': {
            opacity: '50%',
            borderColor: '#0277BD', 
            borderStyle: 'solid',
          },
        }}
      >
      MINT
    </Button>
    <Modal open={open} onClose={handleClose}>
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
    <MintJobRoleNFTForm userAddress={userAddress} onClose={handleClose} onTokenMinted={onTokenMinted} />
    </Box>
    </Modal>
    </div>
    );
    };

export default MintJobRoleNFTButton;