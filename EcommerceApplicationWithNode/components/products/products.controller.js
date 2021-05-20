const ProductQuery = require('./products.query');


function findAll(req, res, next) {
    var condition = {};
    if (req.user.role != 1) {
        condition.vendor = req.user._id
    }
    ProductQuery.find(condition)
        .then(function (done) {
            res.json(done)
        })
        .catch(function (err) {
            next(err)
        })
}
function insert(req, res, next) {
    if (req.fileTypeErr) {
        return next({
            msg: 'Invalid file format',
            status: 404
        })
    }
    const data = req.body;
    data.vendor = req.user._id
    console.log('the file is ', req.files);

    if (req.files && req.files.length) {
        data.image = req.files.map(function (file) {
            return file.filename
        })

    }

    ProductQuery.insert(data)
        .then(function (product) {
            res.json(product)
        })
        .catch(function (err) {
            next(err)
        })
}


function getById(req, res, next) {
    ProductQuery
        .getById(req.params.id)
        .then(function (product) {
            res.json(product)
        })
        .catch(function (err) {
            next(err)
        })
}
function update(req, res, next) {
    const data = req.body
    data.user_id = req.user._id
    if (req.files && req.files.length) {
        data.image = req.files.map(function (file) {
            return file.filename;
        })
    }
    ProductQuery.update(req.params.id, data)
        .then(function (updated) {
            res.json(updated)

        })
        .catch(function (err) {
            next(err)
        })
}
function remove(req, res, next) {
    ProductQuery.remove(req.params.id)
        .then(function (removed) {
            res.json(removed)
        })
        .catch(function (err) {
            next(err)
        })
}
function addReview(req, res, next) {
    if (!(req.body.reviewMessage && req.body.reviewPoint)) {
        return next({
            msg: 'missing required feild no review',
            status: 404
        })
    }
    const productId = req.params.productId;
    const reviewData = {
        message: req.body.reviewMessage,
        point: req.body.reviewPoint,
        user: req.user._id
    };
    console.log("the data is>>", reviewData)
    ProductQuery
        .addReview(productId, reviewData)
        .then(function (addreview) {
            res.json(addreview)
        })
        .catch(function (err) {
            next(err)
        })
}
function search(req, res, next) {
    const searchCondition = {}
    ProductQuery
        .find(searchCondition)
        .then(function (response) {
            res.json(response)
        })
        .catch(function (err) {
            next(err)
        })
}



module.exports = {
    findAll,
    getById,
    insert,
    update,
    remove,
    search,
    addReview

};