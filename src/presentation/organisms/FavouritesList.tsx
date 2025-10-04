'use client';

import React from 'react';
import { Box } from '@mui/material';
import FavouriteCard from '../molecules/FavouriteCard';
import { Product } from 'domain/models';

interface FavouritesListProps {
  items: Product[];
  favourites: number[];
  onAddToCart: (item: Product) => void;
  onToggleFavourite: (item: Product) => void;
  onOpenDialog: (item: Product) => void;
}

export default function FavouritesList({
  items,
  favourites,
  onAddToCart,
  onToggleFavourite,
  onOpenDialog,
}: FavouritesListProps) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 2 }}>
      {items.map((item) => (
        <FavouriteCard
          key={item.id}
          item={item} // <-- fixed here
          isFavourite={favourites.includes(item.id)}
          onAddToCart={onAddToCart}
          onToggleFavourite={onToggleFavourite}
          onOpenDialog={onOpenDialog}
        />
      ))}
    </Box>
  );
}
