import {createSlice} from '@reduxjs/toolkit'
import { act } from 'react';
import { productSlice } from './productSlice';

const getCartFromStorage = () => {
   if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
   }
   return [];
}

const initialState = {
   products: getCartFromStorage(),
   drawer: false,
   totalAmount: 0
}

const writeFromCartToStorage = (cart) => {
   localStorage.setItem('cart', JSON.stringify(cart))
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const productIndex = state.products.findIndex(p => p.id === action.payload.id);
         if (productIndex >= 0) {
            const updatedProduct = {
               ...state.products[productIndex],
               counter: state.products[productIndex].counter + action.payload.counter,
            };
            state.products = [
               ...state.products.slice(0, productIndex),
               updatedProduct,
               ...state.products.slice(productIndex + 1)
            ];
         } else {
            state.products.push(action.payload);
         }
         writeFromCartToStorage(state.products);
      },
      
       

      deleteFromCart: (state, action) => {
         const newProducts = state.products.filter(
            (product) => product.id != action.payload
         );
         state.products = [...newProducts];
         writeFromCartToStorage(state.products);
      },      

      setDrawer: (state) => {
         state.drawer = !state.drawer;
      },

      calculateCart: (state) => {
         state.totalAmount=0;
         state.products && state.products.map((product) => {
            state.totalAmount += product.price * product.counter;
         })
      }
   }
})

export const { addToCart, setDrawer, calculateCart, deleteFromCart } = cartSlice.actions
export default cartSlice.reducer