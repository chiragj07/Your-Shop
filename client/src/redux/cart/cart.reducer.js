
import {  USER_CART, LOGGED_OUT } from "./cart.types";
const initialState ={
    cartItems: []
}

const cartReducer = (state = initialState, action)=>{
    switch (action.type) {
        
        case USER_CART : return {
            ...state,
            cartItems : action.payload,
        }
        case LOGGED_OUT :
            return {
                ...state,
                cartItems:[]
            }
        default : return state

            
   
    }

}


export default cartReducer;