import * as React from 'react';
import { useUser } from './../../../src/contexts/UserContext'; 
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import RateReviewIcon from '@mui/icons-material/RateReview';

export const MainListItems = () => {
  const { userType } = useUser(); // Access userType from context

  let recruitersOrEmployersLink;
  let recruitersOrEmployersText;

  if (userType === 'employer') {
    recruitersOrEmployersLink = "/Recruiters";
    recruitersOrEmployersText = "Recruiters";
  } else if (userType === 'recruiter') {
    recruitersOrEmployersLink = "/Employers";
    recruitersOrEmployersText = "Employers";
  } else if (userType === 'jobseeker') {
    recruitersOrEmployersLink = "/JobsApplied";
    recruitersOrEmployersText = "Jobs Applied";
  }

  return (
    <React.Fragment>
      <Link to="/Applicants" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Applicants" />
        </ListItemButton>
      </Link>
      <Link to={`/${userType}Dashboard`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link to="/MarketplaceDashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Marketplace" />
        </ListItemButton>
      </Link>
      <Link to="/Messages" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItemButton>
      </Link>
      <Link to={recruitersOrEmployersLink} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={recruitersOrEmployersText} />
        </ListItemButton>
      </Link>
      <Link to="/WalletDashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Wallet" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
};

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset sx={{ background: '#747D8B', fontSize: '16px', color: '#D0FF7F', fontWeight: '600' }}>
      Additional Services
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <NotificationsIcon />
      </ListItemIcon>
      <ListItemText primary="Notifications" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Request Help" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <RateReviewIcon />
      </ListItemIcon>
      <ListItemText primary="Reviews" />
    </ListItemButton>
  </React.Fragment>
);
