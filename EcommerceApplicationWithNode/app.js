const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const appRoute=require('./Route/api.route');
const config=require('./configs/index.config')
const cors=require('cors')
require('./db_initialize'); //run automatically

const pug=require('pug');
const checkTicket = require('./Middleware/checkTicket');
// app.set('port',8080)
app.set('view engiene',pug)
app.set('views',path.join(__dirname,"views"))

app.use('/files', express.static(path.join(__dirname, 'uploads'))) 
app.use(cors());
app.use(express.urlencoded({
    extended:true

}))

app.use(express.json())

app.use(morgan('dev'))


// ==========================
app.use('/api',appRoute);
// ===========================


app.use(function (req, res, next) {
    next({
        msg: 'page not found',
        status: 404
    })
})


app.use(function (error, req, res, next) {
    console.log('from last error handelling middleware',error)
    res.json({
        msg: error.msg||error,
        status: error.status||400,
        text: 'From last error handelling middleware'

    })

})

app.listen(config.port, function (err, done) {
    if (err) {
        console.log('Server connection Failed')
    }
    else {
        console.log('server listening at port ',config.port)
    }

})
