'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useCart } from '../../../hooks/useCart';
import { useTranslations } from '../../../hooks/useTranslations';
import { useDispatch } from 'react-redux';
import { toggleFavourite } from '../../../store/slices/favouritesSlice';
import { useFavourites } from '../../../hooks/useFavourites';
import { useQuery } from '@tanstack/react-query';

import CartList from '../../../presentation/organisms/CartList';
import CartTotalCard from '../../../presentation/molecules/CartTotalCard';
import UndoSnackbar from '../../../presentation/molecules/UndoSnackbar';
import { Product, CartItem } from '../../../domain/models';
import { fetchProducts } from '../../../infrastructure/api';

type DetailedCartItem = CartItem & Product;

export default function CartPage() {
  const { cart, update, remove, clear, add } = useCart();
  const t = useTranslations();
  const dispatch = useDispatch();
  const { favourites } = useFavourites();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const [snackbar, setSnackbar] = React.useState<{ open: boolean; lastItem?: DetailedCartItem }>({ open: false });

  // Merge cart items with product details
  const detailedCart: DetailedCartItem[] = cart.map((item: CartItem) => {
    const product = products.find(p => p.id === item.productId);
    return { ...product!, ...item }; // product! because product must exist
  });

  const cartTotal = detailedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (item: DetailedCartItem) => {
    remove(item.productId);
    setSnackbar({ open: true, lastItem: item });
  };

  const handleUndo = () => {
    if (snackbar.lastItem) add(snackbar.lastItem);
    setSnackbar({ open: false });
  };

  if (isLoading) return <Typography>Loading products...</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>{t('cart')}</Typography>

      {cart.length === 0 ? (
        <Typography>{t('cartEmpty') || 'Cart is empty'}</Typography>
      ) : (
        <CartList
          items={detailedCart}
          favourites={favourites}
          onIncrease={(item: DetailedCartItem) => update({ ...item, quantity: item.quantity + 1 })}
          onDecrease={(item: DetailedCartItem) => update({ ...item, quantity: item.quantity - 1 })}
          onRemove={handleRemove}
          onToggleFav={(id: number) => dispatch(toggleFavourite(id))}
          onClear={clear}
        />
      )}

      {cart.length > 0 && <CartTotalCard total={cartTotal} />}

      <UndoSnackbar
        open={snackbar.open}
        message={`${snackbar.lastItem?.title} removed from cart`}
        onUndo={handleUndo}
        onClose={() => setSnackbar({ open: false })}
      />
    </Box>
  );
}
