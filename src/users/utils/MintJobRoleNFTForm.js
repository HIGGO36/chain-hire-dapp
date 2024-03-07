import React, { useState} from 'react';
import { Box, Button,  CircularProgress, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ethers } from 'ethers';
import JobRoleNFTv5ABI from './abis/JobRoleNFTv5ABI.json';

// List of valid industries
const validIndustries = [
  "Automotive", "Banking", "Blockchain", "Business Sales", "Commercial Sales", "Construction", "Cryptocurrencies",
  "Education", "Energy", "Entertainment", "Fashion", "Finance", "Food and Beverage", "Government", "Local Government",
  "Healthcare", "Information Technology", "International Affairs", "Law Enforcement", "Manufacturing", "Real Estate",
  "Restaurant", "Retail", "Retail Sales", "Secret Service", "Security", "Software", "Telecommunications",
  "Transportation", "Travel", "Tourism", "Web2.0", "Web3.0"
];

// List of valid countries excluding the blacklisted ones
const validCountries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan", "South Korea", "Italy",
  "Spain", "Netherlands", "Switzerland", "Sweden", "Singapore", "Norway", "Denmark", "Belgium", "Austria", "Finland",
  "Ireland", "New Zealand"
];

const MintJobRoleNFTForm = ({ userAddress, onClose, onTokenMinted }) => {

  const [isLoading, setIsLoading] = useState(false);
  
  const [formState, setFormState] = useState({
    companyName: '',
    industry: '',
    jobRoleTitle: '',
    minSalary: '',
    maxSalary: '',
    workLocationType: '',
    country: '',
    location: '',
    positionSummary: '',
    responsibilities: '',
    qualifications: '',
    lifeSpan: '',
  });

  const [errors, setErrors] = useState({
    industry: '',
    minSalary: '',
    maxSalary: '',
    country: '',
    lifeSpan: ''
  });

  const canMint = Object.values(formState).every(value => value.trim() !== '') && !!userAddress;

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Handle validation for minSalary and maxSalary
    if (name === "minSalary" || name === "maxSalary") {
      if (parseFloat(value) < 0) {
        setErrors({ ...errors, [name]: "Salary cannot be negative" });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    }

    // Handle validation for lifeSpan
    if (name === "lifeSpan") {
      if (parseInt(value) < 1 || parseInt(value) > 280) {
        setErrors({ ...errors, [name]: "Life Span must be between 1 and 280 days" });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    }

    setFormState({ ...formState, [name]: value });
  };

  const mintNFT = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask.');
      return;
    }

     setIsLoading(true); 

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = process.env.REACT_APP_JOB_ROLE_NFT_V5_CONTRACT_ADDRESS;
      const nftContract = new ethers.Contract(contractAddress, JobRoleNFTv5ABI, signer);

      const transaction = await nftContract.mintJobRoleNFT(userAddress, {
        companyName: formState.companyName,
        industry: formState.industry,
        jobRoleTitle: formState.jobRoleTitle,
        minSalary: ethers.utils.parseUnits(formState.minSalary, "ether").toString(),
        maxSalary: ethers.utils.parseUnits(formState.maxSalary, "ether").toString(),
        workLocationType: formState.workLocationType,
        country: formState.country,
        location: formState.location,
        positionSummary: formState.positionSummary,
        responsibilities: formState.responsibilities,
        qualifications: formState.qualifications,
        lifeSpan: parseInt(formState.lifeSpan),
      }, { value: ethers.utils.parseEther("0.0017") }); 
    
      const receipt = await transaction.wait();
      const tokenId = receipt.events?.filter(x => x.event === "JobRoleNFTMinted")[0]?.args?.tokenId.toString();

      if (tokenId) {
        onTokenMinted(tokenId);
        alert(`NFT Minted! Token ID: ${tokenId}`);
      }
      onClose();
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Error minting NFT. See console for details.');
    }finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  
  return (
    <Box sx={{
      zIndex: '1000',
      position: 'absolute',
      top: '50%',
      left: '276px',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      border: '5px solid',
      borderColor: 'linear-gradient(180deg, rgba(105,105,105,1) 0%, rgba(0,0,0,1) 100%)',
      borderRadius: '20px',
      width: '100%',
      maxHeight: '86vh',
      overflowY: 'auto',
      padding: 3,
      background: 'linear-gradient(145deg, #ffd700, #ffffff)',
      boxShadow: 'inset 5px 5px 10px #c8c8c8, inset -5px -5px 10px #ffffff',
    }}>
      
  <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>Mint Job Role NFT</Typography>
  <TextField label="Company Name" name="companyName" value={formState.companyName} onChange={handleChange} fullWidth required />
  <FormControl fullWidth error={errors.industry !== ''}>
  <InputLabel>Industry</InputLabel>
  <Select name="industry" value={formState.industry} onChange={handleChange} required>
  {validIndustries.map((industry, index) => (
  <MenuItem key={index} value={industry}>{industry}</MenuItem>
  ))}
  </Select>
  {errors.industry && <Typography variant="body2" color="error">{errors.industry}</Typography>}
  </FormControl>
  <TextField label="Job Role Title" name="jobRoleTitle" value={formState.jobRoleTitle} onChange={handleChange} fullWidth required />
  <TextField label="Min Salary (ETH)" name="minSalary" value={formState.minSalary} onChange={handleChange} fullWidth required />
  <TextField label="Max Salary (ETH)" name="maxSalary" value={formState.maxSalary} onChange={handleChange} fullWidth required />
  <FormControl fullWidth>
  <InputLabel>Work Location Type</InputLabel>
  <Select name="workLocationType" value={formState.workLocationType} onChange={handleChange} required>
  <MenuItem value="Remote">Remote</MenuItem>
  <MenuItem value="Local">Local</MenuItem>
  <MenuItem value="Hybrid">Hybrid</MenuItem>
  </Select>
  </FormControl>
  <FormControl fullWidth error={errors.country !== ''}>
  <InputLabel>Country</InputLabel>
  <Select name="country" value={formState.country} onChange={handleChange} required>
  {validCountries.map((country, index) => (
  <MenuItem key={index} value={country}>{country}</MenuItem>
  ))}
  </Select>
  {errors.country && <Typography variant="body2" color="error">{errors.country}</Typography>}
  </FormControl>
  <TextField label="Location" name="location" value={formState.location} onChange={handleChange} fullWidth required />
  <TextField label="Position Summary" name="positionSummary" value={formState.positionSummary} onChange={handleChange} fullWidth required />
  <TextField label="Responsibilities" name="responsibilities" value={formState.responsibilities} onChange={handleChange} fullWidth required />
  <TextField label="Qualifications" name="qualifications" value={formState.qualifications} onChange={handleChange} fullWidth required />
  <TextField label="Life Span (days)" name="lifeSpan" type="number" value={formState.lifeSpan} onChange={handleChange} fullWidth required />
  {errors.lifeSpan && <Typography variant="body2" color="error">{errors.lifeSpan}</Typography>}

    <Button
    onClick={mintNFT}
    disabled={!canMint || isLoading}
    sx={{
    mt: 2,
    bgcolor: canMint && !isLoading ? 'green' : 'grey',
    color: 'white',
    '&:hover': { bgcolor: canMint && !isLoading ? 'darkgreen' : 'grey' },
    borderRadius: '20px',
    position: 'relative',
    }}
    >
    {isLoading ? (
    <CircularProgress size={24} sx={{
    color: 'green',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-12px',
    marginLeft: '-12px',
    }} />
    ) : 'Mint NFT'}
    </Button>
    </Box>
    );
    };

export default MintJobRoleNFTForm;