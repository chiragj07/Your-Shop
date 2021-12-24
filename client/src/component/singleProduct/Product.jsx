import React from 'react'
import { addToCart } from '../../redux/cart/cart.action';
// import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import './Product.css'
const Product = (props) => {
   const dispatch = useDispatch();
   const addProduct = ()=>{
       dispatch(addToCart(props));
   }
    const {name, imageUrl, price} = props;

    return (
        <div className='product-container'>
            <img src={imageUrl} alt={name}  height="210px" width= "220px"/>
            <h3>{name}</h3>
            <h2>${price}</h2>
            <button className='cart-btn' onClick={addProduct} >Add To Cart</button>
        </div>
    )
}

export default Product
