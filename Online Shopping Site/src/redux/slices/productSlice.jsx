import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
   products: [],
   selectedProduct: {},
   loading: false
};

const BASE_URL = "https://fakestoreapi.com";

export const getAllProducts = createAsyncThunk(
   "getAllProducts",
   async () => {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data;
   }
);

export const getProductById = createAsyncThunk(
   "getProductById",
   async (id) => {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
   }
);

export const productSlice = createSlice({
   name: "product",
   initialState,
   reducers: {
      setSelectedProduct: (state, action) => {
         state.selectedProduct = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(getAllProducts.pending, (state) => {
            state.loading = true;
         })
         .addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
         })
         .addCase(getProductById.pending, (state) => {
            state.loading = true;
         })
         .addCase(getProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedProduct = action.payload;
         })
         .addCase(getProductById.rejected, (state) => {
            state.loading = false;
         });
   }
});

export const { setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
