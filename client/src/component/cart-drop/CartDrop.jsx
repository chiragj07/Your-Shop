import React from 'react'
import NavCart from '../navCart/NavCart';
import {useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

import './cartdrop.css'
const CartDrop = () => {
    const state= useSelector(state => state);
    const {cart}= state;
    const {cartItems} = cart;
    console.log(cartItems)
    return (
        <div className="nav-cart">
          <div className="nav-cart-item">
                {cartItems.map(cartItem => <NavCart key={`${cartItem.name}${cartItem.id}`} {...cartItem}/>)}
               <Link to={'/cart'}>  <button >go to cart</button> </Link>
                </div>  
        </div>
    )
}

export default CartDrop
