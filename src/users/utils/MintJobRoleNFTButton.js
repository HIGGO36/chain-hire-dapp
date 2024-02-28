import React, { useState } from 'react';
import { Button, TextField, Box, Modal, Typography } from '@mui/material';
import { ethers } from 'ethers';
import JobRoleNFTABI from './abis/JobRoleNFTABI';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MintJobRoleNFTButton = ({ userAddress }) => {
  const [open, setOpen] = useState(false);
  const [metadataURI, setMetadataURI] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobRoleTitle, setJobRoleTitle] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [dateListed, setDateListed] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [benefits, setBenefits] = useState('');
  const [recruiterProfit, setRecruiterProfit] = useState('');
  const [lifeSpan, setLifeSpan] = useState('');

  const canMint =
    metadataURI &&
    companyName &&
    jobRoleTitle &&
    minSalary &&
    maxSalary &&
    dateListed &&
    location &&
    description &&
    requirements &&
    benefits &&
    recruiterProfit &&
    lifeSpan;

  const mintNFT = async () => {
    if (window.ethereum && canMint) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(process.env.JOB_ROLE_NFT_CONTRACT_ADDRESS, JobRoleNFTABI, signer);

        const transaction = await nftContract.mintJobRoleNFT(userAddress, {
          metadataURI,
          companyName,
          jobRoleTitle,
          minSalary: ethers.BigNumber.from(minSalary),
          maxSalary: ethers.BigNumber.from(maxSalary),
          dateListed: dateListed.toISOString(), // Convert to ISO string
          location,
          description,
          requirements,
          benefits,
          recruiterProfit: ethers.BigNumber.from(recruiterProfit),
          lifeSpan: Math.round((lifeSpan - Date.now()) / (1000 * 60 * 60 * 24)), // Calculate days from now
        });

        await transaction.wait();
        alert('NFT minted successfully');
        handleClose(); // Close the modal after minting
      } catch (error) {
        console.error('Error minting NFT:', error);
        alert('Error minting NFT. See console for details.');
      }
    } else {
      console.log('Ethereum object not found, install MetaMask.');
      alert('Please install MetaMask.');
    }
  };

     const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    

  return (
    <div>
      <Button onClick={handleOpen} style={{ margin: '10px', backgroundColor: 'green', color: 'white' }}>
        Mint JobRole NFT
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Mint Your Job Role NFT</Typography>
          <TextField label="Metadata URI" value={metadataURI} onChange={e => setMetadataURI(e.target.value)} fullWidth required />
          <TextField label="Company Name" value={companyName} onChange={e => setCompanyName(e.target.value)} fullWidth required />
          <TextField label="Job Role Title" value={jobRoleTitle} onChange={e => setJobRoleTitle(e.target.value)} fullWidth required />
          <TextField label="Min Salary" type="number" value={minSalary} onChange={e => setMinSalary(e.target.value)} fullWidth required />
          <TextField label="Max Salary" type="number" value={maxSalary} onChange={e => setMaxSalary(e.target.value)} fullWidth required />
          <TextField label="Date Listed" type="date" value={dateListed} onChange={e => setDateListed(e.target.value)} fullWidth required />
          <TextField label="Location" value={location} onChange={e => setLocation(e.target.value)} fullWidth required />
          <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} fullWidth required />
          <TextField label="Requirements" value={requirements} onChange={e =>setRequirements(e.target.value)} fullWidth required />
          <TextField label="Benefits" value={benefits} onChange={e => setBenefits(e.target.value)} fullWidth required />
          <TextField label="Recruiter Profit" type="number" value={recruiterProfit} onChange={e => setRecruiterProfit(e.target.value)} fullWidth required />
          <TextField label="Life Span" type="date" value={lifeSpan} onChange={e => setLifeSpan(e.target.value)} fullWidth required />
          <Button onClick={mintNFT} disabled={!canMint} style={{ marginTop: '10px', backgroundColor: canMint ? 'green' : 'grey', color: 'white' }}>
            Mint NFT
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default MintJobRoleNFTButton;