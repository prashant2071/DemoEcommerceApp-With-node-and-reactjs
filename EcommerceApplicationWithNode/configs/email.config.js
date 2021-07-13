const nodemailer=require('nodemailer')


const sender = nodemailer.createTransport({
    service:'Gmail' ,
    auth:{
        user:'pbt9840@gmail.com',
        pass:"ShovaDevi"
    }
})
module.exports=sender
