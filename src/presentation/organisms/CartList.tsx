// src/presentation/organisms/CartList.tsx
import React from 'react';
import { Stack, Button } from '@mui/material';
import CartItemCard from '../molecules/CartItemCard';
import { Product ,CartItem} from 'domain/models';

export type DetailedCartItem = CartItem & Product;

interface CartListProps {
  items: DetailedCartItem[];
  favourites: number[];
  onIncrease: (item: DetailedCartItem) => void;
  onDecrease: (item: DetailedCartItem) => void;
  onRemove: (item: DetailedCartItem) => void;
  onToggleFav: (id: number) => void;
  onClear: () => void;
}

export default function CartList({
  items,
  favourites,
  onIncrease,
  onDecrease,
  onRemove,
  onToggleFav,
  onClear,
}: CartListProps) {
  return (
    <Stack spacing={2} sx={{ mb: 12 }}>
      {items.map((item) => (
        <CartItemCard
          key={item.productId}
          item={item}
          onIncrease={() => onIncrease(item)}
          onDecrease={() => onDecrease(item)}
          onRemove={() => onRemove(item)}
          onToggleFav={() => onToggleFav(item.productId)}
          isFavourite={favourites.includes(item.productId)}
        />
      ))}

      <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={onClear}>
        Clear Cart
      </Button>
    </Stack>
  );
}
