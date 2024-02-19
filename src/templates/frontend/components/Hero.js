import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import ChainHireFuture from '../../global/images/ChainHireFuture.jpeg';
import JobRoleNFTMarketplaceVisual1 from '../../global/images/JobRoleNFTMarketplace-Visual-1.jpeg';
import JobSeekerProfileNFT from '../../global/images/JobSeekerProfileNFT.jpeg';


const carouselImages = [
  ChainHireFuture,
  JobRoleNFTMarketplaceVisual1,
   JobSeekerProfileNFT,
];

export default function Hero() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ overflow: 'hidden', width: '100%', margin: '60px auto 0 auto' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Welcome to the future of job sites on chain!
        </Typography>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 300,
          mb: 4,
        }}>
          {carouselImages.map((image, i) => (
            <Box
              key={i}
              component="img"
              src={image}
              alt={`Slide ${i + 1}`}
              sx={{
                maxHeight: '100%',
                maxWidth: '100%', 
                objectFit: 'contain',
                display: index === i ? 'block' : 'none',
                transition: 'opacity 0.5s ease-in-out',
              }}
            />
          ))}
        </Box>

        <Paper sx={{ p: 2 }}>
          <Typography variant="body1" textAlign="center">
            Explore our cutting-edge solutions, tailored to meet your needs and elevate your experience with top-tier features and services. 
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
