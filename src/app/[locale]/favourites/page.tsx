'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '../../../presentation/molecules/ProductCard';
import { useFavourites } from '../../../hooks/useFavourites';

export default function FavouritesPage() {
  const { favourites } = useFavourites();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/products') 
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const favouriteProducts = products.filter((p: any) => favourites.includes(p.id));

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '16px' }}>
      {favouriteProducts.length === 0
        ? 'No favourite products yet'
        : favouriteProducts.map((p: any) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
