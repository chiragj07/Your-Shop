const User = require('../models/usermodel')
const jwt = require('jsonwebtoken')

module.exports.product_put = async (req,res)=>{
    const {product,user} = req.body;
    console.log(product)
    try{
    const userFromDb = await User.findByIdAndUpdate({ _id: user._id}, {
        $addToSet : {
            cart: [product]
        }   
    }, {new: true}
    )
    console.log(userFromDb)
    res.status(200);
        res.json({status:200,user:userFromDb})
}catch(er){
    res.status(400);
        res.json({status:400,error:"server error"})
}
    

}
module.exports.product_put_del = async (req,res)=>{
    const {product,user} = req.body;
    console.log(product)
    
    try{
        const userFromDb = await User.findByIdAndUpdate({_id: user._id},{
             $pull:{
                cart : {name: product.name }
             }},{
                 new: true
             }
            )
        console.log(userFromDb)
        res.status(200);
        res.json({status:200,user:userFromDb})


    }catch(er){
        
        res.status(400);
            res.json({status:400,error:er.message})
    }



}

module.exports.product_put_changequant = async(req,res) => {
    const {product,user} = req.body;
    
        try{
            const userFromDb = await User.findOneAndUpdate({_id: user._id, "cart.name":product.name},
                {
                    $set :{
                       "cart.$.quantity" : product.quantity 
                    }
                },{
                    new: true
                }
                )
            console.log(userFromDb)
            res.status(200);
            res.json({status:200,user:userFromDb})
        }catch(er){
            console.log(er.message)
            res.status(400);
                res.json({status:400,error:"server error"})
        }
    
}
    

