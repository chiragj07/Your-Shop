import React,{useState, useEffect} from 'react'
import InputField from '../../component/InputFiled/InputField'
import {connect} from 'react-redux'
import fetchUserReq from '../../redux/user/user.action'
import './signStyles.css'
import { addToUserCart } from '../../redux/cart/cart.action'
const SignInPage = ({history, userFetch, cartFetch}) => {
    useEffect(() => {
        const userSaved = localStorage.getItem('userSaved')
        if(userSaved) {
            
        history.push('/')
        }
    

    }, [history])

    const [signCredentials, setSignCredentials] = useState({
        email :"", password: ""
    })
    const handleChange = (e)=>{
            const {name, value} = e.target;
            // console.log(name,value);
            setSignCredentials({...signCredentials,[name]:value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const res = await fetch('/login',{
            method: 'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(signCredentials)
        })
        const data = await res.json();
        console.log(data)
        if(data.status === 400) {
            window.alert('invalid password or email')
        }else{
            
            const dataToSave={
                idToSave:data.data._id,
                nameSave: data.data.name,
                tok: data.token
            }
            localStorage.setItem('userSaved',JSON.stringify(dataToSave));    
            cartFetch(data.data.cart)
            userFetch(data.data);

            history.push('/')
        }
        
    }
    
    const {email,password} = signCredentials;
    
    

    return (
        <div className='sign-page'>
            <form action="POST">
                <InputField name='email' value={email} handleChange={handleChange} />
                <InputField name='password' type="password" value={password} handleChange={handleChange} />
                <button onClick={handleSubmit}>Sign IN</button>

            </form>
        </div>
    )
}

const matchDispatchToProps = dispatch =>{
   return  {
       userFetch : user=> dispatch(fetchUserReq(user)),
       cartFetch : cart=>dispatch(addToUserCart(cart))
    }
}


export default connect(null,matchDispatchToProps)(SignInPage)
