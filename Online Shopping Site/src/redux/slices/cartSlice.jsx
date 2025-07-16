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
         const findProduct = state.products && state.products.find((product) => product.id === action.payload.id);
          if (findProduct) { // daha onceden eklenmistir
            // olan urunu cikar
            const extractedProducts = state.products.filter((product)=> product.id != action.payload.id)
            // olan urun uzerinden guncelleme yap -> count arttir
            findProduct.counter += action.payload.counter;
            // local storage'a olan urunun guncellenmis halini ve cikarilmi slisteyi birlestirerek ekle boylelikle liste guncellenmis olur
            state.products = [...extractedProducts, findProduct];
            writeFromCartToStorage(state.products);
          }
          else { // daha once eklenmemistir
            // yeni urun ile ile onceki urunler birlestirilip yeni liste olustururlur, local storage'a yazilir boylelikle liste guncellenmis olur
            state.products = [...state.products, action.payload];
            writeFromCartToStorage(state.products);
          }
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