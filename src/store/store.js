import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';


export let store = configureStore({
    reducer: {
        cartStore: cartSlice,
    },
});