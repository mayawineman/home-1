import React, { CSSProperties, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

interface DeleteDbButtonProps {
  dbId: string | undefined;
  style?: CSSProperties;
}

const DeleteDbButton: React.FC<DeleteDbButtonProps> = ({ dbId, style }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    if (!dbId) {
        console.error('Db id is missing');
        return;
    }
    axios.delete(`${API_URL}/databases/${dbId}`)
      .then(() => {
        navigate(`/`);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button style={style} variant="contained" color="error" onClick={handleOpen}>Delete</Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this database?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDbButton;