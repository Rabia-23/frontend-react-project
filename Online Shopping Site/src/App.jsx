import React, { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import ProductList from './components/ProductList'
import RouterConfig from './config/RouterConfig'
import Drawer from '@mui/material/Drawer';
import { calculateCart, setDrawer, deleteFromCart } from './redux/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './components/Loading'


function App() {

   const {products, drawer, totalAmount} = useSelector((store) => store.cart);
   const dispatch = useDispatch();

   const deleteCart = (id) => {
      dispatch(deleteFromCart(id));
      dispatch(calculateCart());
   }

   useEffect(()=> {
      dispatch(calculateCart());
   }, [])

   return (
      <div>
         <Header/>
         <RouterConfig/>
         <Loading/>
         <Drawer anchor='right' open={drawer} onClose={() => dispatch(setDrawer())}
         PaperProps={{
            sx: {
              backgroundColor: "#EFE1D1",
              color: "#331D2C"
            }
         }}>
            {
               products && products.map((product) => {
                  return (
                     <div key={product.id}>
                        <div style={{padding: '19px'}} className='drawer'>
                           <img style={{marginRight: '23px'}} src={product.image} width={55} height={55}/>
                           <p style={{width: '320px', }}>{product.title} ({product.counter})</p>
                           <p style={{marginRight: '23px', fontWeight: "bold"}}>{product.price} TL </p>
                           <button className='delete_btn'
                           onClick={() => deleteCart(product.id)}
                           >Delete</button>
                        </div>
                     </div>
                  )
               })
            }
            <div>
               <h3 style={{marginLeft: '213px', marginTop: "37px", color: "rgb(63, 46, 62)"}}>Total Amount: {totalAmount.toFixed(2)} TL</h3>
            </div>
            </Drawer>
      </div>
   )
}

export default App