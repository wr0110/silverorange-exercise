import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridRowsProp } from '@mui/x-data-grid/models';
import React, { useMemo } from 'react';
import { Repo } from '../models/Repo';

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

  return (
    <Box my={4} height={400}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={50}
        autoHeight={true}
        sortModel={[{ field: 'createdAt', sort: 'desc' }]}
      />
    </Box>
  );
}

export default RepoTable;
