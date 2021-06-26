const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const appRoute=require('./Route/api.route');
const config=require('./configs/index.config')
const events=require('events')
const pug =require('pug')
const cors=require('cors')
require('./db_initialize'); //run automatically


//part of app.js call socket file with sending value
require('./socket')(app) 

const myEv = new events.EventEmitter();
app.use(function(req,res,next){
    req.myEv=myEv
    next();
})
myEv.on('error',function(err,res){
    console.log('error event of own',err)
    res.json(err)
})

// const pug=require('pug');
const checkTicket = require('./Middleware/checkTicket');
// app.set('port',8080)
app.use(cors());
app.set('view engiene',pug)
app.set('views',path.join(__dirname,"views"))

app.use('/files', express.static(path.join(__dirname, 'Uploads'))) 

app.use(express.urlencoded({
    extended:true

}))

app.use(express.json())

app.use(morgan('dev'))


// ==========================
app.use('/api',appRoute);
// ===========================


app.use(function (req, res, next) {
    // application level middleware
    next({
        msg: "Not Found",
        status: 404
    })
})


app.use(function (err, req, res, next) {
  console.log("here at error handling middleware",err.msg);
  res.status(400); //yo haliyaena vane front end ma error bhujdoina validate gardinxa
  res.json({
    text: "from error handelling middleware ",
    msg: err.msg|| err,
    status: err.status || 400,
  });
});

app.listen( process.env.PORT || 8080, function (err, done) {
    if (err) {
        console.log('Server connection Failed')
    }
    else {
        console.log('server listening at port ',config.port)
    }

})
