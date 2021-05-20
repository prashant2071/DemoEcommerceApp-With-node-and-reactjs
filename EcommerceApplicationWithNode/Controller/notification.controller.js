const NotificationModel = require('./../Models/notification.model');
const router = require('express').Router();


router.get('/', function (req, res, next) {
    var condition = {
        user_id: req.user._id
    };
    console.log('In notification user data', condition)
    NotificationModel
        .find(condition)
        .sort({
            _id: -1
        })
        .limit(2)
        .populate('user_id', { username: 1, email: 1 }) //Populate is like using Foreign Key Data but refrance should 
        .exec(function (err, result) {               //be there designing schema 
            if (err) {
                return next({
                    msg: 'from notification get method'
                })
            }
            else {
                res.json(result)
            }
        })
})
router.get('/:userId', function (req, res, next) {

    NotificationModel.findById(req.params.userId, function (err, noti) {
        if (err) {
            return next(err)
        }
        res.json(result)
    })
})

router.get('/mark_as_read/:id', function (req, res, next) {
    NotificationModel.update({ _id: req.params.id }, { $set: { seen: true } }, function (err, update) {
        if (err) {
            return next(err)
        }
        else {
            res.json(update)
        }
    })
})
router.get('/mark_all_as_read', function (req, res, next) {
    NotificationModel.update({
        user_id: req.user._id
    }, { $set: { seen: true } }, { multi: true }, function (err, update) {
        if (err) {
            return next(err)
        }
        else {
            res.json(update)
        }
    })
})
router.delete('/:id', function (req, res, next) {
    NotificationModel.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
        if (err) {
            return next(err)
        }
        if (!user) {
            res.json({
                msg: 'user no found',
                status: 400
            })
        }
        else {
            res.json(user);
        }

    })
})
module.exports = router;