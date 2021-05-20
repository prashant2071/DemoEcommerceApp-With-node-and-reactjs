const express=require('express');
const app=express();
const authenticate=require('../Middleware/authenticate');
const authorize=require('../Middleware/authorize');

const productRoute=require('../components/products/products.route');
const notificationRoute=require('../Controller/notification.controller');
const userRoute=require('../Controller/user.controller');
const authRoute=require('../Controller/auth.controller');


app.use('/product',productRoute);
app.use('/user',authenticate,authorize,userRoute);
app.use('/auth',authRoute);
app.use('/notification',authenticate,notificationRoute);
app.use('/cart',authenticate,notificationRoute);

module.exports=app;