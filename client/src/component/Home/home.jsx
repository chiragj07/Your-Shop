import React, {useState, useEffect} from 'react'
//import axios from 'axios';
import Products from '../products/Products';
import './home.css'
import SHOP_DATA from '../../assets/shop.js';


const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        setProducts(SHOP_DATA);
    }, [])


    return (
        <div className='categ-container'>
            {products.map(product => <Products key={product.id} {...product} /> )}
        </div>
    )
}

export default Home
