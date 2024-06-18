// ServerStatus.tsx
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import './ServerStatus.css';
import { Stack, Typography } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';
import { REFRESH_INTERVAL } from '../../constants';

enum ServerStatus {
  Working = 'WORKING',
  NotWorking = 'NOT WORKING',
  Loading = 'LOADING',
}

interface StatusInfo {
  statusMessage: string;
  statusColor: string;
}

interface ServerStatusProps {
  serverUrl: string;
}

const statusInfo: Record<ServerStatus, StatusInfo> = {
  // use material design colors
  [ServerStatus.Working]: {
    statusMessage: 'Server is working',
    statusColor: green[500], 
  },
  [ServerStatus.NotWorking]: {
    statusMessage: 'Server is not working',
    statusColor: red[500], 
  },
  [ServerStatus.Loading]: {
    statusMessage: 'Loading...',
    statusColor: yellow[500],
  },
};

const ServerStatusComponent: React.FC<ServerStatusProps> = ({ serverUrl }) => {  
  const [serverStatus, setServerStatus] = useState<ServerStatus>(ServerStatus.Loading);
  const { statusMessage, statusColor } = useMemo(() => statusInfo[serverStatus], [serverStatus]);

  useEffect(() => {
    const checkServerStatus = () => {
      axios.get(serverUrl)
        .then((response) => {
          setServerStatus(ServerStatus.Working);
        })
        .catch(() => {
          setServerStatus(ServerStatus.NotWorking);
        });
    };

    checkServerStatus();

    // check server status every 5 seconds
    const intervalId = setInterval(checkServerStatus, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [serverUrl]);

  return (
  <Stack direction="row" alignItems={'center'}>
    <div className={`status-dot ${serverStatus}`} style={{ backgroundColor: statusColor, marginRight: '10px' }}></div>
    <Typography color={statusColor}>
      {statusMessage}
    </Typography>
  </Stack> 
  );
};

export default ServerStatusComponent;