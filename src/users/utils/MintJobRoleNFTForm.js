import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ethers } from 'ethers';
import JobRoleNFTv1ABI from './abis/JobRoleNFTv1ABI.json';

const MintJobRoleNFTForm = ({ userAddress, onClose }) => {
  // State hooks for each input field
  const [companyName, setCompanyName] = useState('');
  const [jobRoleTitle, setJobRoleTitle] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [workLocationType, setWorkLocationType] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [benefits, setBenefits] = useState('');
  const [lifeSpan, setLifeSpan] = useState('');

  // Check if all required fields are filled to enable mint button
  const canMint = companyName && jobRoleTitle && minSalary && maxSalary && workLocationType && country && description && requirements && benefits && lifeSpan;

  const mintNFT = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask.');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = process.env.REACT_APP_JOB_ROLE_NFT_V1_CONTRACT_ADDRESS;
      const nftContract = new ethers.Contract(contractAddress, JobRoleNFTv1ABI, signer);

      // Prepare parameters for minting function call
      const transaction = await nftContract.mintJobRoleNFT(
        userAddress,
        companyName,
        jobRoleTitle,
        ethers.utils.parseUnits(minSalary, "ether"),
        ethers.utils.parseUnits(maxSalary, "ether"),
        workLocationType,
        country,
        description,
        requirements,
        benefits,
        Number(lifeSpan)
      );

      await transaction.wait();
      alert('NFT minted successfully');
      onClose && onClose(); // Close the form/modal after successful minting
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Error minting NFT. See console for details.');
    }
  };

 return (
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      border: '5px solid',
      borderColor: 'linear-gradient(180deg, rgba(105,105,105,1) 0%, rgba(0,0,0,1) 100%)',
      borderRadius: '20px',
      width: '80%',
      maxWidth: '600px',
      maxHeight: '90vh',
      overflowY: 'auto', // Ensures content is scrollable if it exceeds the height
      padding: 3,
      background: 'linear-gradient(145deg, #ffd700, #ffffff)',
      boxShadow: 'inset 5px 5px 10px #c8c8c8, inset -5px -5px 10px #ffffff',
    }}>
      <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>Mint Your Job Role NFT</Typography>
        <TextField label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} fullWidth required />
        <TextField label="Job Role Title" value={jobRoleTitle} onChange={(e) => setJobRoleTitle(e.target.value)} fullWidth required />
        <TextField label="Min Salary" type="number" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} fullWidth required />
        <TextField label="Max Salary" type="number" value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} fullWidth required />
        <FormControl fullWidth>
        <InputLabel>Work Location Type</InputLabel>
        <Select value={workLocationType} label="Work Location Type" onChange={(e) => setWorkLocationType(e.target.value)} required>
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="Local">Local</MenuItem>
        <MenuItem value="Hybrid">Hybrid</MenuItem>
        </Select>
        </FormControl>
        <TextField label="Country" value={country} onChange={(e) => setCountry(e.target.value)} fullWidth required />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth required />
        <TextField label="Requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} fullWidth required />
        <TextField label="Benefits" value={benefits} onChange={(e) => setBenefits(e.target.value)} fullWidth required />
        <TextField label="Life Span (days)" type="number" value={lifeSpan} onChange={(e) => setLifeSpan(e.target.value)} fullWidth required />
         <Button
        onClick={mintNFT}
        disabled={!canMint}
        sx={{
          mt: 2,
          bgcolor: canMint ? 'green' : 'grey',
          color: 'white',
          '&:hover': {
            bgcolor: canMint ? 'darkgreen' : 'grey',
          },
          borderRadius: '20px',
        }}
      >
        Mint NFT
      </Button>
    </Box>
  );
};

export default MintJobRoleNFTForm;
