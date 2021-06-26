const express = require('express');
const router = express.Router();
const UserModel = require('../Models/user.model');
const MAP_USER_REQUEST = require('../helpers/map_user_req');
const Uploader = require('./../Middleware/uploader')('image')
const path= require('path');
const passwordhash=require('password-hash');
const jwt=require('jsonwebtoken');
const config=require('../configs/index.config');  //yaha vitra ko jwt secret ni aauxa
const nodemailer=require('nodemailer')
const sender=require('./../configs/email.config')
const randomStr= require('randomstring')


// const sender = nodemailer.createTransport({
//     service:'Gmail' ,
//     auth:{
//         user:'pbt133393@gmail.com',
//         pass:"AshokThapa"
//     }
// })

function prepareEmail(data){
    return{
        from: '"Kirana web store 👻"', // sender addss
        to: "roshanthapasuyal@gmail,pbt9840@gmail.com,"+data.email, // list of receivers
        subject: "Forget password but trying to reciver it✔", // Subject line
        text: "", // plain text body
        html: `<div>
        <p><strong>Hi ${data.name} we have notice that you have forget your password</strong></p>
        <p>Link below to you password</p>
        <p>yo chahi basic writing ho</p>
        <p>A paragraph is a series of related sentences developing a central idea, 
        called the topic. Try to think about paragraphs in terms of thematic unity:
         a paragraph is a sentence or a group of sentences that supports one central, unified idea.
          Paragraphs add one idea at a time to your broader argument.</p>
        <p><a href=${data.link}>Click here to reset password</a></p>

        <h3>Regards</>
        <p>Kirana web store support</p>
        <p>${new Date().getFullYear()}</p>
        
        </div>`, // html body
    } 
}

  
function generateToken(data){
 let token =jwt.sign({
     _id:data._id
 },config.JWT_SECRET);
 return token;

}
router.get('/',function(req,res,next){
    require('fs').readFile('sdfsdfsmsdfsdf',function(err,done){
        if(err){
         return  req.myEv.emit('error',err,res)
        }
    })
})

router.get('/remove/:filename',function(req,res,next){
    require('fs').unlink(path.join(process.cwd(),'Uploads/image/'+req.params.filename),function(err,remove){
        if(err){
            return next(err)
        }
        else{
            res.json({
                msg:'removed',
                val:remove
            })
        }
    })
})
router.post('/login', function (req, res, next) {
    console.log('we are at login')
    UserModel.findOne({           //find le joile result array ma return garxa vame findOne le ki object ki null
        $or:[{
            username: req.body.username
        },
        {
            email: req.body.username
        }]
        
    })
        .then(function (user) {
            if (!user) {
                console.log("this is not valid user");
                return next({
                  msg: "Invalid Username",
                  status: 400,
                });

            }
            const isMatched= passwordhash.verify(req.body.password,user.password);
            if(!isMatched){
                return next({
                  msg: " password doesn't match",
                  status: 400,
                });

            }
            if (user.status === 'inactive') {
                res.next({
                  msg: "you account is in active please contact system administrator",
                  status: 403,
                });


            }
             var token=generateToken(user); //kunai thau ma garaya token ko value change garna puryo vane 
            res.json({
                user:user,
                token:token
            });
        })
        .catch(function (err) {
            next(err)
        })
})


router.post('/register', Uploader.array('image'), function (req, res, next) {
    console.log("you are at post register", req.body);
    console.log('file body req.file==>', req.file);
    if (req.fileTypeError) {
        return next({
            msg: "File Type Error"
        })
    }
    const userdata = req.body;
    if (req.file) {
        userdata.image = req.file.filename;
    }
    const newUser = new UserModel({})

    //newUser Mongoose object 
    //default value with _id  --v will be available for every instance with method
    const newMapperUser = MAP_USER_REQUEST(newUser, userdata)
    newMapperUser.password=passwordhash.generate(req.body.password);

    newMapperUser.save(function (err, saved) {
        if (err) {
            console.log('error saving the file');
            next(err);
        }
        else {
            console.log('saved successfully');
            res.json(saved);
        }
    })
})
router.post('/forgot_password',function(req,res,next){
    UserModel.findOne({
        email:req.body.email
    },function(err,user){
        if(err){
            return next(err)
        }
        if (!user) {
            console.log("this is not valid user");
            return next({
              msg: "This email is not registered",
              status: 400,
            });

        }
        const passwordResetToken=randomStr.generate(29)
        const passwordResetExpiry=Date.now() +(1000*60*60*24)

        const emailBody ={
            name:user.username,
            email:user.email,
            link:`${req.headers.origin}/reset_password/${passwordResetToken}`
        }
        const emailContent = prepareEmail(emailBody);
        user.passwordResetExpiry=passwordResetExpiry
        user.passwordResetToken=passwordResetToken
        user.save(function(err,saved){
            if(err){
                return next(err)
            }

        })
        sender.sendMail(emailContent,function(err,done){
            if(err){
                return next(err)
            }
            res.json(done)
        })
         

    })

})
router.post('/reset_password/:token',function(req,res,next){
    UserModel.findOne({
        passwordResetToken:req.params.token,
        passwordResetExpiry:{
            $gte:Date.now()
        }
    },function(err,user){
        if(err){
            return next(err)
        }
        if(!user){
        return next({
            msg:"Invalid or Expired password reset token",
            status:400
        })
    }
    // if(Date.now()>user.passwordResetExpiry){
    //     return next({
    //         msg:'Password reset link expired'
    //     })
    // }
        user.password=passwordhash.generate(req.body.password);
        user.passwordResetExpiry=null;
        user.passwordResetToken=null;

        user.save(function(err,saved){
            if(err){
                return next(err)
            }
            res.json(saved)

        })

        
    })
})
// jsonparser or formurlEncoded le body vannae poperty add gardinxa


module.exports = router;