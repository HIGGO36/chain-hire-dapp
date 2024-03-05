import React from 'react';
import { styled, Drawer as MuiDrawer, Toolbar, IconButton, Divider, List } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from '../../components/listItems';

const drawerWidth = 240;

const DrawerStyled = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

    export const DashboardDrawer = ({ open, handleDrawerClose }) => (
    <DrawerStyled variant="permanent" open={open}>
    <Toolbar
    sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#5779A7',
    px: [1],
    }}
    >
    <IconButton onClick={handleDrawerClose}>
    <ChevronLeftIcon />
    </IconButton>
    </Toolbar >
    <Divider />
    <List sx={{background: '#5779A7', color: '#E5E7EA'}}>{mainListItems}</List>
    <Divider />
    <List sx={{background: '#747D8B', color: '#E5E7EA', height: '100%'}}>{secondaryListItems}</List>
    </DrawerStyled>
    );
