const jwt = require("jsonwebtoken");
const config = require('./../configs/index.config');
const UserModel=require('../Models/user.model')

module.exports = function (req, res, next) {
    let token;
    if (req.headers['authorization'])
        token = req.headers['authorization'];
    if (req.headers['x-access-token'])
        token = req.headers['x-access-token'];
    if (req.headers['token'])
        token = req.headers['token']
    if (req.query.token)
        token = req.query.token;

    if (!token) {
        return next({
            msg: 'Authentication failed! token not provided',
            status: 401
        })
    }
    jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
        if (err) {
            return next(err);
        }
        console.log('token verification successful>>',decoded)
        UserModel.findById(decoded._id,function(err,user){
            if(err){
                return next(err);
            }
            if(!user){
               return next({
                    msg:'user not in the system',
                    status:404
                })
            }
            req.user=user;
            console.log("the user is",req.user)
            next()
        })

    })
}