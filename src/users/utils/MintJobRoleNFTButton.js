// MintJobRoleNFTButton.js
import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import MintJobRoleNFTForm from './MintJobRoleNFTForm';

const MintJobRoleNFTButton = ({ userAddress }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} style={{ margin: '10px', backgroundColor: 'yellow', color: 'black' }}>
        Mint Job Role NFT
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <MintJobRoleNFTForm userAddress={userAddress} onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default MintJobRoleNFTButton;
