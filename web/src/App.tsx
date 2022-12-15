import { Button, Paper, Stack, Typography } from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react';
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
        setRepos(data);
      })
      .catch(() => {
        console.log('Error while fetching repositories');
      });
  }, []);

  const languages = useMemo(
    () =>
      repos.reduce(
        (acc, { language }) =>
          acc.findIndex((value) => value === language) === -1
            ? [...acc, language]
            : acc,
        [] as string[]
      ),
    [repos]
  );

  const langElems = useMemo(
    () => languages.map((lang, index) => <Button key={index}>{lang}</Button>),
    [languages]
  );

  return (
    <Box
      component={Paper}
      sx={{
        width: '60%',
        margin: 'auto',
        marginY: '40px',
        padding: '16px',
      }}
    >
      <Typography align="center" variant="h4">
        SilverOrange - Exercise
      </Typography>
      <RepoTable repos={repos} />
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        {langElems}
      </Stack>
    </Box>
  );
}
