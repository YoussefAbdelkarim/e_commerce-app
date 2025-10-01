'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../infrastructure/api';
import ProductCard from '../../presentation/molecules/ProductCard';
import { Box, Typography, Stack } from '@mui/material';
import { useTranslations } from '../../hooks/useTranslations';

export default function HomePage() {
  const t = useTranslations();

  const { data: products = [], isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts
});
  if (isLoading) return <Typography>{t('loading') || 'Loading...'}</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t('products')}
      </Typography>

      <Stack direction="row" flexWrap="wrap" spacing={2}>
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Stack>
    </Box>
  );
}
