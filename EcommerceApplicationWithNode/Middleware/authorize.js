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
        console.log('the decoded value>>', decoded);
        UserModel.findById(decoded._id,function(err,user){
            if(err){
                return next(err);
            }
            if(!user){
                return next({
                    msg:'user not found'
                })
            }
            if(user.role==1){
                req.user=user;
           return next();
        }
            else{
                next({
                    msg:'you are not super admin',
                    status:403
                })
            }

        })
    })
}