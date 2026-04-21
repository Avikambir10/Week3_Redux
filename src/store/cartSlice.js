import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: localStorage.getItem("CART") ? JSON.parse(localStorage.getItem("CART")) : [],
    },
    reducers: {
        addToCart: (state, req) => {
            let { cartObj } = req.payload;
            state.cart = [cartObj, ...state.cart];
            localStorage.setItem("CART", JSON.stringify(state.cart));
        },
        removeFromCart: (state, req) => {

            const itemId = req.payload;
            // Filter out the item that matches the ID
            state.cart = state.cart.filter(item => item.id !== itemId);
            localStorage.setItem("CART", JSON.stringify(state.cart));

        },
        changeQty: (state, action) => {
            const { id, type } = action.payload;
            const itemToUpdate = state.cart.find((item) => item.id === id);

            if (itemToUpdate) {
                if (type === 'Increment') {
                    itemToUpdate.qty += 1;
                } else if (type === 'Decrement' && itemToUpdate.qty > 1) {
                    itemToUpdate.qty -= 1;
                }

                localStorage.setItem("CART", JSON.stringify(state.cart));
            }
        },
    }
})

export const { addToCart, removeFromCart, changeQty } = cartSlice.actions;

export default cartSlice.reducer;