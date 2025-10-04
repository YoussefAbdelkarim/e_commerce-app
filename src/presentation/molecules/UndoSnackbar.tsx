'use client';
import React from 'react';
import { Snackbar, Button } from '@mui/material';

interface UndoSnackbarProps {
  open: boolean;
  message: string;
  onUndo: () => void;
  onClose: () => void;
}

export default function UndoSnackbar({ open, message, onUndo, onClose }: UndoSnackbarProps) {
  return (
    <Snackbar
      open={open}
      message={message}
      action={<Button color="secondary" onClick={onUndo}>Undo</Button>}
      autoHideDuration={3000}
      onClose={onClose}
    />
  );
}
