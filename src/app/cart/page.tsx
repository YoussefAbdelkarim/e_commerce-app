'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeItem, updateQuantity } from '../../store/slices/cartSlice';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '16px' }}>
      {cartItems.length === 0 ? (
        'Cart is empty'
      ) : (
        cartItems.map((item) => (
          <div
            key={item.productId}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid #ccc',
              borderRadius: '6px',
              padding: '8px',
              marginBottom: '8px',
            }}
          >
            <div>{item.name}</div>
            <input
              type="number"
              value={item.quantity}
              style={{ width: '60px' }}
              onChange={(e) =>
                dispatch(updateQuantity({ ...item, quantity: Number(e.target.value) }))
              }
            />
            <button onClick={() => dispatch(removeItem(item.productId))}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}
