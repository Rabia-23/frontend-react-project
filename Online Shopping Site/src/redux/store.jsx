import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
   reducer: {
      product: productReducer,
      cart: cartReducer,
      theme: themeReducer
   }
})