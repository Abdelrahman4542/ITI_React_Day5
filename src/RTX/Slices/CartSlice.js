import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error("Could not load cart from localStorage", err);
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error("Could not save cart to localStorage", err);
  }
};

export const cartSlice = createSlice({
  initialState: loadCartFromStorage(),
  name: "cart",
  reducers: {
    addToCart: (state, action) => {
      const existedProduct = state.find((p) => p.id === action.payload.id);
      if (existedProduct) {
        existedProduct.quantity += 1;
      } else {
        const newProduct = { ...action.payload, quantity: 1 };
        state.push(newProduct);
      }
      saveCartToStorage(state);
    },
    removeFromCart: (state, action) => {
      const newState = state.filter((p) => p.id !== action.payload.id);
      saveCartToStorage(newState);
      return newState;
    },
    ClearCart: () => {
      saveCartToStorage([]);
      return [];
    },
    updateQuantity: (state, action) => {
      const product = state.find((p) => p.id === action.payload.id);
      if (product) {
        product.quantity += action.payload.change;
        saveCartToStorage(state);
      }
    },
    setCart: (state, action) => {
      saveCartToStorage(action.payload);
      return action.payload;
    }
  }
});

export const { addToCart, removeFromCart, ClearCart, updateQuantity, setCart } = cartSlice.actions;
export default cartSlice.reducer;