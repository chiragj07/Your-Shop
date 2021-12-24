const User = require('../models/usermodel')
const jwt = require('jsonwebtoken')

const handleErrors =(err)=>{
    const errors = {
        email:"", password:"",name:""
    }
    if(err.message === 'invalid email'){
        errors.email='invalid email';
    }
    if(err.message === 'invalid password'){
        errors.password='invalid password';
    }
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(
            ({properties}) =>{
                errors[properties.path]=properties.message;
            }
        )
    };

    return errors;

}
const maxAge = 24*60*60
const createToken =(id)=>{
    return jwt.sign({id}, process.env.SEC_KEY,{
        expiresIn: maxAge
    })
}

module.exports.auth_signup_post = async(req,res) =>{ 
    const {name, email, password} = req.body; 
    try{
        
        const user = await User.create({name, email,password});
        res.status(200);
        res.json({user,status:200})

    }catch(er){
        const errors= handleErrors(er);
        res.status(400);
        res.json({errors,status:400})
       }
}


module.exports.auth_login_post =async(req,res) =>{
    
    const {email, password} = req.body;
    
    try{
        const user = await User.login(email,password);
        
        const token= createToken(user._id);
        
        res.cookie('jwt', token,{
            httpOnly : true,
            maxAge: maxAge*1000
        })
        const data= {
            name: user.name,
        _id: user._id,
            cart: user.cart
        }
        
        res.status(200);
        res.json({data,token,status:200})
    }catch(er){
       const errors= handleErrors(er);
       
       res.status(400);
       res.json({errors,status:400})
        
    }
    
}
module.exports.auth_USER_GET = async (req,res) =>{
    const token = req.headers.authorization.split(" ")[1];
    
    const decoded = jwt.verify(token,process.env.SEC_KEY);
    const {id} =decoded;
    try{
    
    const user = await User.findById(id);
    
    if(!user){
        res.status(400);
        res.json({status: 400, error : "user not found"})
    }
    const userData = {
        name:user.name,
        _id: user._id,
        cart: user.cart,
    }
    res.status(200);
    res.json({status: 200, user: userData});
    }catch(err){
            res.status(400);
            res.json({status:400, error : "not authorized"})
    }
    ;
}