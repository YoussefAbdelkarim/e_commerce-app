'use client';
import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Header() {
  const locale = useLocale(); // ✅ get the current locale

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
        <Link href={`/${locale}`}>Home</Link>
        <Link href={`/${locale}/favourites`}>Favourites</Link>
        <Link href={`/${locale}/cart`}>Cart</Link>
      </nav>
    </header>
  );
}
