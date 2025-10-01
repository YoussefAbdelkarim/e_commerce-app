'use client';

import React from 'react';
import ProductCard from '../../presentation/molecules/ProductCard';
import { useFavourites } from '../../hooks/useFavourites';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function FavouritesPage() {
  const { favourites } = useFavourites(); // use the custom hook
  const products = useSelector((state: RootState) =>
    state.cart.items.map((i) => i) // replace with your real products if needed
  );

  const favouriteProducts = products.filter((p: any) => favourites.includes(p.id));

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '16px' }}>
      {favouriteProducts.length === 0
        ? 'No favourite products yet'
        : favouriteProducts.map((p: any) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
