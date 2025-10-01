'use client';

import React from 'react';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { useCart } from '../../../hooks/useCart';
import { useTranslations } from '../../../hooks/useTranslations';

export default function CartPage() {
  const { cart, update, remove, clear } = useCart();
  const t = useTranslations();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t('cart')}
      </Typography>

      {cart.length === 0 ? (
        <Typography>{t('cartEmpty') || 'Cart is empty'}</Typography>
      ) : (
        <Stack spacing={2}>
          {cart.map((item: any) => (
            <Box
              key={item.productId}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #ccc',
                borderRadius: '6px',
                p: 1,
              }}
            >
              <Typography>{item.name}</Typography>

              <TextField
                type="number"
                value={item.quantity}
                size="small"
                sx={{ width: '60px' }}
                onChange={(e) =>
                  update({ ...item, quantity: Number(e.target.value) })
                }
              />

              <Button
                variant="contained"
                color="secondary"
                onClick={() => remove(item.productId)}
              >
                {t('remove')}
              </Button>
            </Box>
          ))}

          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            onClick={clear}
          >
            {t('clearCart')}
          </Button>
        </Stack>
      )}
    </Box>
  );
}
