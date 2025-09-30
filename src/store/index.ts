// src/store/index.ts
'use client';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import favouritesReducer from './slices/favouritesSlice';


export const store = configureStore({
reducer: {
cart: cartReducer,
favourites: favouritesReducer,
},
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

