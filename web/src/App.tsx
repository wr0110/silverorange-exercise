import {
  Alert,
  Button,
  LinearProgress,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react';
import RepoTable from './components/RepoTable';

import './App.css';
import { Repo } from './models/Repo';
import Box from '@mui/material/Box';

export function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch('/repos')
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          setRepos(data);
        } else {
          setOpen(true);
        }
      })
      .catch(() => {
        setOpen(true);
        console.log('Error while fetching repositories');
      })
      .finally(() => setIsLoading(false));
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

  const [language, setLanguage] = useState('');
  const langElems = useMemo(
    () =>
      languages.map((lang, index) => (
        <Button onClick={() => setLanguage(lang)} key={index}>
          {lang}
        </Button>
      )),
    [languages]
  );

  const filteredRepos = useMemo(
    () =>
      repos.filter(
        ({ language: lang }) => language === '' || lang === language
      ),
    [repos, language]
  );

  return (
    <>
      {isLoading && (
        <Box component={LinearProgress} sx={{ display: 'fixed', top: '0px' }} />
      )}
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
        <RepoTable repos={filteredRepos} />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {langElems}
        </Stack>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Error while fetching repos
        </Alert>
      </Snackbar>
    </>
  );
}
