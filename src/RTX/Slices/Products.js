import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProducts = createAsyncThunk("products/setProducts", async () => {
    let { data } = await axios.get("https://dummyjson.com/products");
    return data.products
})

export const productsSlice = createSlice({
    initialState: [],
    name: "products",
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const { setProducts } = productsSlice.actions

export default productsSlice.reducer

