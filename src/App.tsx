// App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/NavBar/Navbar';
import ServerStatus from './components/ServerStatus/ServerStatus';
import { Stack } from '@mui/material';
import { API_URL } from './constants';


const App: React.FC = () => {
  const fakeServerUrl = API_URL + '/databases'

  return (
    <Router>
      <Navbar />
      <Stack spacing={2} direction="column" alignItems={'center'} padding={2}>
        <ServerStatus serverUrl={fakeServerUrl} />
        <AppRoutes />
      </Stack>
    </Router>
  );
};

export default App;