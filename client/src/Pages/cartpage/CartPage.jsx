import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../../component/cartproduct/CartProduct'
import { Link } from 'react-router-dom'
import logog from '../../assets/logog.png'
import StripeCheckout from 'react-stripe-checkout'
import './cartpage.css'
const CartPage = ({history}) => {
    const {cartItems}=useSelector(state=>state.cart);
    const [user, setUser] = useState()
    console.log(cartItems);
    var ans = 0;
    const addition= (item) =>{
        ans+= item.quantity* item.price
    }
    cartItems.forEach(addition);
 
    const makePayment =  async (token) =>{
        const body = {
            token,
            user
        }
        const headers ={
            "Content-Type" :"application/json"
        }

        const res = await fetch('/payment',{
            method : "POST",
            headers,
            body: JSON.stringify(body)
        })
        if(res && res.status === 200){
            console.log(res.status)
        }
    }
    useEffect(() => {
        const userSaved = localStorage.getItem('userSaved')
        if(!userSaved) {   
        history.push('/signin')
        }
        else{
            setUser(JSON.parse(userSaved));
        }
    

    }, [history])
   
    // var total=cartItems.map(cartItem => ans= ans + cartItem.quantity * cartItem.price)
    
    
    return (
        <div className='cart-page-container'>
            
            { cartItems.length !== 0?
            <div className="not-empty">
            {cartItems.map(cartItem => <CartProduct key={`${cartItem.name}${cartItem.id}`} {...cartItem}/>) }
                <h1>Total $ {ans}</h1>
                <StripeCheckout
               stripeKey="pk_test_51K6D6ISBDSlDpcqyn0yhdqO2KSgpjlbASfVoj3R1MqOfd6tZ83rFZmVhHTvrLq5WpqfG70vW56otRzm63hoWCpXO00dsNs9M8h"
              image = {logog}
               token ={makePayment}
              name ="your online shop"
              shippingAddress
              billingAddress ={false}
              zipCode= {true}> 
               <button className='cart-btn'>Buy Now</button> </StripeCheckout>
             </div>:
            <div className='empty'>
                <div>
            <h1 >Cart is Empty</h1>
            
            <button className='cart-btn'>Go To Home</button>  
            
            </div>
            </div>
            }
        </div>
    )
}

export default CartPage
