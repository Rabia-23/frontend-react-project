import React from 'react'
import { useNavigate } from 'react-router-dom'

function Product({product}) {

   const navigate = useNavigate();

   const {id, price, image, title, description} = product;

   return (
      <div className='product_card'>
         <div className='card_up'
         onClick={() => navigate('/product-details/' + id)}>
            <img src={image}/>
            <h2>{title}</h2>
         </div>
         <div className='card_down'>
            <h5>{description}</h5>
            <h2>{price} TL</h2>
         </div>
      </div>
   )
}

export default Product