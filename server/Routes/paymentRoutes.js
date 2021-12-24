const express = require('express');

const shortid = require('shortid');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SEC_KEY);
const User = require('../models/usermodel');


router.post('/', async (req,res)=>{
    const {token,user} = req.body;
    const indempotencyKey = shortid.generate();
    try{
    const userFromDb= await User.findById(user.idToSave);
   
    
    if(!user){
        return res.status(400).json({error: "user not found"});
    }
    const cart = userFromDb.cart;
    var ans = 0;
    const addition= (item) =>{
        ans+= item.quantity* item.price
    }
    cart.forEach(addition);
    console.log(ans)
    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
    })
    console.log(customer)
    const order  = await stripe.charges.create({
        amount : ans*100,
        currency: 'INR',
        customer: customer.id,
        receipt_email: token.email,
        shipping:{
            name: token.card.name,
            address:{
                city: token.card.address_city,
                state: token.card.address_state,
                country:token.card.address_country
            }
        }

    } );
    console.log(order);

    res.status(200).json(order);

    }catch(err){
        console.log(err.message);
        res.status(500).json({error: "server error, payment failed"});
    }


})

module.exports = router;