'use client';
import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: '#1976d2',
        color: 'white',
      }}
    >
      <div>My E-Commerce</div>
      <nav style={{ display: 'flex', gap: '16px' }}>
        <Link href="/">Home</Link>
        <Link href="/favourites">Favourites</Link>
        <Link href="/cart">Cart</Link>
      </nav>
    </header>
  );
}
