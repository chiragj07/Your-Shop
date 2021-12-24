const cookieParser = require('cookie-parser');
const dotenv= require('dotenv');
const express =require('express');
const mongoose = require('mongoose');
const authRouter =require('./Routes/authRoutes')

const app= express();
app.use(express.json())
app.use(cookieParser());
dotenv.config({path : './config.env'});
const port=process.env.PORT;

const DB= process.env.DB;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=> console.log('database connected successfully'))
.catch(err=>console.log(err));

app.listen(port, ()=> console.log(`listening to ${port}`))

app.use(authRouter);
app.use("/payment", require("./Routes/paymentRoutes"));