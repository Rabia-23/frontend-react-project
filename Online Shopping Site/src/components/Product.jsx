import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, calculateCart } from '../redux/slices/cartSlice';

import Badge from '@mui/material/Badge';

function Product({product}) {

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const {id, price, image, title, description} = product;

   // urunun sepetteki sayisi
   const cartProduct = useSelector(state => 
      state.cart.products.find(p => p.id === id)
   );

   const countInCart = cartProduct ? cartProduct.counter : 0;

   const handleAddToCart = () => {
      const payload = {
         id,
         price,
         image,
         title,
         description,
         counter: 1  // Her tiklama -> 1 tane
      };
      dispatch(addToCart(payload));
      dispatch(calculateCart());
   }

   return (
      <div className='product_card'>
         <div className='card_up'
         onClick={() => navigate('/product-details/' + id)}>
            <img src={image}/>
            <h2>{title}</h2>
            <h5>{description}</h5>
         </div>
         <div className='card_down'>
            <h2>{price} TL</h2>
            <Badge badgeContent={countInCart} color='success' invisible={countInCart === 0} overlap="rectangular">
               <button onClick={handleAddToCart}>Add to Cart</button>
            </Badge>
         </div>
      </div>
   )
}

export default Product