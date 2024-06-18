import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, CircularProgress, Alert, Card, CardContent, Avatar, Stack, TextField, IconButton } from '@mui/material';
import { Database } from '../../types/Database';
import { API_URL } from '../../constants';
import DatabaseIcon from '@mui/icons-material/Storage';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

import DeleteDbButton from '../../components/DeleteDbButton/DeleteDbButton';

const DatabaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [database, setDatabase] = useState<Database | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/databases/${id}`)
      .then((response) => {
        setDatabase(response.data);
        setIsLoading(false);
        setNewName(response.data.name);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [id]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };
  
  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  
  const handleCheckClick = () => {
    if (database) {
      axios.put(`${API_URL}/databases/${database.id}`, { ...database, name: newName })
        .then(response => {
          // Update the local state with the updated database
          setDatabase(response.data);
        })
        .catch(error => console.error('Error updating database:', error));
    }
    setIsEditing(false);
  };
  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>Back</Button>
      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error" style={{padding: 4}}>Error fetching data</Alert>}
      {!isLoading && !isError && database && (
        <Card variant="outlined" sx={{ marginTop: 2 }}>
          <CardContent>
            <Stack direction={'row'} alignItems="center" marginBottom={2}>
              <Avatar sx={{ backgroundColor: 'primary.main', marginRight: 2 }}>
                <DatabaseIcon />
              </Avatar>
              {isEditing ? (
                    <div>
                     <TextField 
                        InputProps={{
                          style: { height: 40, padding: '0 10px' },
                        }}
                        value={newName} 
                        onChange={handleNameChange} 
                      />
                      <IconButton onClick={handleCheckClick}>
                        <CheckIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <Stack direction={'row'}>
                      <Typography variant="h4">{database.name}</Typography>
                      <IconButton onClick={handleEditClick}>
                        <EditIcon />
                      </IconButton>
                    </Stack>
                  )}              
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