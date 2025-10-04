'use client';
import React from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function CartTotalCard({ total }: { total: number }) {
  return (
    <motion.div
      key={total}
      initial={{ scale: 0.95, opacity: 0.7 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        padding: '16px 24px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        color: 'white',
        minWidth: 200,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 'bold',
      }}
    >
      <Typography variant="h6">Total:</Typography>
      <Typography variant="h5">${total}</Typography>
    </motion.div>
  );
}
