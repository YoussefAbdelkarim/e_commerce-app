'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../../../hooks/useCart';
import { useTranslations } from '../../../hooks/useTranslations';

export default function CartPage() {
  const { cart, update, remove, clear } = useCart();
  const t = useTranslations();

  const [products, setProducts] = useState<any[]>([]);

  // Fetch all products from backend
  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Merge cart items with full product details
  const detailedCart = cart.map((item: any) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...product, ...item }; // item fields (quantity) overwrite product if needed
  });

  console.log("🛒 Detailed Cart:", detailedCart);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t('cart')}
      </Typography>

      {cart.length === 0 ? (
        <Typography>{t('cartEmpty') || 'Cart is empty'}</Typography>
      ) : (
        <Stack spacing={2}>
          {detailedCart.map((item: any) => (
            <Box
              key={item.productId}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #ccc',
                borderRadius: '6px',
                p: 1,
                gap: 2,
              }}
            >
              {/* Product details */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  flex: 1,
                }}
              >
                <Box>
                  <Typography variant="subtitle1">
                    {t('name')}: {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('price')}: {item.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('description')}: {item.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('rating')}: {item.rating}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('quantity')}: {item.quantity}
                  </Typography>
                </Box>
              </Box>

              {/* Quantity controls */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {item.quantity > 1 && (
                  <IconButton
                    size="small"
                    onClick={() =>
                      update({ ...item, quantity: item.quantity - 1 })
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
                <Typography>{item.quantity}</Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    update({ ...item, quantity: item.quantity + 1 })
                  }
                >
                  <AddIcon />
                </IconButton>
              </Box>

              {/* Remove button */}
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
