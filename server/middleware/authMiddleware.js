const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

const requireAuth =  (req,res,next)=>{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            res.status(400);
            res.json({status:400,error: "not autorized"});
        }
        
        next();


}

module.exports = requireAuth;