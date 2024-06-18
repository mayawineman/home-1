import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import { Database } from '../../types/Database';

interface DatabaseFormProps {
  onSubmit: (database: Database) => void;
}

const DatabaseForm: React.FC<DatabaseFormProps> = ({ onSubmit }) => {
  const [formState, setFormState] = useState({
    name: '',
    url: '',
    username: '',
    password: '',
    type: 'Snowflake'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDatabase = {
      ...formState,
      id: Date.now().toString()
    };
    await axios.post('http://localhost:4000/databases', newDatabase);
    onSubmit(newDatabase as Database);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Database Name"
        name="name"
        value={formState.name}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="URL"
        name="url"
        value={formState.url}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Username"
        name="username"
        value={formState.username}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formState.password}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Type"
        name="type"
        value={formState.type}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      >
        <MenuItem value="Snowflake">Snowflake</MenuItem>
        <MenuItem value="Trino">Trino</MenuItem>
        <MenuItem value="MySQL">MySQL</MenuItem>
      </TextField>
      <Button type="submit" color="primary" variant="contained" fullWidth>
        Add Database
      </Button>
    </form>
  );
};

export default DatabaseForm;