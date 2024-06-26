import React, { useEffect, useState } from 'react';
import { Container, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import DatabaseTable from '../../components/DatabaseTable/DatabaseTable';
import DatabaseForm from '../../components/DatabaseForm/DatabaseForm';
import { Database } from '../../types/Database';
import { API_URL, REFRESH_INTERVAL } from '../../constants';

const DatabaseListPage: React.FC = () => {
  const [databases, setDatabases] = useState<Database[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDatabases = () => {
      axios.get(API_URL + '/databases')
        .then(response => {
          setDatabases(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    };

    fetchDatabases();
    const intervalId = setInterval(fetchDatabases, REFRESH_INTERVAL); // Fetch every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleFormSubmit = (newDb: Database) => {
      setOpen(false);
      setIsLoading(true);
  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        + Add New Database
      </Button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DatabaseTable databases={databases} />
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Database</DialogTitle>
        <DialogContent>
          <DatabaseForm onSubmit={handleFormSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DatabaseListPage;
