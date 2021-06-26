const nodemailer=require('nodemailer')


const sender = nodemailer.createTransport({
    service:'Gmail' ,
    auth:{
        user:'pbt133393@gmail.com',
        pass:"AshokThapa"
    }
})
module.exports=sender