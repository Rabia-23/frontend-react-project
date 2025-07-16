import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProductDetails from '../components/ProductDetails'
import SearchedProducts from '../components/SearchedProducts'
import Home from '../pages/Home'

function RouterConfig() {
   return (
      <div>
         <Routes>
         <Route path='/' element = {<Home/>}/>
         <Route path='/product-details/:id' element = {<ProductDetails/>}/>
         <Route path='/search' element = {<SearchedProducts/>}/>
         </Routes>
      </div>
   )
}

export default RouterConfig