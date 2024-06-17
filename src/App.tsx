import React, { FunctionComponent, useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/NavBar/Navbar';

type status = 'WORKING' | 'NOT WORKING' | 'LOADING';

const statusInfo = {
  'WORKING': {
    statusMessage: 'Fake server is working',
    statusColor: 'green',
  },
  'NOT WORKING': {
    statusMessage: 'Fake server is not working',
    statusColor: 'red',
  },
  'LOADING': {
    statusMessage: 'Loading...',
    statusColor: 'yellow',
  },
};

const App: FunctionComponent = () => {
  const [serverStatus, setServerStatus] = useState<status>('LOADING');

  const { statusMessage, statusColor } = useMemo(() => statusInfo[serverStatus], [serverStatus]);

  useEffect(() => {
    const fakeServerUrl = 'http://localhost:4000/databases';

    axios.get(fakeServerUrl)
      .then((response) => {
        setServerStatus('WORKING');
        console.log(response.data);
      })
      .catch(() => {
        setServerStatus('NOT WORKING');
      });
  }, []);

  return (
    <Router>
      <Navbar />
      <div>
        <h5 style={{ color: statusColor }}>
          {statusMessage}
        </h5>
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
