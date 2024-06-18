import React from 'react';
import { Avatar, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Database } from '../../types/Database';
import { alpha } from '@mui/system';
import { blue } from '@mui/material/colors';
import DatabaseIcon from '@mui/icons-material/Storage';
import DeleteDbButton from '../DeleteDbButton/DeleteDbButton';

interface DatabaseTableProps {
  databases: Database[];
}

const DatabaseTable: React.FC<DatabaseTableProps> = ({ databases }) => {
  const navigate  = useNavigate();

  const handleRowClick = (id: string) => {
    // user will be navigated to the specific db detail page
    navigate(`/database/${id}`);
  };

  return (
    <Table>
      <TableHead>
        <TableRow sx={{ fontWeight: 'bold' }}>
          <TableCell>Database Name</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Type</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {databases.map((db) => (
          <TableRow key={db.id} 
          sx={{ 
            '&:hover': {
              backgroundColor: alpha(blue[500], 0.1),
            },
            backgroundColor: alpha(blue[500], 0.05),
          }}>
            <TableCell>
            <Box style={{ cursor: 'pointer' }} display="flex" alignItems="center" onClick={() => handleRowClick(db.id)}>
              <Avatar sx={{ backgroundColor: 'primary.main', marginRight: 1, width: 20, height: 20 }}>
                <DatabaseIcon sx={{ width: 15, height: 15 }} />
              </Avatar>
              {db.name}
            </Box>
            </TableCell>
            <TableCell>{db.username}</TableCell>
            <TableCell>{db.type}</TableCell>
            <TableCell style={{display: 'flex', justifyContent:'flex-end'}}>
              <DeleteDbButton dbId={db.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DatabaseTable;
