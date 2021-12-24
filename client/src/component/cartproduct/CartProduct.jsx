import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart, changeQunatCart } from '../../redux/cart/cart.action'
import './cartproduct.css'
const CartProduct = (props) => {
    console.log(props)
    const {name,imageUrl, price,quantity} = props
    const dispatch = useDispatch();
    var quant = quantity;
    const removeItem = ()=>{
        dispatch(removeFromCart((props)))
    }
    const quantIncrement = ()=>{
        quant++;
        dispatch(changeQunatCart(props,quant));
}
    const quantDecrement = ()=>{
        quant--;
         dispatch(changeQunatCart(props,quant));
}
    return (
        <div className="cart-big">
            <img src={imageUrl} alt={name}  width="120px" height="130px"/>
             <h3>{name}</h3>
             <h3>$ {price}</h3>
             <div className="quantity">
                {quant >=2 ? 
             <img onClick={quantDecrement} src="https://img.icons8.com/ios/50/000000/less-than.png" alt="dec" /> : null}
              <span>{quant}</span> 
              <img onClick={quantIncrement} src="https://img.icons8.com/ios/50/000000/more-than.png" alt="inc" />            
               </div>
               <span> $ {quant * price} </span>
             <img onClick={removeItem} src="https://img.icons8.com/external-tal-revivo-green-tal-revivo/36/000000/external-close-cross-symbol-for-discontinued-and-invalid-basic-green-tal-revivo.png" alt="cross" />
                        
        </div>
    )
}

export default CartProduct
