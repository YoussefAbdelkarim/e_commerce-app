'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice';
import { toggleFavourite } from '../../store/slices/favouritesSlice';

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '12px',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <div style={{ height: '100px', backgroundColor: '#eee' }} />
      <div style={{ fontWeight: 'bold' }}>{product.name}</div>
      <div>${product.price}</div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => dispatch(addItem({ ...product, quantity: 1 }))}>
          Add
        </button>
        <button onClick={() => dispatch(toggleFavourite(product.id))}>Fav</button>
      </div>
    </div>
  );
}
