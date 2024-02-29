import React, { useState } from 'react';
import { Button, TextField, Box, Modal, Typography } from '@mui/material';
import { ethers } from 'ethers';
import JobRoleNFTABI from './abis/JobRoleNFTABI.json';

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

const calculateMaxDate = () => {
  const today = new Date();
  const maxDays = 280;
  today.setDate(today.getDate() + maxDays);
  return today.toISOString().split('T')[0]; // Format to YYYY-MM-DD
};

const MintJobRoleNFTButton = ({ userAddress }) => {
  const [open, setOpen] = useState(false);
  const [metadataURI, setMetadataURI] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobRoleTitle, setJobRoleTitle] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [dateListed, setDateListed] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [benefits, setBenefits] = useState('');
  const [recruiterProfit, setRecruiterProfit] = useState('');
  const [lifeSpan, setLifeSpan] = useState('');

  // Convert lifeSpan to a number of days from now for the contract, or adjust based on your contract's expectations
  const convertLifeSpanToDays = (lifeSpan) => {
    const today = new Date();
    const lifeSpanDate = new Date(lifeSpan);
    const diffTime = Math.abs(lifeSpanDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
  };

  const canMint = metadataURI && companyName && jobRoleTitle && minSalary && maxSalary && dateListed && jobLocation && description && requirements && benefits && recruiterProfit && lifeSpan;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const mintNFT = async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractAddress = "0xCE745e9b6401F5792De4CBa89Eba256f69bd448D";
            const nftContract = new ethers.Contract(contractAddress, JobRoleNFTABI, signer);

            // Construct the MintParams object as expected by the smart contract
            const mintParams = {
                metadataURI: metadataURI,
                companyName: companyName,
                jobRoleTitle: jobRoleTitle,
                minSalary: ethers.utils.parseUnits(minSalary.toString(), "ether"),
                maxSalary: ethers.utils.parseUnits(maxSalary.toString(), "ether"),
                dateListed: dateListed,
                location: jobLocation, // Renamed variable to avoid global object conflict
                description: description,
                requirements: requirements,
                benefits: benefits,
                recruiterProfit: ethers.BigNumber.from(recruiterProfit),
                lifeSpan: convertLifeSpanToDays(lifeSpan) // Assuming this conversion function is correctly implemented
            };

            // Call the mintJobRoleNFT function with the recipient address and the MintParams struct
            const transaction = await nftContract.mintJobRoleNFT(userAddress, mintParams);

            await transaction.wait();
            alert('NFT minted successfully');
        } catch (error) {
            console.error('Error minting NFT:', error);
            alert('Error minting NFT. See console for details.');
        } finally {
            handleClose();
        }
    } else {
        alert('Please install MetaMask.');
    }
};


  return (
    <div>
    <Button onClick={handleOpen} style={{ margin: '10px', backgroundColor: 'green', color: 'white' }}>
    Mint JobRole NFT
    </Button>
    <Modal open={open} onClose={handleClose}>
    <Box sx={style}>
    <Typography variant="h6">Mint Your Job Role NFT</Typography>
    <TextField label="Metadata URI" value={metadataURI} onChange={(e) => setMetadataURI(e.target.value)} fullWidth required />
    <TextField label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} fullWidth required />
    <TextField label="Job Role Title" value={jobRoleTitle} onChange={(e) => setJobRoleTitle(e.target.value)} fullWidth required />
    <TextField label="Min Salary" type="number" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} fullWidth required />
    <TextField label="Max Salary" type="number" value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} fullWidth required />
    <TextField label="Date Listed" type="date" value={dateListed} onChange={(e) => setDateListed(e.target.value)} InputLabelProps={{ shrink: true }} fullWidth required />
    <TextField label="Location" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} fullWidth required />
    <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth required />
    <TextField label="Requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} fullWidth required />
    <TextField label="Benefits" value={benefits} onChange={(e) => setBenefits(e.target.value)} fullWidth required />
    <TextField label="Recruiter Profit" type="number" value={recruiterProfit} onChange={(e) => setRecruiterProfit(e.target.value)} fullWidth required />
    <TextField label="Life Span" type="date" value={lifeSpan} onChange={(e) => setLifeSpan(e.target.value)} InputLabelProps={{ shrink: true }} inputProps={{ min: new Date().toISOString().split('T')[0], max: calculateMaxDate() }} fullWidth required />
    <Button onClick={mintNFT} disabled={!canMint} style={{ marginTop: '20px', backgroundColor: canMint ? 'green' : 'grey', color: 'white' }}>
    Mint NFT
    </Button>
    </Box>
    </Modal>
    </div>
    );
    };

export default MintJobRoleNFTButton;