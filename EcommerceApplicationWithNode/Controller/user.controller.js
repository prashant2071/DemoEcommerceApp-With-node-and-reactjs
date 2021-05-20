const router = require('express').Router();
const UserModel = require('../Models/user.model');
const MAP_USER_REQEST=require('../helpers/map_user_req');
const Uploader=require('./../Middleware/uploader')('image');
const NotificationModel = require('./../Models/notification.model');
const removeFile=require('../helpers/removefile');



router.route('/')
    .get(function (req, res, next) {
        UserModel
        .find({},{username:1,password:1,address:1,image:1,firstName:1,lastName:1,role:1})
        .sort({_id:-1})
        .limit(10)
        .exec(function(err,user){ 
            if(err){
                return next(err);
            }
            res.json(user);
        })
    })
    .post(function (req, res, next) {
        res.json({
            msg: "from user Ruote pst method"
        })
    })
    .put(function (req, res, next) {

    })
    .delete(function (req, res, next) {

    });

router.route('/search')
    .get(function (req, res, next) {
        res.json({
            msg: "from user Route search"
        })
    })
    .post(function (req, res, next) {

    })


router.route('/:userId')
    .get(function (req, res, next) {
         let id=req.params.userId;
     //  UserModel.findOne({_id:id})
         UserModel.findById(id)
         .then(function(user){
             if(!user){
                 return next({
                     msg:"user not found",
                     status:400
                 })
             }
             res.json(user)
         })
         .catch(function(err){
             next(err)
         })
    })
    .post(function (req, res, next) {

    })
    .put(Uploader.single('image'), function (req, res, next) {
        console.log('the req body data >>',req.body);
        if(req.file){
            console.log('req.file >>',req.file);
            req.body.image=req.file.filename;
        }
        UserModel.findById(req.params.userId,function(err,user){
            if(err){
                return next(err);
            }
            if(!user){
                res.json({
                    msg:"user not found",
                    status:404
                })

            }
            var oldImage=user.image;
            const updateMapUser=MAP_USER_REQEST(user,req.body)

            updateMapUser.save(function(err,updated){    
                if(err){
                    return next(err)
                }
                res.json(updated)
                if(req.file){
                    removeFile(oldImage)
                }
                const newNotification=new NotificationModel({});
                newNotification.user_id=user._id,
                newNotification.category='General_update',
                newNotification.message='your profile is updated',
                newNotification.save()

            })

        })
    })
    .delete(Uploader.single('image'),function (req, res, next) {
     let id=req.params.userId;
     UserModel.findById(id)
     .then(function(user){
         if(!user){
             res.json({
                 msg:'user not found',
                 status:404
             })
            }
             user.remove(function(err,removed){
                 if(err){
                     return next(err)
                 }
                 res.json(removed)
                 removeFile(user.image)
             })
     })
     .catch(function(err){
         next(err)
     })
    });


module.exports = router;