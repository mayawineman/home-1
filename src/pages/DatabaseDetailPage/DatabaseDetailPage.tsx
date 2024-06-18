import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, CircularProgress, Alert, Card, CardContent, Avatar, Stack } from '@mui/material';
import { Database } from '../../types/Database';
import { API_URL } from '../../constants';
import DatabaseIcon from '@mui/icons-material/Storage';
import DeleteDbButton from '../../components/DeleteDbButton/DeleteDbButton';

const DatabaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [database, setDatabase] = useState<Database | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/databases/${id}`)
      .then((response) => {
        setDatabase(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>Back</Button>
      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error" style={{padding: 4}}>Error fetching data</Alert>}
      {!isLoading && !isError && database && (
        <Card variant="outlined" sx={{ marginTop: 2 }}>
          <CardContent>
            <Stack direction={'row'} alignItems="center" marginBottom={2}>
              <Typography variant="h4">{database.name}</Typography>
              <Avatar sx={{ backgroundColor: 'primary.main', marginLeft: 2 }}>
                <DatabaseIcon />
              </Avatar>
            </Stack>
            <Typography variant="body1">URL: {database.url}</Typography>
            <Typography variant="body1">Username: {database.username}</Typography>
            <Typography variant="body1">Type: {database.type}</Typography>
            <DeleteDbButton dbId={id} style={{marginTop: 20}} />
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default DatabaseDetailPage;