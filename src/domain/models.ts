// src/domain/models.ts
export interface Product {
id: number;
title: string;
description: string;
price: number;
image?: string;
category?: string;
rating?: number;
stock?: number;
favourite?: boolean;
}


export interface CartItem {
productId: number;
  name: string;      // add this
  price: number;     // optional if you want
  quantity: number;
}