'use client';

import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { motion } from 'framer-motion';
import { Product } from 'domain/models';
interface FavouriteCardProps {
  item: Product;
  isFavourite: boolean;
  onAddToCart: (item: Product) => void;
  onToggleFavourite: (item: Product) => void;
  onOpenDialog: (item: Product) => void;
}

export default function FavouriteCard({
  item,
  isFavourite,
  onAddToCart,
  onToggleFavourite,
  onOpenDialog,
}: FavouriteCardProps) {
  return (
    <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.18 }}>
      <Box
        sx={{
          border: '1px solid #eee',
          borderRadius: 3,
          p: 2,
          boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          backgroundColor: '#fff',
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8, cursor: 'pointer' }}
          onClick={() => onOpenDialog(item)}
        />

        <Typography variant="subtitle1" fontWeight="600" sx={{ cursor: 'pointer' }} onClick={() => onOpenDialog(item)}>
          {item.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          ${item.price} &nbsp; | &nbsp; ⭐ {item.rating}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <motion.div whileTap={{ scale: 1.15 }}>
            <IconButton onClick={() => onAddToCart(item)} sx={{ color: 'purple' }}>
              <AddShoppingCartIcon />
            </IconButton>
          </motion.div>

          <motion.div whileTap={{ scale: 1.2 }} animate={isFavourite ? { scale: [1, 1.12, 1] } : {}}>
            <IconButton
              onClick={() => onToggleFavourite(item)}
              sx={{ color: isFavourite ? '#e41313ff' : 'grey' }}
            >
              <FavoriteIcon />
            </IconButton>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
}
