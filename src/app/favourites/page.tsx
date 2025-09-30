'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProductCard from '../../presentation/molecules/ProductCard';

export default function FavouritesPage() {
  const favouriteIds = useSelector((state: RootState) => state.favourites.ids);
  const products = useSelector((state: RootState) =>
    state.cart.items.map((i) => i) // just example
  );

  const favouriteProducts = products.filter((p: any) => favouriteIds.includes(p.id));

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '16px' }}>
      {favouriteProducts.length === 0
        ? 'No favourite products yet'
        : favouriteProducts.map((p: any) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
