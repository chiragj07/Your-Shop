import { USER_CART,LOGGED_OUT, TOGGEL_CART} from './cart.types'
// import { useDispatch } from 'react-redux'
import fetchUserReq from '../user/user.action'



export const addToUserCart = items=>{
    return{
        type: USER_CART,
        payload: items
    }
}
export const addToCart = (product) => {return async function (dispatch) { 
    if(localStorage.getItem('userSaved')){
        const userData = JSON.parse(localStorage.getItem('userSaved'));
        console.log(userData)
        const token = userData.tok;
        try {
        const res= await fetch('/userdata', {
            method :"GET",
            headers:{
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
   
        }) 
        const data= await res.json();
        console.log(product)
        const updatedProduct = {
            name: product.name,
            imageUrl : product.imageUrl,
            id:product.id,
            price: product.price,
            quantity: 1
        }    
        const productData = {
            product:updatedProduct,
            user:data.user
        }
        if(data.status === 200) {
            const res = await fetch('/cart/additem',{
                method: "PUT",
                headers :{
                    "Content-Type" :"application/json",
                },
                body: JSON.stringify(productData)
            })
            const data= await res.json();
            console.log(data.user.cart)
            dispatch({
                type:USER_CART,
                payload:data.user.cart
            })
            
        }
        else{
            localStorage.removeItem('userSaved');
            
        }
    }catch(err){
        localStorage.removeItem('userSaved');
        window.alert('user authorization failed please sign in again')
        
    }
    }
        else{
            window.alert('you are not logged-in')
        }


} }


export const changeQunatCart = (product,quantity) => {return async function (dispatch) { 
    if(localStorage.getItem('userSaved')){
        const userData = JSON.parse(localStorage.getItem('userSaved'));
        console.log(userData)
        const token = userData.tok;
        try {
        const res= await fetch('/userdata', {
            method :"GET",
            headers:{
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
   
        }) 
        const data= await res.json();
        console.log(data)
        console.log(product)
        const updatedProduct = {
            name: product.name,
            imageUrl : product.imageUrl,
            id:product.id,
            price: product.price,
            quantity: quantity
        }
        const productData = {
            product:updatedProduct,
           
            user:data.user
        }
        if(data.status === 200) {
            const res = await fetch('/cart/changequant',{
                method: "PUT",
                headers :{
                    "Content-Type" :"application/json",
                },
                body: JSON.stringify(productData)
            })
            const data= await res.json();
            console.log(data.user.cart)
            dispatch({
                type:USER_CART,
                payload:data.user.cart
            })
            
        }
        else{
            localStorage.removeItem('userSaved');
            
        }
    }catch(err){
        localStorage.removeItem('userSaved');
        window.alert('user authorization failed please sign in again')
        
        dispatch(loggedOut());
        dispatch(fetchUserReq(null))
        
    }
    }
        else{
            window.alert('you are not logged-in')
        }

}
}


export const loggedOut = ()=>{
    return {
        type : LOGGED_OUT,

    }
}
export const toggleCart = ()=>{
    return{
        type: TOGGEL_CART
    }
}
export const removeFromCart = (product) => {return async function (dispatch) { 
    if(localStorage.getItem('userSaved')){
        const userData = JSON.parse(localStorage.getItem('userSaved'));
        console.log(userData)
        const token = userData.tok;
        try {
        const res= await fetch('/userdata', {
            method :"GET",
            headers:{
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
   
        }) 
        const data= await res.json();
        console.log(data)
        console.log(product)
        const updatedProduct = {
            name: product.name,
            imageUrl : product.imageUrl,
            id:product.id,
            price: product.price,
            quantity: 0
        }
        const productData = {
            product:updatedProduct,
            user:data.user
        }
        if(data.status === 200) {
            try{
            const res = await fetch('/cart/removeitem',{
                method: "PUT",
                headers :{
                    "Content-Type" :"application/json",
                },
                body: JSON.stringify(productData)
            })
            const data= await res.json();
            console.log(data.user.cart)
            dispatch({
                type:USER_CART,
                payload:data.user.cart
            })
            
        }  catch(err){
            console.log(err.message); } }
        
        else{
            localStorage.removeItem('userSaved');
            
        }
     }catch(err){
        localStorage.removeItem('userSaved');
        window.alert('user authorization failed please sign in again')
        
    }
    }
        else{
            window.alert('you are not logged-in')
        }


} }
