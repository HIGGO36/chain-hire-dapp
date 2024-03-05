
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import WhatshotIcon from '@mui/icons-material/Whatshot'; // For "Burn"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; // For "List"
import BuildCircleIcon from '@mui/icons-material/BuildCircle'; // For "Manage"
import NotificationsIcon from '@mui/icons-material/Notifications'; // For "Notifications"
import HelpIcon from '@mui/icons-material/Help'; // For "Request Help"
import RateReviewIcon from '@mui/icons-material/RateReview'; // For "Reviews"

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Applicants" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Recruiters" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <WhatshotIcon />
      </ListItemIcon>
      <ListItemText primary="Burn" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AddShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="List" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BuildCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Manage" />
    </ListItemButton>
  </React.Fragment>
);

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

