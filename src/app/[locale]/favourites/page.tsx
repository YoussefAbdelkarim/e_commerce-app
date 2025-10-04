'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack, Snackbar, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useFavourites } from '../../../hooks/useFavourites';
import { useCart } from '../../../hooks/useCart';
import { useDispatch } from 'react-redux';
import { toggleFavourite, clearFavourites } from '../../../store/slices/favouritesSlice';
import FavouritesList from '../../../presentation/organisms/FavouritesList';
import FavouriteDetailsDialog from '../../../presentation/organisms/FavouriteDetailsDialog';
import { Product, CartItem } from '../../../domain/models';

export default function FavouritesPage() {
  const { favourites } = useFavourites();
  const { cart, add } = useCart();
  const dispatch = useDispatch();

  const [products, setProducts] = useState<Product[]>([]);
  const [snackbar, setSnackbar] = useState<{ open: boolean; msg: string }>({ open: false, msg: '' });
  const [selected, setSelected] = useState<Product | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [lastRemoved, setLastRemoved] = useState<Product | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  const favouriteProducts: Product[] = products.filter(p => favourites.includes(p.id));

  const handleAddToCart = (item: Product) => {
    const alreadyInCart = cart.some((cartItem: CartItem) => cartItem.productId === item.id);
    if (alreadyInCart) {
      setSnackbar({ open: true, msg: `${item.title} is already in your cart ⚠️` });
      return;
    }
    const payload: CartItem = { ...item, productId: item.id, quantity: 1 };
    add(payload);
    setSnackbar({ open: true, msg: `${item.title} added to cart successfully` });
  };

  const handleToggleFavourite = (item: Product) => {
    const isFav = favourites.includes(item.id);
    if (isFav) setLastRemoved(item);
    else setLastRemoved(null);
    dispatch(toggleFavourite(item.id));
    setSnackbar({ open: true, msg: isFav ? `${item.title} removed 💔` : `${item.title} added ❤️` });
  };

  const handleUndo = () => {
    if (lastRemoved) dispatch(toggleFavourite(lastRemoved.id));
    setLastRemoved(null);
    setSnackbar({ open: false, msg: '' });
  };

  const handleClearAll = () => setConfirmOpen(true);
  const confirmClearAll = () => {
    dispatch(clearFavourites());
    setConfirmOpen(false);
    setSnackbar({ open: true, msg: 'All favourites cleared 💔' });
  };

  if (favouriteProducts.length === 0)
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h6" color="text.secondary">No favourite products yet 💜</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => (window.location.href = '/')}>Browse Products</Button>
      </Box>
    );

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold">Your Favourites ❤️</Typography>
        <Button variant="outlined" color="error" onClick={handleClearAll}>Clear All Favourites</Button>
      </Box>

      <FavouritesList
        items={favouriteProducts}
        favourites={favourites}
        onAddToCart={handleAddToCart}
        onToggleFavourite={handleToggleFavourite}
        onOpenDialog={setSelected}
      />

      <FavouriteDetailsDialog
        open={!!selected}
        product={selected}
        isFavourite={selected ? favourites.includes(selected.id) : false}
        onClose={() => setSelected(null)}
        onAddToCart={handleAddToCart}
        onToggleFavourite={handleToggleFavourite}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={() => setSnackbar({ open: false, msg: '' })}
        message={snackbar.msg}
        action={lastRemoved ? <Button color="secondary" size="small" onClick={handleUndo}>UNDO</Button> : null}
      />

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Clear all favourites?</DialogTitle>
        <DialogContent sx={{ display: 'flex', gap: 1, pt: 2 }}>
          <Button variant="contained" color="error" onClick={confirmClearAll}>Yes, clear all</Button>
          <Button variant="outlined" onClick={() => setConfirmOpen(false)}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
