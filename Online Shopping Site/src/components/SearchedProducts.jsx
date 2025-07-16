import React from 'react'
import { useSelector } from 'react-redux';
import { useSearchParams} from 'react-router-dom';
import Product from './Product';

function SearchedProducts() {

   const {products} = useSelector((store) => store.product);
   const [searchParams] = useSearchParams();

   // parametre varsa harfleri kucuge cevir yoksa bos string dondur
   const query = searchParams.get("query") ? searchParams.get("query").toLowerCase() : "";

   const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));

   return (
      <div id='searchedProducts' className='searched_products'>
         {filteredProducts.length > 0 ? // eger uygun product bulunduysa
            filteredProducts.map((product) => (
               <Product key={product.id} product = {product}/>
            ))
            : // eger uygun product hic bulunmadiysa
            <h3>No product for {query}</h3>
         }
      </div>
   )
}

export default SearchedProducts