import React from 'react'
import logo from '../images/logo.png'

import { FaRegSun } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";
import Badge from '@mui/material/Badge';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import {setDrawer} from '../redux/slices/cartSlice';
import {changeTheme} from '../redux/slices/themeSlice'



function Header() {

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const {products} = useSelector((store) => store.cart);
   const isLight = useSelector((store) => store.theme.isLight);

   // search bar states
   const [searchValue, setSearchValue] = useState("");
   // we already defined navigate = useNavigate()

   // icon states
   const [isMoonHovered, setIsMoonHovered] = useState(false);
   const [isSunHovered, setIsSunHovered] = useState(false);

   // for search bar
   const handleSearch = (e) => {
      if (e.key === "Enter") {
         navigate(`/search?query=${encodeURIComponent(searchValue)}`);
         setSearchValue("");
      }
   }

   // for theme change
   const applyTheme = (isLightTheme) => {
      const body = document.body;
      const head = document.getElementById("headerID");
      const name = document.getElementById("siteName");
      const input = document.getElementById("searchBar");
      const cart = document.getElementById("cartIcon");
      const productsList = document.getElementById("productList");
      const productCards = document.getElementsByClassName("product_card");
      const searchedProducts = document.getElementById("searchedProducts");

      if (isLightTheme) {
         body.style.backgroundColor = "#EFE1D1";
         productsList && (productsList.style.color = "#331D2C");

         Array.from(productCards).forEach(
            (card) => (card.style.backgroundColor = "#A78295")
         );

         searchedProducts && (searchedProducts.style.color = "#331D2C");

         head.style.backgroundColor = "#A78295";
         name.style.color = "#3F2E3E";
         input.style.borderBottomColor = "#3F2E3E";
         input.style.color = "#3F2E3E";
         cart.style.color = "#3F2E3E";
      }
      else {
         body.style.backgroundColor = "#3F2E3E";
         productsList && (productsList.style.color = "#EFE1D1");

         Array.from(productCards).forEach(
            (card) => (card.style.backgroundColor = "#331D2C")
         );

         searchedProducts && (searchedProducts.style.color = "#EFE1D1");

         head.style.backgroundColor = "#331D2C";
         name.style.color = "#EFE1D1";
         input.style.borderBottomColor = "#EFE1D1";
         input.style.color = "#EFE1D1";
         cart.style.color = "#EFE1D1";
      }
   };

   const handleThemeChange = () => {
      dispatch(changeTheme());
   };

   useEffect(() => {
      applyTheme(isLight);
   }, [isLight]);


   return (
      <div id='headerID' className='header'>
         <div className='header_left'
         onClick={() => navigate('/')}>
            <img className='logo' src={logo}/>
            <h2 id='siteName' className='site_name'>Online Shopping</h2>
         </div>
         <div className='header_right'>
            <input id='searchBar' className='search_bar' type="text" placeholder='enter item name...'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}/>

            {isLight ?
               (isMoonHovered ?
                  (<FaMoon
                     className="icon"
                     onClick={handleThemeChange}
                     onMouseLeave={() => setIsMoonHovered(false)}
                  />) :
                  (<FaRegMoon
                     className="icon"
                     onClick={handleThemeChange}
                     onMouseEnter={() => setIsMoonHovered(true)}
                     />)
               ) :
               isSunHovered ?
                  (<FaSun
                     className="icon"
                     onClick={handleThemeChange}
                     onMouseLeave={() => setIsSunHovered(false)}
                     style={{ color: "#EFE1D1" }}
                  />) :
                  (<FaRegSun
                     className="icon"
                     onClick={handleThemeChange}
                     onMouseEnter={() => setIsSunHovered(true)}
                     style={{ color: "#EFE1D1" }}
                  />)
            }

            <div onClick={() => dispatch(setDrawer())}>
               <Badge color='success' badgeContent={products.length}>
                  <FiShoppingCart id='cartIcon' className='icon' />
               </Badge>
            </div>

         </div>
      </div>
   )
}

export default Header