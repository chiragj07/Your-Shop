import React from 'react'
import {Link,useHistory} from 'react-router-dom';
import cartIcon from '../../assets/cartIcon.png'
import {connect,useSelector,useDispatch } from 'react-redux';
import fetchUserReq from '../../redux/user/user.action';
import { loggedOut, toggleCart } from '../../redux/cart/cart.action';
import CartDrop from '../cart-drop/CartDrop';
import './navbar.css'
const Navbar = ({userFetch}) => {
    const history = useHistory();
     const dispatch = useDispatch()
    const state= useSelector(state => state);
    const {user,cart,toggle}= state;
    const {cartItems} = cart;
    let cartSize = cartItems.length
    const {hidden} = toggle;    
    
    const handleLogOut = ()=>{
        const userSaved= localStorage.getItem('userSaved');
        if(userSaved){
            console.log(userSaved)
            localStorage.removeItem('userSaved');
            
            userFetch(null);
            dispatch(loggedOut())

        }
    }
    const func1 = ()=>{

        if(user.user) dispatch(toggleCart())
        else {alert("please sign in");
            history.push('/signin')
    }
    }
    return (
        <div className='nav-container'>
            <div className="title">
                <h1>YOUR SHOP</h1>
            </div>
            <div className='lnk'>
                <div className='basiclinks'>
                <Link to={'/'}><button >Home</button></Link>
                <Link to={'/hats'}><button >Hats</button></Link>
                <Link to={'/jackets'}><button>Jackets</button></Link>
                <Link to={'/sneakers'}><button>Sneakers</button></Link>

                </div>
                <div className="sign">
                { user.user===null ?
               ( <div className="ugh">
                <Link to={'/signin'}><button>Sign-IN</button></Link>
                <Link to={'/signup'}><button>Sign-Up</button></Link>
                </div>) : 
                <div className='sss'>
                    <h3>{user.user.name.toUpperCase()}</h3>
                    <button onClick={handleLogOut}>Log-out</button> 
                </div>
                          
                } 
                { user.user ?
                (<div onClick={func1} className='cartdiv'> 
                <img src={cartIcon} alt="cart" height='50px' width='50px' />
                <h4><span>{cartSize}</span></h4>  </div>)
                : null
                
                                            }       
                                    

                </div>
                
            </div>

        <div>
            { !hidden ? <CartDrop></CartDrop> : <div></div>}
        </div>
            
             
        </div>
    )
}
const mapStateToProps = state =>{
    return {
        user : state.user
    }
}
const matchDispatchToProps = dispatch =>{
    return  {
        userFetch : user=> dispatch(fetchUserReq(user))
     }
 }

export default connect(mapStateToProps, matchDispatchToProps)(Navbar)
