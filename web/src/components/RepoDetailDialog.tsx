import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Repo } from '../models/Repo';
import CircularProgress from '@mui/material/CircularProgress';

function RepoDetailDialog({
  repo: {
    name,
    updated_at: updatedAt,
    owner: { login },
    full_name: fullName,
  },
  open,
  onClose,
}: {
  repo: Repo;
  open: boolean;
  onClose: () => void;
}) {
  const [markDownContent, setMarkDownContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://raw.githubusercontent.com/${fullName}/master/README.md`)
      .then((res) => res.json())
      .then((content) => {
        setMarkDownContent(content);
      })
      .catch(() => setMarkDownContent(null))
      .finally(() => setIsLoading(false));
  }, [fullName]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <Stack justifyContent="center" spacing={2}>
          <Typography>Most Recent Commit Date: {updatedAt}</Typography>
          <Typography>Author: {login}</Typography>
          <Typography>
            Message: there's not approach to find commit hash value
          </Typography>
          {isLoading ? (
            <CircularProgress />
          ) : markDownContent ? (
            <>
              <Typography align="center">MarkDown Content</Typography>
              <ReactMarkdown>{markDownContent}</ReactMarkdown>
            </>
          ) : (
            <Typography align="center">No README.md file</Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Return to the MAIN list
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

export default RepoDetailDialog;
