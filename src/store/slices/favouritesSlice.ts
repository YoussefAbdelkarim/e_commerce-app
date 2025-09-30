// src/store/slices/favouritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type FavsState = { ids: number[] };
const initialState: FavsState = { ids: [] };


const slice = createSlice({
name: 'favourites',
initialState,
reducers: {
toggleFavourite(state, action: PayloadAction<number>) {
const id = action.payload;
if (state.ids.includes(id)) state.ids = state.ids.filter((x) => x !== id);
else state.ids.push(id);
},
setFavourites(state, action: PayloadAction<number[]>) {
state.ids = action.payload;
},
clearFavourites(state) {
state.ids = [];
},
},
});


export const { toggleFavourite, setFavourites, clearFavourites } = slice.actions;
export default slice.reducer;