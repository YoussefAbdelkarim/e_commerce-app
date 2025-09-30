// // src/store/slices/cartSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { CartItem } from '@/domain/models';



// type CartState = { items: CartItem[] };
// const initialState: CartState = { items: [] };


// const cartSlice = createSlice({
// name: 'cart',
// initialState,
// reducers: {
// addItem(state, action: PayloadAction<CartItem>) {
// const ex = state.items.find((i) => i.productId === action.payload.productId);
// if (ex) ex.quantity += action.payload.quantity;
// else state.items.push(action.payload);
// },
// updateQuantity(state, action: PayloadAction<CartItem>) {
// const ex = state.items.find((i) => i.productId === action.payload.productId);
// if (ex) ex.quantity = action.payload.quantity;
// },
// removeItem(state, action: PayloadAction<number>) {
// state.items = state.items.filter((i) => i.productId !== action.payload);
// },
// clearCart(state) {
// state.items = [];
// },
// },
// });


// export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
// src/store/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../domain/models';

type CartState = { items: CartItem[] };
const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const ex = state.items.find((i) => i.productId === action.payload.productId);
      if (ex) ex.quantity += action.payload.quantity;
      else state.items.push(action.payload);
    },
    updateQuantity(state, action: PayloadAction<CartItem>) {
      const ex = state.items.find((i) => i.productId === action.payload.productId);
      if (ex) ex.quantity = action.payload.quantity;
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
