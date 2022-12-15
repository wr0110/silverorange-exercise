import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { Repo } from '../models/Repo';

function RepoDetailDialog({
  repo: {
    name,
    updated_at: updatedAt,
    owner: { login },
  },
  open,
  onClose,
}: {
  repo: Repo;
  open: boolean;
  onClose: (value: string) => void;
}) {
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
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default RepoDetailDialog;