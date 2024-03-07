import * as React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import RateReviewIcon from '@mui/icons-material/RateReview';

export const mainListItems = (
  <React.Fragment>
        <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Applicants" />
    </ListItemButton>
    <Link to="/EmployerDashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
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
          <BuildCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Marketplace" />
      </ListItemButton>
    </Link>
        <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Recruiters" />
    </ListItemButton>
    <Link to="/WalletDashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <BuildCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Manage" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

// The secondaryListItems remains unchanged
export const secondaryListItems = (
 <React.Fragment>
    <ListSubheader component="div" inset  sx={{background: '#747D8B', fontSize: '16px', color: '#D0FF7F', fontWeight: '600'}}>
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
