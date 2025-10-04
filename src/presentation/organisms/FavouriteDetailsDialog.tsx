'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Typography, Button } from '@mui/material';
import { Product } from 'domain/models';
interface ProductDetailsDialogProps {
  open: boolean;
  product: Product | null;
  isFavourite: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleFavourite: (product: Product) => void;
}

export default function FavouriteDetailsDialog({
  open,
  product,
  isFavourite,
  onClose,
  onAddToCart,
  onToggleFavourite,
}: ProductDetailsDialogProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, p: 2 } }}>
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', color: 'purple' }}>
        {product.title}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center' }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: '80%',
              maxHeight: 250,
              objectFit: 'cover',
              borderRadius: 12,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              marginBottom: 16,
            }}
          />
        </Box>
        <Typography variant="h6" sx={{ mt: 1, fontWeight: 600, color: 'purple', textAlign: 'center' }}>
          ${product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
          ⭐ {product.rating}
        </Typography>
        <Typography sx={{ mt: 2, textAlign: 'justify', lineHeight: 1.6 }}>
          {product.description || 'No description available.'}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            sx={{ bgcolor: 'purple', '&:hover': { bgcolor: '#9b30ff' } }}
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
          >
            Add to cart
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              onToggleFavourite(product);
              onClose();
            }}
          >
            {isFavourite ? 'Remove favourite' : 'Add favourite'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
