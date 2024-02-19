import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}
      <Link href="https://mui.com/">Your Website</Link>
      {` ${new Date().getFullYear()}.`}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          pt: 2,
        }}
      >
        <IconButton aria-label="GitHub" href="https://github.com">
          <GitHubIcon />
        </IconButton>
        <IconButton aria-label="Twitter" href="https://twitter.com">
          <TwitterIcon />
        </IconButton>
        <IconButton aria-label="LinkedIn" href="https://linkedin.com">
          <LinkedInIcon />
        </IconButton>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
        {'Your Website © '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      {/* Utilize the Copyright component here */}
      <Copyright />
    </Container>
  );
}
