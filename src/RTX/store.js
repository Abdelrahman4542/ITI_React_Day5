import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './Slices/Products'
import cartReducer from "./Slices/CartSlice.js"
export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer
    },
})