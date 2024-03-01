import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';

export function Header() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
