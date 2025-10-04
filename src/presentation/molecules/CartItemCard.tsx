'use client';
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';
import { CartItem } from 'domain/models';
interface CartItemCardProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  onToggleFav: () => void;
  isFavourite: boolean;
}

export default function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onToggleFav,
  isFavourite,
}: CartItemCardProps) {
  return (
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
      {/* Product details with image */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 6 }}
          />
        )}
        <Box>
          <Typography variant="subtitle1">{item.title}</Typography>
          <Typography variant="body2" color="text.secondary">${item.price}</Typography>
          <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
          <Typography variant="body2" color="text.secondary">Subtotal: ${item.price * item.quantity}</Typography>
        </Box>
      </Box>

      {/* Quantity controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {item.quantity > 1 && (
          <IconButton size="small" onClick={onDecrease}>
            <RemoveIcon />
          </IconButton>
        )}

        <Typography variant="h6" sx={{ minWidth: 20, textAlign: 'center' }}>
          <motion.span
            key={item.quantity}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {item.quantity}
          </motion.span>
        </Typography>

        <IconButton size="small" onClick={onIncrease}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* Favourite button */}
      <IconButton onClick={onToggleFav} sx={{ color: isFavourite ? '#e41313ff' : 'grey' }}>
        <FavoriteIcon fontSize="large" />
      </IconButton>

      {/* Remove button */}
      <IconButton onClick={onRemove} sx={{ color: 'purple' }}>
        <DeleteIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}
