import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, setSelectedProduct } from '../redux/slices/productSlice';
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { addToCart, calculateCart } from '../redux/slices/cartSlice';

function ProductDetails() {
   const dispatch = useDispatch();
   const { id } = useParams();
   const { products, selectedProduct, loading } = useSelector((store) => store.product);
   const isLight = useSelector((store) => store.theme.isLight);

   const { price = 0, image, title, description } = selectedProduct;

   const [counter, setCounter] = useState(0);
   const [totalPrice, setTotalPrice] = useState(0);

   const increment = () => setCounter(counter + 1);
   const decrement = () => {
      if (counter > 0) setCounter(counter - 1);
   };

   const addCart = () => {
      const payload = {
         id,
         price,
         image,
         title,
         description,
         counter
      };
      dispatch(addToCart(payload));
      dispatch(calculateCart());
   };

   useEffect(() => {
      const product = products?.find((p) => p.id == id);
      if (product) {
         dispatch(setSelectedProduct(product));
      } else { // ürün yoksa API'den getir
         dispatch(getProductById(id));
      }
   }, [products, id, dispatch]);

   useEffect(() => {
      setTotalPrice(counter * price);
   }, [counter, price]);

   if (loading) {
      return <p>Loading...</p>
   }

   return (
      <div id='detailCard' className='detail_card' style={{color: isLight ? "#3F2E3E" : "#EFE1D1"}}>
         <div className='detail_card_left'>
            <img src={image} />
         </div>
         <div id='detailCardRight' className='detail_card_right' style={{color: isLight ? "#3F2E3E" : "#EFE1D1"}}>
            <h1>{title}</h1>
            <h4>{description}</h4>

            {counter > 0
               ? <h1 style={{ marginTop: "53px", color: "rgb(136, 171, 142)" }}>{totalPrice.toFixed(2)} TL</h1>
               : <h1 style={{ marginTop: "53px" }}>{price} TL</h1>
            }

            <div className='counter'>
               <CiCircleMinus className='counter_icons' onClick={decrement} />
               <h2>{counter}</h2>
               <CiCirclePlus className='counter_icons' onClick={increment} />
            </div>
            {counter > 0
               ? <button className='add_to_cart_btn'
               onClick={addCart}>Add to Cart</button> : <div></div>
            }
         </div>
      </div>
   );
}

export default ProductDetails;
