import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { Database } from '../../types/Database';

const DatabaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [database, setDatabase] = useState<Database | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/databases/${id}`)
      .then(response => setDatabase(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  if (!database) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4">{database.name}</Typography>
      <Typography>URL: {database.url}</Typography>
      <Typography>Username: {database.username}</Typography>
      <Typography>Type: {database.type}</Typography>
    </Container>
  );
};

export default DatabaseDetailPage;
