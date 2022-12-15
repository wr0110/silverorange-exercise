import { Paper, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import RepoTable from './components/RepoTable';

import './App.css';
import { Repo } from './models/Repo';
import Box from '@mui/material/Box';

export function App() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    fetch('/repos')
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data);
        setRepos(data);
      })
      .catch(() => {
        console.log('Error while fetching repositories');
      });
  }, []);

  return (
    <Box
      component={Paper}
      sx={{
        width: '60%',
        margin: 'auto',
        marginTop: '40px',
        height: '400px',
        padding: '16px',
      }}
    >
      <Typography align="center" variant="h4">
        SilverOrange - Exercise
      </Typography>
      <RepoTable repos={repos} />
    </Box>
  );
}
