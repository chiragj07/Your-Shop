import { Route, Switch, useHistory} from 'react-router-dom'
import './App.css';
import{ connect} from 'react-redux'
import HomePage from './Pages/Home/Home';
import Navbar from './component/Navbar/Navbar';
import CategProPage from './Pages/categ_product/CategProPage';
import SignInPage from './Pages/SignIn/SignInPage';
import SignupPage from './Pages/signup/SignupPage';
import fetchUserReq from './redux/user/user.action';
import CartPage from './Pages/cartpage/CartPage';
import {useEffect} from 'react';


function App({userFetch}) {
 const history = useHistory();
 const checkUser = async ()=>{
  const userSaved = localStorage.getItem('userSaved')
  if(userSaved) {
    const userData = JSON.parse(localStorage.getItem('userSaved'));
    console.log(userData)
    const token = userData.tok;
    try {
    const res= await fetch('/userData', {
        method :"GET",
        headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }

    }) 
    const data= await res.json();
if(data.status === 200) {
  userFetch(data.user); 
}
else if(data.status ===400){
  localStorage.removeItem('userSaved');
  history.pushState('/signin')
} }catch(err){
  window.alert('user fetching failed')
  localStorage.removeItem('userSaved');
  history.pushState('/signin')
}

  }
}
  useEffect(() => {
    checkUser();
    
  })



  return (
       
    <div className="App">
       
       <Navbar/>
          <Switch>
          
            <Route path='/' exact component={HomePage} />
            <Route path='/signin' exact component={SignInPage} />
            <Route path='/signup' exact component={SignupPage} />
            <Route path='/cart' exact component={CartPage} />
            <Route path='/:title' exact component={CategProPage} />

          </Switch>
    </div>
    

  );
}
const matchDispatchToProps = dispatch =>{
  return  {
      userFetch : user=> dispatch(fetchUserReq(user))
   }
}
export default connect(null,matchDispatchToProps)(App);
