import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Database Management
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
