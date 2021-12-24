import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../redux/cart/cart.action'
import './navcart.css'
const NavCart = (props) => {
    console.log(props)
    const {name,imageUrl, price}= props
    const dispatch = useDispatch();
    const removeItem = ()=>{
        dispatch(removeFromCart(props))
    }
    return (
        <div className="cart-small">
            <img src={imageUrl} alt={name}  width="50px" height="50px"/>
             <h4>{name}</h4>
             <h4>$ {price}</h4>
             <img onClick={removeItem} src="https://img.icons8.com/external-tal-revivo-green-tal-revivo/36/000000/external-close-cross-symbol-for-discontinued-and-invalid-basic-green-tal-revivo.png"alt="cross" />
                        
        </div>
    )
}

export default NavCart
