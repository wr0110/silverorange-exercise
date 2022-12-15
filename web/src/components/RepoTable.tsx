import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridEventListener, GridRowsProp } from '@mui/x-data-grid/models';
import React, { useMemo, useState } from 'react';
import { Repo } from '../models/Repo';
import RepoDetailDialog from './RepoDetailDialog';

function RepoTable({ repos }: { repos: Repo[] }) {
  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'description', headerName: 'Description', flex: 2 },
      { field: 'forksCount', headerName: 'Forks Count', flex: 1 },
      { field: 'createdAt', headerName: 'Created At', hide: true },
    ],
    []
  );

  const rows: GridRowsProp = useMemo(
    () =>
      repos.map(({ name, description, forks_count: forksCount }, index) => ({
        id: `${index} - ${name}`,
        name,
        description,
        forksCount,
      })),
    [repos]
  );

  const [selectedRepo, setSelectedRepo] = useState<Repo>();
  const [open, setOpen] = useState(false);

  const handleRowClick: GridEventListener<'rowClick'> = ({ row }) => {
    setOpen(true);
    setSelectedRepo(repos.find(({ name }) => row.name === name));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box my={4}>
      <DataGrid
        sx={{
          '& .MuiDataGrid-row': {
            cursor: 'pointer',
          },
        }}
        rows={rows}
        columns={columns}
        rowHeight={50}
        autoHeight={true}
        sortModel={[{ field: 'createdAt', sort: 'desc' }]}
        onRowClick={handleRowClick}
      />

      {selectedRepo && (
        <RepoDetailDialog
          open={open}
          onClose={handleClose}
          repo={selectedRepo}
        />
      )}
    </Box>
  );
}

export default RepoTable;
